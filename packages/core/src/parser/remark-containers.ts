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

import type { Plugin } from "unified";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import { remarkWiremdInlineContainers } from "./remark-inline-containers.js";

interface ContainerOpener {
  containerType: string;
  attrs: string;
  inline: string;
}

export function normalizeContainerDirectiveSpacing(markdown: string): string {
  const lines = markdown.split(/\r?\n/);
  const out: string[] = [];
  let inFence = false;
  let fenceMarker: "`" | "~" | null = null;

  const isFenceLine = (line: string) => {
    const match = line.trim().match(/^(`{3,}|~{3,})/);
    return match ? match[1] : null;
  };

  const isDirectiveLine = (line: string) =>
    !inFence && /^:::(?:\s|$)/.test(line.trim());

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fence = isFenceLine(line);
    if (fence) {
      const marker = fence[0] as "`" | "~";
      if (!inFence) {
        inFence = true;
        fenceMarker = marker;
      } else if (fenceMarker === marker) {
        inFence = false;
        fenceMarker = null;
      }
    }

    const directive = isDirectiveLine(line);
    if (directive && out.length > 0 && out[out.length - 1].trim() !== "") {
      out.push("");
    }

    // Strip leading whitespace from ::: directive lines so that 4-space
    // indented openers are not consumed by CommonMark's indented code block
    // rule before remark-containers gets to process them.
    out.push(directive ? line.trimStart() : line);

    const nextLine = lines[i + 1];
    if (
      directive &&
      nextLine !== undefined &&
      nextLine.trim() !== ""
    ) {
      out.push("");
    }
  }

  return out.join("\n");
}

/** Parse a paragraph node as a container opener. Returns null if not an opener. */
function parseContainerOpener(node: any): ContainerOpener | null {
  if (
    node.type !== "paragraph" ||
    !node.children?.length ||
    node.children[0].type !== "text"
  )
    return null;

  const firstLine = (node.children[0].value as string).split("\n")[0].trim();
  return parseContainerOpenerLine(firstLine);
}

function parseContainerOpenerLine(line: string): ContainerOpener | null {
  // Match ::: followed by a single-word type, optional {attrs}, optional inline content
  const match = line.trim().match(/^:::\s*(\S+)(?:\s*(\{[^}]+\}))?(?:\s+(.+))?$/);
  if (!match) return null;

  return {
    containerType: (match[1] || "section").trim(),
    attrs: match[2] ? match[2].trim() : "",
    inline: match[3] ? match[3].trim() : "",
  };
}

function isContainerCloserLine(line: string): boolean {
  return line.trim() === ":::";
}

/** Check if a node is a standalone closing ::: paragraph. */
function isContainerCloser(node: any): boolean {
  return (
    node.type === "paragraph" &&
    node.children?.length > 0 &&
    node.children[0].type === "text" &&
    node.children[0].value.trim() === ":::"
  );
}

function makeContainerNode(
  containerType: string,
  attrs: string,
  children: any[],
  position?: any,
): any {
  return {
    type: "wiremdContainer",
    containerType,
    attributes: attrs,
    children,
    position,
    data: {
      hName: "div",
      hProperties: {
        className: ["wiremd-container", `wiremd-${containerType}`],
      },
    },
  };
}

/**
 * Collect and build a container starting at nodes[startIdx] (the opener paragraph).
 * Returns the container node and the index of the first node after the container.
 */
function finishContainer(
  containerType: string,
  attrs: string,
  inline: string,
  children: any[],
  nextIndex: number,
  position?: any,
): { node: any; nextIndex: number } {
  const node = makeContainerNode(containerType, attrs, children, position);
  if (inline) node.inline = inline;
  if (containerType === "demo") {
    node.rawContent = mdastNodesToText(children);
  }
  return { node, nextIndex };
}

function parseMarkdownBlocks(markdown: string): any[] {
  const trimmed = normalizeContainerDirectiveSpacing(markdown.trim());
  if (!trimmed) return [];
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkWiremdInlineContainers);
  const parsed = processor.parse(trimmed);
  const processed = processor.runSync(parsed) as any;
  return processed.children || [];
}

