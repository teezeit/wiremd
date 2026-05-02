/**
 * Custom remark plugin to parse container directives (:::)
 * Handles syntax like:
 * ::: container-type {.class attr="value"}
 * content
 * :::
 *
 * Supports nested containers, implicit closing, and opener-content extraction.
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { Plugin } from 'unified';

interface ContainerOpener {
  containerType: string;
  attrs: string;
  inline: string;
}

/** Parse a paragraph node as a container opener. Returns null if not an opener. */
function parseContainerOpener(node: any): ContainerOpener | null {
  if (
    node.type !== 'paragraph' ||
    !node.children?.length ||
    node.children[0].type !== 'text'
  )
    return null;

  const firstLine = (node.children[0].value as string).split('\n')[0].trim();
  // Match ::: followed by a single-word type, optional {attrs}, optional inline content
  const match = firstLine.match(/^:::\s*(\S+)(?:\s*(\{[^}]+\}))?(?:\s+(.+))?$/);
  if (!match) return null;

  return {
    containerType: (match[1] || 'section').trim(),
    attrs: match[2] ? match[2].trim() : '',
    inline: match[3] ? match[3].trim() : '',
  };
}

/** Check if a node is a standalone closing ::: paragraph. */
function isContainerCloser(node: any): boolean {
  return (
    node.type === 'paragraph' &&
    node.children?.length > 0 &&
    node.children[0].type === 'text' &&
    node.children[0].value.trim() === ':::'
  );
}

function makeContainerNode(
  containerType: string,
  attrs: string,
  children: any[],
  position?: any,
): any {
  return {
    type: 'wiremdContainer',
    containerType,
    attributes: attrs,
    children,
    position,
    data: {
      hName: 'div',
      hProperties: {
        className: ['wiremd-container', `wiremd-${containerType}`],
      },
    },
  };
}

/**
 * Collect and build a container starting at nodes[startIdx] (the opener paragraph).
 * Returns the container node and the index of the first node after the container.
 */
function finishContainer(containerType: string, attrs: string, inline: string, children: any[], nextIndex: number, position?: any): { node: any; nextIndex: number } {
  const node = makeContainerNode(containerType, attrs, children, position);
  if (inline) node.inline = inline;
  if (containerType === 'demo') {
    node.rawContent = mdastNodesToText(children);
  }
  return { node, nextIndex };
}