function collectPlainTextContainer(
  lines: string[],
  startIdx: number,
  position?: any,
): { node: any; nextIndex: number } | null {
  const opener = parseContainerOpenerLine(lines[startIdx] || "");
  if (!opener) return null;

  const children: any[] = [];
  if (opener.inline) {
    children.push({
      type: "paragraph",
      children: [{ type: "text", value: opener.inline }],
    });
  }

  const flushContent = (buffer: string[]) => {
    const text = buffer.join("\n").trim();
    if (text) children.push(...parseMarkdownBlocks(text));
    buffer.length = 0;
  };

  const buffer: string[] = [];
  let i = startIdx + 1;
  while (i < lines.length) {
    const line = lines[i];
    if (isContainerCloserLine(line)) {
      flushContent(buffer);
      const node = makeContainerNode(
        opener.containerType,
        opener.attrs,
        children,
        position,
      );
      if (opener.inline) node.inline = opener.inline;
      if (opener.containerType === "demo") {
        node.rawContent = mdastNodesToText(children);
      }
      return { node, nextIndex: i + 1 };
    }

    if (parseContainerOpenerLine(line)) {
      flushContent(buffer);
      const nested = collectPlainTextContainer(lines, i);
      if (nested) {
        children.push(nested.node);
        if (nested.nextIndex <= i) {
          i++;
          continue;
        }
        i = nested.nextIndex;
        continue;
      }
    }

    buffer.push(line);
    i++;
  }

  flushContent(buffer);
  const node = makeContainerNode(
    opener.containerType,
    opener.attrs,
    children,
    position,
  );
  if (opener.inline) node.inline = opener.inline;
  if (opener.containerType === "demo") {
    node.rawContent = mdastNodesToText(children);
  }
  return { node, nextIndex: i };
}

function collectPlainTextContainerRun(
  fullText: string,
  position?: any,
): { node: any; trailing?: any[]; nextIndex: number } | null {
  const lines = fullText.split("\n");
  if (!parseContainerOpenerLine(lines[0] || "")) return null;
  if (
    !lines.slice(1).some((line) => parseContainerOpenerLine(line)) ||
    !lines.slice(1).some((line) => isContainerCloserLine(line))
  ) {
    return null;
  }

  const collected = collectPlainTextContainer(lines, 0, position);
  if (!collected) return null;

  const trailingText = lines.slice(collected.nextIndex).join("\n").trim();
  return {
    node: collected.node,
    nextIndex: 1,
    trailing: trailingText ? parseMarkdownBlocks(trailingText) : undefined,
  };
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
    openerNode.children[0].type === "text"
  ) {
    const fullText = openerNode.children[0].value as string;
    const plainTextRun = collectPlainTextContainerRun(
      fullText,
      openerNode.position,
    );
    if (plainTextRun) return plainTextRun;

    const lines = fullText.split("\n");
    // Depth-aware scan: find the FIRST `:::` that closes this container at
    // depth 0. Scanning from the end (old approach) breaks when multiple
    // nested containers are folded into the same paragraph — it picks up the
    // wrong (outermost) closer.
    let closingIdx = -1;
    let depth = 0;
    for (let j = 1; j < lines.length; j++) {
      const trimmed = lines[j].trim();
      if (/^:::\s+\S/.test(trimmed)) {
        depth++;
      } else if (trimmed === ":::") {
        if (depth === 0) {
          closingIdx = j;
          break;
        }
        depth--;
      }
    }
    if (closingIdx > 0) {
      const contentText = lines.slice(1, closingIdx).join("\n").trim();
      const children: any[] = [];
      if (opener.inline) {
        children.push({
          type: "paragraph",
          children: [{ type: "text", value: opener.inline }],
        });
      }
      if (contentText) {
        children.push(
          ...processNodes([
            {
              type: "paragraph",
              children: [{ type: "text", value: contentText }],
            },
          ]),
        );
      }
      // Preserve any text after the closer line as sibling node(s). Remark
      // folds the entire run of non-blank lines into the opener paragraph,
      // so trailing content here is content that lived after `::: ` on
      // disk and would otherwise be silently dropped.
      const trailingText = lines
        .slice(closingIdx + 1)
        .join("\n")
        .trim();
      const trailing = trailingText
        ? [
            {
              type: "paragraph",
              children: [{ type: "text", value: trailingText }],
            },
          ]
        : undefined;
      return {
        ...finishContainer(
          opener.containerType,
          opener.attrs,
          opener.inline,
          children,
          startIdx + 1,
          openerNode.position,
        ),
        trailing,
      };
    }
  }

  // === CASE 2: Complete container in a single paragraph with inline elements ===
  // e.g. ":::card\nSome **bold** text\n:::" — last text child ends with \n:::
  const lastChild = openerNode.children[openerNode.children.length - 1];
  if (
    lastChild?.type === "text" &&
    (lastChild.value.trim().endsWith(":::") ||
      /\n:::\s*$/.test(lastChild.value))
  ) {
    const processedChildren: any[] = [];
    let startChildIdx = 0;
    if (openerNode.children[0].type === "text") {
      const firstLines = (openerNode.children[0].value as string).split("\n");
      if (firstLines.length > 1 && firstLines[1].trim()) {
        processedChildren.push({
          type: "text",
          value: firstLines.slice(1).join("\n").trim(),
        });
      }
      startChildIdx = 1;
    }
    for (let j = startChildIdx; j < openerNode.children.length; j++) {
      const ch = openerNode.children[j];
      if (j === openerNode.children.length - 1 && ch.type === "text") {
        const value = (ch.value as string).replace(/\n?:::$/, "").trim();
        if (value) processedChildren.push({ ...ch, value });
      } else {
        processedChildren.push(ch);
      }
    }
    const contentChildren =
      processedChildren.length > 0
        ? [{ type: "paragraph", children: processedChildren }]
        : [];
    if (opener.inline) {
      contentChildren.unshift({
        type: "paragraph",
        children: [{ type: "text", value: opener.inline }],
      });
    }
    return finishContainer(
      opener.containerType,
      opener.attrs,
      opener.inline,
      contentChildren,
      startIdx + 1,
      openerNode.position,
    );
  }

  // === CASE 3: Multi-block container — collect until matching closer ::: ===
  const containerChildren: any[] = [];
  let i = startIdx + 1;

  // Helper: build the finished container node and (optionally) trailing siblings.
  // Hoisted above the opener-content branches so early returns from those
  // branches (e.g. rcSplit and the leading-`\n:::` paths) can call it.
  const finishWithTrailing = (trailing?: any[]) => {
    const finished = makeContainerNode(
      opener.containerType,
      opener.attrs,
      containerChildren,
      openerNode.position,
    );
    if (opener.inline) finished.inline = opener.inline;
    if (opener.containerType === "demo")
      finished.rawContent = mdastNodesToText(containerChildren);
    return {
      node: finished,
      trailing: trailing && trailing.length > 0 ? trailing : undefined,
      nextIndex: i,
    };
  };

  // Opener-content extraction: inline text on the same line as the opener
  if (opener.inline) {
    containerChildren.push({
      type: "paragraph",
      children: [{ type: "text", value: opener.inline }],
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
    openerNode.children[0].type === "text"
  ) {
    const fullText = openerNode.children[0].value as string;
    const afterOpener = fullText.split("\n").slice(1).join("\n").trim();
    if (afterOpener) {
      const syntheticPara = {
        type: "paragraph",
        children: [{ type: "text", value: afterOpener }],
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  } else if (
    openerNode.children.length > 1 &&
    openerNode.children[0]?.type === "text"
  ) {
    // Trailing whitespace on the opener line (e.g. `::: card   `) makes remark
    // emit a hard `break` node, splitting the paragraph children into
    // [text:'::: card', break, text:'first content line', …]. Extract the
    // post-opener children as a synthetic paragraph so content isn't dropped.
    const firstText = openerNode.children[0].value as string;
    const newlineIdx = firstText.indexOf("\n");
    const restChildren: any[] = [];
    if (newlineIdx >= 0) {
      const remainder = firstText.slice(newlineIdx + 1);
      if (remainder) restChildren.push({ type: "text", value: remainder });
      restChildren.push(...openerNode.children.slice(1));
    } else {
      // First text is exactly the opener line; skip a leading hard break if present.
      const startSliceIdx = openerNode.children[1]?.type === "break" ? 2 : 1;
      restChildren.push(...openerNode.children.slice(startSliceIdx));
    }
    if (restChildren.length > 0) {
      // Check whether the inline children themselves contain an embedded
      // implicit closer (e.g. `::: tab Security` opener that was folded into
      // a mega-paragraph carries `\n:::\n::: tab Notifications` in its last
      // text child).  If so, close this container immediately and return the
      // post-closer inline content as trailing — no real sibling nodes are
      // consumed, so i stays at startIdx + 1.
      let rcSplitIdx = -1;
      let rcSplitMatch: RegExpMatchArray | null = null;
      for (let ci = 0; ci < restChildren.length; ci++) {
        const ch = restChildren[ci];
        if (ch?.type === "text") {
          const m = (ch.value as string).match(
            /^([\s\S]*?)\n:::[ \t]*(?:\n([\s\S]*))?$/,
          );
          if (m) {
            rcSplitIdx = ci;
            rcSplitMatch = m;
            break;
          }
        }
      }
      if (rcSplitIdx >= 0 && rcSplitMatch) {
        const beforeText = rcSplitMatch[1].trimEnd();
        const afterText = (rcSplitMatch[2] ?? "").replace(/^\n+/, "");
        const contentKids = restChildren.slice(0, rcSplitIdx);
        if (beforeText)
          contentKids.push({
            ...restChildren[rcSplitIdx],
            value: beforeText,
          });
        if (contentKids.length > 0)
          containerChildren.push({ type: "paragraph", children: contentKids });
        const trailingKids: any[] = [];
        if (afterText) trailingKids.push({ type: "text", value: afterText });
        trailingKids.push(...restChildren.slice(rcSplitIdx + 1));
        i = startIdx + 1;
        return finishWithTrailing(
          trailingKids.length > 0
            ? [{ type: "paragraph", children: trailingKids }]
            : undefined,
        );
      }

      const syntheticPara = {
        type: "paragraph",
        children: restChildren,
      };
      if (parseContainerOpener(syntheticPara)) {
        pendingAfterOpener = syntheticPara;
      } else {
        containerChildren.push(syntheticPara);
      }
    }
  }

  if (pendingAfterOpener) {
    // Build a virtual list so collectContainer can consume the nested opener
    // plus the real nodes that follow it.
    const virtualNodes = [pendingAfterOpener, ...nodes.slice(startIdx + 1)];
    const inner = collectContainer(virtualNodes, 0);
    containerChildren.push(inner.node);
    if (inner.trailing && inner.trailing.length > 0) {
      // Splice trailing back into nodes so the outer container loop re-processes
      // them — they may be closers or new openers for this container.
      nodes.splice(startIdx + inner.nextIndex, 0, ...inner.trailing);
    }
    // inner.nextIndex is relative to virtualNodes whose [0] is the synthetic para;
    // real nodes start at startIdx+1, so advance i by (inner.nextIndex - 1).
    i = startIdx + inner.nextIndex;
  }

  while (i < nodes.length) {
    const child = nodes[i];

    if (isContainerCloser(child)) {
      i++;
      break;
    }

    // Leading-closer paragraph: a paragraph whose first child is a text node
    // whose first line is bare `:::`, followed by more content (either more
    // lines of text or additional inline children like strong/emphasis from
    // bold markdown in the next container's content).
    // e.g. `:::\n::: card\nB` or `:::\n::: tab X\n**bold** text`.
    // The first line closes the current container; everything after it becomes
    // a synthetic sibling that `processNodes` re-processes as a new opener.
    if (
      child.type === "paragraph" &&
      child.children?.length > 0 &&
      child.children[0].type === "text"
    ) {
      const firstText = child.children[0].value as string;
      const firstNewline = firstText.indexOf("\n");
      const firstLine = (
        firstNewline >= 0 ? firstText.slice(0, firstNewline) : firstText
      ).trim();
      if (
        firstLine === ":::" &&
        (firstNewline >= 0 || child.children.length > 1)
      ) {
        const restOfFirstText =
          firstNewline >= 0 ? firstText.slice(firstNewline + 1) : "";
        const trailingChildren: any[] = [];
        if (restOfFirstText) {
          trailingChildren.push({ type: "text", value: restOfFirstText });
        }
        trailingChildren.push(...child.children.slice(1));
        i++;
        return finishWithTrailing(
          trailingChildren.length > 0
            ? [{ type: "paragraph", children: trailingChildren }]
            : undefined,
        );
      }
    }

    // List whose final item ends with `\n:::` — the closer got folded into
    // the list item's text because there's no blank line between the list
    // and the `:::` line. Strip the closer, push the cleaned list, and
    // close this container.
    if (child.type === "list" && child.children?.length) {
      const items = child.children;
      const last = items[items.length - 1];
      const para = last?.children?.[0];
      if (para?.type === "paragraph" && para.children?.length) {
        const lastTextChild = para.children[para.children.length - 1];
        if (
          lastTextChild?.type === "text" &&
          /\n:::\s*$/.test(lastTextChild.value as string)
        ) {
          const stripped = (lastTextChild.value as string).replace(
            /\n:::\s*$/,
            "",
          );
          const newPara = {
            ...para,
            children: [
              ...para.children.slice(0, -1),
              { ...lastTextChild, value: stripped },
            ],
          };
          const newLast = {
            ...last,
            children: [newPara, ...(last.children?.slice(1) || [])],
          };
          const newList = {
            ...child,
            children: [...items.slice(0, -1), newLast],
          };
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
    //
    // SKIP this branch when the paragraph itself starts with an opener line —
    // that case is handled by the nested-container-opener branch below, which
    // recurses correctly. Otherwise text-before-nested-opener fires on
    // `::: tab X\n...\n:::\n::: tab Y` paragraphs and pushes the inner tab
    // X content as plain text instead of parsing it as a nested container.
    if (
      child.type === "paragraph" &&
      child.children?.length === 1 &&
      child.children[0].type === "text" &&
      !parseContainerOpener(child)
    ) {
      const value = child.children[0].value as string;
      const lines = value.split("\n");
      let nestedOpenerLine = -1;
      for (let li = 1; li < lines.length; li++) {
        const candidate = {
          type: "paragraph",
          children: [{ type: "text", value: lines[li] }],
        };
        if (parseContainerOpener(candidate)) {
          nestedOpenerLine = li;
          break;
        }
      }
      if (nestedOpenerLine > 0) {
        const before = lines.slice(0, nestedOpenerLine).join("\n").trim();

        // If `before` contains a `\n:::` implicit closer, the closer ends THIS
        // container and the nested opener becomes trailing for the PARENT to
        // handle as a sibling.  Example mega-paragraph inside ::: tab Profile:
        //   "[Save Changes]*\n:::\n::: tab Security\n…\n::: tab Notifications"
        // Here nestedOpenerLine=2, before="[Save Changes]*\n:::", and the
        // trailing `::: tab Security\n…` must be a sibling tab, not a child.
        const closerInBefore = before.search(/\n:::[ \t]*(?:\n|$)/);
        if (closerInBefore >= 0) {
          const contentBefore = before.slice(0, closerInBefore).trim();
          if (contentBefore) {
            containerChildren.push({
              type: "paragraph",
              children: [{ type: "text", value: contentBefore }],
            });
          }
          const remainder = lines.slice(nestedOpenerLine).join("\n");
          const syntheticOpener = {
            type: "paragraph",
            children: [{ type: "text", value: remainder }],
          };
          i++;
          return finishWithTrailing([syntheticOpener]);
        }

        if (before) {
          containerChildren.push({
            type: "paragraph",
            children: [{ type: "text", value: before }],
          });
        }
        const remainder = lines.slice(nestedOpenerLine).join("\n");
        const syntheticOpener = {
          type: "paragraph",
          children: [{ type: "text", value: remainder }],
        };
        const virtualNodes = [syntheticOpener, ...nodes.slice(i + 1)];
        const inner = collectContainer(virtualNodes, 0);
        containerChildren.push(inner.node);
        if (inner.trailing && inner.trailing.length > 0) {
          // Splice trailing back into nodes so the outer container loop re-processes
          // them — they may be closers or new openers for this container.
          nodes.splice(i + inner.nextIndex, 0, ...inner.trailing);
        }
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
      if (inner.trailing && inner.trailing.length > 0) {
        // Splice trailing back into nodes so the outer container loop re-processes
        // them — they may be closers or new openers for this container.
        nodes.splice(inner.nextIndex, 0, ...inner.trailing);
      }
      i = inner.nextIndex;
      continue;
    }

    // Implicit closer: paragraph whose last text node contains `\n:::` —
    // either at the end (`text\n:::`) or mid-string with trailing content
    // (`text\n:::\ntrailing`). The trailing portion becomes a synthetic
    // sibling for re-processing by `processNodes`.
    if (child.type === "paragraph" && child.children?.length) {
      // Find the FIRST text child that contains an implicit closer `\n:::`.
      // Searching only the last child (old approach) breaks when a blank-line-
      // free sequence folds multiple tab closers and openers into one paragraph,
      // e.g. `[Save Changes]*\n:::\n::: tab Security\n…\n::: tab Notifications`
      // — the first `\n:::` (after [Save Changes]*) is in an earlier child.
      let closingChildIdx = -1;
      let closingMatch: RegExpMatchArray | null = null;
      for (let ci = 0; ci < child.children.length; ci++) {
        const ch = child.children[ci];
        if (ch?.type === "text") {
          // `\n:::` followed by end-of-string or more content (but NOT `\n::: type`
          // openers — those have non-whitespace after `:::`).
          const m = (ch.value as string).match(
            /^([\s\S]*?)\n:::[ \t]*(?:\n([\s\S]*))?$/,
          );
          if (m) {
            closingChildIdx = ci;
            closingMatch = m;
            break;
          }
        }
      }
      if (closingChildIdx >= 0 && closingMatch) {
        const beforeText = closingMatch[1].trimEnd();
        const afterText = (closingMatch[2] ?? "").replace(/^\n+/, "");
        const beforeKids = child.children.slice(0, closingChildIdx);
        if (beforeText) {
          containerChildren.push({
            ...child,
            children: [
              ...beforeKids,
              { ...child.children[closingChildIdx], value: beforeText },
            ],
          });
        } else if (beforeKids.length > 0) {
          containerChildren.push({ ...child, children: beforeKids });
        }
        // Children AFTER the closing text node become the trailing content.
        const afterKids = child.children.slice(closingChildIdx + 1);
        const trailingKids: any[] = [];
        if (afterText) trailingKids.push({ type: "text", value: afterText });
        trailingKids.push(...afterKids);
        i++;
        return finishWithTrailing(
          trailingKids.length > 0
            ? [{ type: "paragraph", children: trailingKids }]
            : undefined,
        );
      }
    }

    containerChildren.push(child);
    i++;
  }

  return finishWithTrailing();
}

/** Reconstruct wiremd source text from MDAST inline children. */
function mdastInlinesToText(children: any[]): string {
  return (children || [])
    .map((child: any) => {
      switch (child.type) {
        case "text":
          return child.value;
        case "strong":
          return "**" + mdastInlinesToText(child.children) + "**";
        case "emphasis":
          return "_" + mdastInlinesToText(child.children) + "_";
        case "inlineCode":
          return "`" + child.value + "`";
        case "link":
          return (
            "[" + mdastInlinesToText(child.children) + "](" + child.url + ")"
          );
        case "image":
          return "![" + (child.alt || "") + "](" + child.url + ")";
        default:
          return "";
      }
    })
    .join("");
}

/** Reconstruct wiremd source text from a list of MDAST block nodes. */
function mdastNodesToText(nodes: any[]): string {
  return nodes
    .map((node: any) => {
      switch (node.type) {
        case "heading":
          return (
            "#".repeat(node.depth) + " " + mdastInlinesToText(node.children)
          );
        case "paragraph":
          return mdastInlinesToText(node.children);
        case "list":
          return node.children
            .map((item: any) => {
              const prefix = node.ordered
                ? "1. "
                : item.checked === true
                  ? "- [x] "
                  : item.checked === false
                    ? "- [ ] "
                    : "- ";
              return (
                prefix +
                mdastNodesToText(item.children || []).replace(/\n/g, "\n  ")
              );
            })
            .join("\n");
        case "table": {
          const rows: string[][] = node.children.map((row: any) =>
            row.children.map((cell: any) =>
              mdastInlinesToText(cell.children || []),
            ),
          );
          if (!rows.length) return "";
          const colWidths = rows[0].map((_: any, ci: number) =>
            Math.max(...rows.map((r: string[]) => (r[ci] || "").length), 3),
          );
          const formatRow = (cells: string[]) =>
            "| " +
            cells.map((c, i) => c.padEnd(colWidths[i])).join(" | ") +
            " |";
          const separator =
            "| " + colWidths.map((w) => "-".repeat(w)).join(" | ") + " |";
          return [
            formatRow(rows[0]),
            separator,
            ...rows.slice(1).map(formatRow),
          ].join("\n");
        }
        case "code":
          return "```" + (node.lang || "") + "\n" + node.value + "\n```";
        case "blockquote":
          return mdastNodesToText(node.children)
            .split("\n")
            .map((l: string) => "> " + l)
            .join("\n");
        case "wiremdContainer": {
          const inlineSuffix = node.inline ? " " + node.inline : "";
          const attrs = node.attributes ? " " + node.attributes : "";
          const opener = "::: " + node.containerType + inlineSuffix + attrs;
          // Skip the first child if it was injected from opener.inline (it's on the opener line)
          let children = node.children || [];
          if (node.inline) {
            const first = children[0];
            if (
              first?.type === "paragraph" &&
              first.children?.length === 1 &&
              first.children[0]?.type === "text" &&
              first.children[0].value?.trim() === node.inline
            ) {
              children = children.slice(1);
            }
          }
          return opener + "\n" + mdastNodesToText(children) + "\n:::";
        }
        default:
          return "";
      }
    })
    .filter(Boolean)
    .join("\n\n");
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
      const {
        node: containerNode,
        trailing,
        nextIndex,
      } = collectContainer(queue, i);
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