function collectContainer(
  nodes: any[],
  startIdx: number,
): { node: any; trailing?: any[]; nextIndex: number } {
  const openerNode = nodes[startIdx];
  const opener = parseContainerOpener(openerNode)!;

  // === CASE 1: Complete container in a single plain-text paragraph ===
  // e.g. ":::card\ncontent\n:::" — no blank lines, no inline elements
  if (
    openerNode.children.length === 1 &&
    openerNode.children[0].type === 'text'
  ) {
    const fullText = openerNode.children[0].value as string;
    const lines = fullText.split('\n');
    let closingIdx = -1;
    for (let j = lines.length - 1; j >= 1; j--) {
      if (lines[j].trim() === ':::') {
        closingIdx = j;
        break;
      }
    }
    if (closingIdx > 0) {
      const contentText = lines.slice(1, closingIdx).join('\n').trim();
      const children: any[] = [];
      if (opener.inline) {
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', value: opener.inline }],
        });
      }
      if (contentText) {
        children.push({
          type: 'paragraph',
          children: [{ type: 'text', value: contentText }],
        });
      }
      // Preserve any text after the closer line as sibling node(s). Remark
      // folds the entire run of non-blank lines into the opener paragraph,
      // so trailing content here is content that lived after `::: ` on
      // disk and would otherwise be silently dropped.
      const trailingText = lines.slice(closingIdx + 1).join('\n').trim();
      const trailing = trailingText
        ? [{ type: 'paragraph', children: [{ type: 'text', value: trailingText }] }]
        : undefined;
      return {
        ...finishContainer(opener.containerType, opener.attrs, opener.inline, children, startIdx + 1, openerNode.position),
        trailing,
      };
    }
  }

  // === CASE 2: Complete container in a single paragraph with inline elements ===
  // e.g. ":::card\nSome **bold** text\n:::" — last text child ends with \n:::
  const lastChild = openerNode.children[openerNode.children.length - 1];
  if (
    lastChild?.type === 'text' &&
    (lastChild.value.trim().endsWith(':::') ||
      /\n:::\s*$/.test(lastChild.value))
  ) {
    const processedChildren: any[] = [];
    let startChildIdx = 0;
    if (openerNode.children[0].type === 'text') {
      const firstLines = (openerNode.children[0].value as string).split('\n');
      if (firstLines.length > 1 && firstLines[1].trim()) {
        processedChildren.push({
          type: 'text',
          value: firstLines.slice(1).join('\n').trim(),
        });
      }
      startChildIdx = 1;
    }
    for (let j = startChildIdx; j < openerNode.children.length; j++) {
      const ch = openerNode.children[j];
      if (j === openerNode.children.length - 1 && ch.type === 'text') {
        const value = (ch.value as string).replace(/\n?:::$/, '').trim();
        if (value) processedChildren.push({ ...ch, value });
      } else {
        processedChildren.push(ch);
      }
    }
    const contentChildren =
      processedChildren.length > 0
        ? [{ type: 'paragraph', children: processedChildren }]
        : [];
    if (opener.inline) {
      contentChildren.unshift({
        type: 'paragraph',
        children: [{ type: 'text', value: opener.inline }],
      });
    }
    return finishContainer(opener.containerType, opener.attrs, opener.inline, contentChildren, startIdx + 1, openerNode.position);
  }

  // === CASE 3: Multi-block container — collect until matching closer ::: ===
  const containerChildren: any[] = [];

  // Opener-content extraction: inline text on the same line as the opener
  if (opener.inline) {
    containerChildren.push({
      type: 'paragraph',
      children: [{ type: 'text', value: opener.inline }],
    });
  }

  // The opener paragraph may contain content after the ":::type" line when there
  // is no blank line between the opener and the first content line, e.g.:
  //   ::: row
  //   [Search___]{type:search}
  // Remark folds both into one paragraph, so we must extract trailing lines.
  // If the trailing content is itself a container opener (e.g. ::: card folded into
  // ::: demo with no blank line), collect it recursively instead of pushing as text.
  let pendingAfterOpener: any = null;
  if (
    openerNode.children.length === 1 &&
    openerNode.children[0].type === 'text'
  ) {
    const fullText = openerNode.children[0].value as string;
    const afterOpener = fullText.split('\n').slice(1).join('\n').trim();
    if (afterOpener) {
      const syntheticPara = {
        type: 'paragraph',
        children: [{ type: 'text', value: afterOpener }],
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  } else if (
    openerNode.children.length > 1 &&
    openerNode.children[0]?.type === 'text'
  ) {
    // Trailing whitespace on the opener line (e.g. `::: card   `) makes remark
    // emit a hard `break` node, splitting the paragraph children into
    // [text:'::: card', break, text:'first content line', …]. Extract the
    // post-opener children as a synthetic paragraph so content isn't dropped.
    const firstText = openerNode.children[0].value as string;
    const newlineIdx = firstText.indexOf('\n');
    const restChildren: any[] = [];
    if (newlineIdx >= 0) {
      const remainder = firstText.slice(newlineIdx + 1);
      if (remainder) restChildren.push({ type: 'text', value: remainder });
      restChildren.push(...openerNode.children.slice(1));
    } else {
      // First text is exactly the opener line; skip a leading hard break if present.
      const startSliceIdx = openerNode.children[1]?.type === 'break' ? 2 : 1;
      restChildren.push(...openerNode.children.slice(startSliceIdx));
    }
    if (restChildren.length > 0) {
      const syntheticPara = {
        type: 'paragraph',
        children: restChildren,
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  }

  let i = startIdx + 1;

  if (pendingAfterOpener) {
    // Build a virtual list so collectContainer can consume the nested opener
    // plus the real nodes that follow it.
    const virtualNodes = [pendingAfterOpener, ...nodes.slice(startIdx + 1)];
    const inner = collectContainer(virtualNodes, 0);
    containerChildren.push(inner.node);
    if (inner.trailing) containerChildren.push(...inner.trailing);
    // inner.nextIndex is relative to virtualNodes whose [0] is the synthetic para;
    // real nodes start at startIdx+1, so advance i by (inner.nextIndex - 1).
    i = startIdx + inner.nextIndex;
  }

  // Helper: build the finished container node and (optionally) trailing siblings.
  const finishWithTrailing = (trailing?: any[]) => {
    const finished = makeContainerNode(opener.containerType, opener.attrs, containerChildren, openerNode.position);
    if (opener.inline) finished.inline = opener.inline;
    if (opener.containerType === 'demo') finished.rawContent = mdastNodesToText(containerChildren);
    return { node: finished, trailing: trailing && trailing.length > 0 ? trailing : undefined, nextIndex: i };
  };

  while (i < nodes.length) {
    const child = nodes[i];

    if (isContainerCloser(child)) {
      i++;
      break;
    }

    // Leading-closer paragraph: a single-text paragraph whose first line is
    // bare `:::` followed by more lines (sibling container with no blank line
    // between, e.g. `:::\n::: card\nB`). The first line closes the current
    // container; the remaining lines become a synthetic sibling that
    // `processNodes` re-processes (and recognizes as a new opener).
    if (child.type === 'paragraph' && child.children?.length === 1 && child.children[0].type === 'text') {
      const value = child.children[0].value as string;
      const lines = value.split('\n');
      if (lines.length > 1 && lines[0].trim() === ':::') {
        const after = lines.slice(1).join('\n');
        i++;
        return finishWithTrailing(after.trim()
          ? [{ type: 'paragraph', children: [{ type: 'text', value: after }] }]
          : undefined);
      }
    }

    // List whose final item ends with `\n:::` — the closer got folded into
    // the list item's text because there's no blank line between the list
    // and the `:::` line. Strip the closer, push the cleaned list, and
    // close this container.
    if (child.type === 'list' && child.children?.length) {
      const items = child.children;
      const last = items[items.length - 1];
      const para = last?.children?.[0];
      if (para?.type === 'paragraph' && para.children?.length) {
        const lastTextChild = para.children[para.children.length - 1];
        if (lastTextChild?.type === 'text' && /\n:::\s*$/.test(lastTextChild.value as string)) {
          const stripped = (lastTextChild.value as string).replace(/\n:::\s*$/, '');
          const newPara = {
            ...para,
            children: [
              ...para.children.slice(0, -1),
              { ...lastTextChild, value: stripped },
            ],
          };
          const newLast = { ...last, children: [newPara, ...(last.children?.slice(1) || [])] };
          const newList = { ...child, children: [...items.slice(0, -1), newLast] };
          containerChildren.push(newList);
          i++;
          return finishWithTrailing();
        }
      }
    }

    // Text-before-nested-opener: a single-text paragraph whose later lines
    // are themselves a `::: type` opener line (folded together because no
    // blank line separates them). Split: text-before becomes a paragraph
    // child of this container; the opener line + any subsequent real
    // sibling nodes form a nested container.
    if (child.type === 'paragraph' && child.children?.length === 1 && child.children[0].type === 'text') {
      const value = child.children[0].value as string;
      const lines = value.split('\n');
      let nestedOpenerLine = -1;
      for (let li = 1; li < lines.length; li++) {
        const candidate = { type: 'paragraph', children: [{ type: 'text', value: lines[li] }] };
        if (parseContainerOpener(candidate)) {
          nestedOpenerLine = li;
          break;
        }
      }
      if (nestedOpenerLine > 0) {
        const before = lines.slice(0, nestedOpenerLine).join('\n').trim();
        if (before) {
          containerChildren.push({ type: 'paragraph', children: [{ type: 'text', value: before }] });
        }
        const remainder = lines.slice(nestedOpenerLine).join('\n');
        const syntheticOpener = { type: 'paragraph', children: [{ type: 'text', value: remainder }] };
        const virtualNodes = [syntheticOpener, ...nodes.slice(i + 1)];
        const inner = collectContainer(virtualNodes, 0);
        containerChildren.push(inner.node);
        if (inner.trailing) containerChildren.push(...inner.trailing);
        i = i + 1 + (inner.nextIndex - 1);
        continue;
      }
    }

    // Nested container opener — recurse (must precede implicit-closer check so that
    // a paragraph like "::: tab Label\ncontent\n:::" is treated as a nested container,
    // not as an implicit closer for the outer container).
    if (parseContainerOpener(child)) {
      const inner = collectContainer(nodes, i);
      containerChildren.push(inner.node);
      if (inner.trailing) containerChildren.push(...inner.trailing);
      i = inner.nextIndex;
      continue;
    }

    // Implicit closer: paragraph whose last text node contains `\n:::` —
    // either at the end (`text\n:::`) or mid-string with trailing content
    // (`text\n:::\ntrailing`). The trailing portion becomes a synthetic
    // sibling for re-processing by `processNodes`.
    if (child.type === 'paragraph' && child.children?.length) {
      const lastInline = child.children[child.children.length - 1];
      if (lastInline?.type === 'text') {
        const value = lastInline.value as string;
        // `\n:::` followed by either end-of-string or a newline (so we don't
        // confuse with `\n::: type` openers like `\n::: card`).
        const m = value.match(/^([\s\S]*?)\n:::[ \t]*(?:\n([\s\S]*))?$/);
        if (m) {
          const beforeText = m[1].trimEnd();
          const afterText = (m[2] ?? '').replace(/^\n+/, '');
          if (beforeText) {
            containerChildren.push({
              ...child,
              children: [
                ...child.children.slice(0, -1),
                { ...lastInline, value: beforeText },
              ],
            });
          } else if (child.children.length > 1) {
            containerChildren.push({
              ...child,
              children: child.children.slice(0, -1),
            });
          }
          i++;
          return finishWithTrailing(afterText
            ? [{ type: 'paragraph', children: [{ type: 'text', value: afterText }] }]
            : undefined);
        }
      }
    }

    containerChildren.push(child);
    i++;
  }

  return finishWithTrailing();
}

/** Reconstruct wiremd source text from MDAST inline children. */
function mdastInlinesToText(children: any[]): string {
  return (children || []).map((child: any) => {
    switch (child.type) {
      case 'text': return child.value;
      case 'strong': return '**' + mdastInlinesToText(child.children) + '**';
      case 'emphasis': return '_' + mdastInlinesToText(child.children) + '_';
      case 'inlineCode': return '`' + child.value + '`';
      case 'link': return '[' + mdastInlinesToText(child.children) + '](' + child.url + ')';
      case 'image': return '![' + (child.alt || '') + '](' + child.url + ')';
      default: return '';
    }
  }).join('');
}

/** Reconstruct wiremd source text from a list of MDAST block nodes. */
function mdastNodesToText(nodes: any[]): string {
  return nodes.map((node: any) => {
    switch (node.type) {
      case 'heading':
        return '#'.repeat(node.depth) + ' ' + mdastInlinesToText(node.children);
      case 'paragraph':
        return mdastInlinesToText(node.children);
      case 'list':
        return node.children.map((item: any) => {
          const prefix = node.ordered
            ? '1. '
            : item.checked === true ? '- [x] '
            : item.checked === false ? '- [ ] '
            : '- ';
          return prefix + mdastNodesToText(item.children || []).replace(/\n/g, '\n  ');
        }).join('\n');
      case 'table': {
        const rows: string[][] = node.children.map((row: any) =>
          row.children.map((cell: any) => mdastInlinesToText(cell.children || []))
        );
        if (!rows.length) return '';
        const colWidths = rows[0].map((_: any, ci: number) =>
          Math.max(...rows.map((r: string[]) => (r[ci] || '').length), 3)
        );
        const formatRow = (cells: string[]) =>
          '| ' + cells.map((c, i) => c.padEnd(colWidths[i])).join(' | ') + ' |';
        const separator = '| ' + colWidths.map(w => '-'.repeat(w)).join(' | ') + ' |';
        return [formatRow(rows[0]), separator, ...rows.slice(1).map(formatRow)].join('\n');
      }
      case 'code':
        return '```' + (node.lang || '') + '\n' + node.value + '\n```';
      case 'blockquote':
        return mdastNodesToText(node.children).split('\n').map((l: string) => '> ' + l).join('\n');
      case 'wiremdContainer': {
        const inlineSuffix = node.inline ? ' ' + node.inline : '';
        const attrs = node.attributes ? ' ' + node.attributes : '';
        const opener = '::: ' + node.containerType + inlineSuffix + attrs;
        // Skip the first child if it was injected from opener.inline (it's on the opener line)
        let children = node.children || [];
        if (node.inline) {
          const first = children[0];
          if (first?.type === 'paragraph' &&
              first.children?.length === 1 &&
              first.children[0]?.type === 'text' &&
              first.children[0].value?.trim() === node.inline) {
            children = children.slice(1);
          }
        }
        return opener + '\n' + mdastNodesToText(children) + '\n:::';
      }
      default:
        return '';
    }
  }).filter(Boolean).join('\n\n');
}

/** Process a flat array of AST nodes and return nodes with containers properly nested. */
function processNodes(nodes: any[]): any[] {
  const result: any[] = [];
  // Working queue — synthetic trailing siblings get spliced in for re-processing,
  // because trailing may itself be a new container opener (siblings-no-blank-between).
  const queue = nodes.slice();
  let i = 0;

  while (i < queue.length) {
    const node = queue[i];

    if (parseContainerOpener(node)) {
      const { node: containerNode, trailing, nextIndex } = collectContainer(queue, i);
      result.push(containerNode);
      if (trailing && trailing.length > 0) {
        // Insert trailing into the queue at the next position so the loop
        // re-processes them. They may be openers themselves.
        queue.splice(nextIndex, 0, ...trailing);
      }
      i = nextIndex;
    } else {
      result.push(node);
      i++;
    }
  }

  return result;
}

/**
 * Remark plugin to parse wiremd container directives
 */
export const remarkWiremdContainers: Plugin = () => {
  return (tree: any) => {
    tree.children = processNodes(tree.children);
  };
};
