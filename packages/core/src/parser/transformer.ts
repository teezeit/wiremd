/**
 * MDAST to wiremd AST Transformer
 * Converts remark's MDAST into wiremd-specific AST nodes
 *
 * Copyright (c) 2025 wiremd
 * Licensed under MIT License
 * https://github.com/teezeit/wiremd/blob/main/LICENSE
 */

import type { Root as MdastRoot } from 'mdast';
import type {
  DocumentNode,
  WiremdNode,
  ParseOptions,
  DocumentMeta,
} from '../types.js';
import { SYNTAX_VERSION } from '../index.js';
import {
  type TransformContext,
  type ContextDeps,
  makeContext,
} from './_context.js';

const BADGE_VARIANTS = ['default', 'primary', 'success', 'warning', 'error', 'danger'];
const BADGE_TOKEN_PATTERN = /(?:\(\([^()\n]+\)\)|\|[^|\n]+\|)(?:\s*\{[^}]*\})?/;
const BADGE_TOKEN_SPLIT = new RegExp(`(${BADGE_TOKEN_PATTERN.source})`);
const BADGE_TOKEN_SPLIT_GLOBAL = new RegExp(`(${BADGE_TOKEN_PATTERN.source})`, 'g');
const BADGE_TOKEN_EXACT = /^(?:\(\(([^()\n]+)\)\)|\|([^|\n]+)\|)(?:\s*(\{[^}]*\}))?$/;
const INLINE_TEXT_TOKEN_SPLIT = new RegExp(
  `(\\[[^\\]]+\\](?:\\*)?(?:\\s*\\{[^}]*\\})?|:[a-z0-9-]+:|${BADGE_TOKEN_PATTERN.source})`,
);

/**
 * Transform MDAST to wiremd AST
 */
export function transformToWiremdAST(
  mdast: MdastRoot,
  options: ParseOptions = {}
): DocumentNode {
  const meta: DocumentMeta = {
    version: SYNTAX_VERSION,
    viewport: 'desktop',
    theme: 'sketch',
  };

  const children = processNodeList(mdast.children as any[], options);
  children.forEach(normalizeSemanticTokens);

  return {
    type: 'document',
    version: SYNTAX_VERSION,
    meta,
    children,
  };
}

// Wiring for the per-iteration TransformContext factory. Defined as a const so
// `makeContext` can stay decoupled from the concrete transform functions in
// `transformer.ts`. Function declarations below are hoisted, so referencing
// them from this initializer is safe.
const ctxDeps: ContextDeps = {
  transformNode: (mdast, ctx) => transformNode(mdast as any, ctx),
  processNodeList: (mdastList, options) => processNodeList(mdastList as any[], options),
  parseAttributes,
  extractTextContent,
  isHtmlCommentNode,
};

/**
 * Test-only handle on the transformer's internals. Exposed so isolated parse
 * tests can invoke `transformNode` against crafted MDAST without going through
 * the full `parse(markdown)` pipeline. Not part of the public API — keep
 * imports under `tests/`.
 */
export const __transformerInternals = {
  transformNode,
  processNodeList,
  ctxDeps,
};

/**
 * Push a transform result into a children array, flattening if the result
 * was a list (e.g. a paragraph that split into a button + a text sibling).
 */
function pushTransformed(arr: WiremdNode[], result: WiremdNode | WiremdNode[] | null): void {
  if (!result) return;
  if (Array.isArray(result)) {
    for (const r of result) arr.push(r);
  } else {
    arr.push(result);
  }
}

/**
 * Transform a single MDAST node to a wiremd node, or to a list of sibling
 * wiremd nodes when the source paragraph splits into multiple block-level
 * elements (e.g. a button line followed by a free-text line). Callers that
 * push the result into a `children` array should spread the array form via
 * `pushTransformed` rather than appending it directly.
 */
function transformNode(
  node: any,
  ctx: TransformContext
): WiremdNode | WiremdNode[] | null {
  switch (node.type) {
    case 'wiremdContainer':
      return transformContainer(node, ctx);

    case 'wiremdInlineContainer':
      return transformInlineContainer(node, ctx);

    case 'heading':
      return transformHeading(node, ctx);

    case 'paragraph':
      return transformParagraph(node, ctx);

    case 'text':
      return {
        type: 'text',
        content: node.value,
      };

    case 'list':
      return transformList(node, ctx);

    case 'listItem':
      return transformListItem(node, ctx);

    case 'table':
      return transformTable(node, ctx);

    case 'blockquote':
      return transformBlockquote(node, ctx);

    case 'code':
      return {
        type: 'code',
        value: node.value,
        lang: node.lang || undefined,
        inline: false,
      };

    case 'inlineCode':
      return {
        type: 'code',
        value: node.value,
        inline: true,
      };

    case 'image':
      return {
        type: 'image',
        src: node.url || '',
        alt: node.alt || '',
        props: {},
      };

    case 'link': {
      const linkChildren: WiremdNode[] = [];
      for (const child of node.children || []) {
        pushTransformed(linkChildren, ctx.transformChild(child));
      }
      return {
        type: 'link',
        href: node.url || '#',
        title: node.title,
        children: linkChildren,
        props: {},
      };
    }

    case 'thematicBreak':
      return {
        type: 'separator',
        props: {},
      };

    case 'html': {
      const m = (node.value as string).match(/^<!--([\s\S]*?)-->$/);
      if (m) return { type: 'comment', text: m[1].trim() };
      return null;
    }

    default:
      // Warn about unsupported nodes in development
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[wiremd] Unsupported node type: ${node.type}`);
      }
      return null;
  }
}

/**
 * Process a list of MDAST nodes into wiremd nodes.
 * Shared by both the top-level document pass and container children.
 * Layout containers (columns, row, tabs) are handled via ::: syntax in transformContainer.
 */
function processNodeList(nodeChildren: any[], options: ParseOptions): WiremdNode[] {
  const result: WiremdNode[] = [];
  let i = 0;

  while (i < nodeChildren.length) {
    const node = nodeChildren[i];
    const handle = makeContext(nodeChildren, i, options, ctxDeps);

    const transformed = transformNode(node, handle.ctx);
    if (transformed) {
      // A transform can return a single node or an array of sibling nodes
      // (e.g. a paragraph that splits into a button + a free-text paragraph).
      // Propagate the source position only to the first emitted node so the
      // editor's source-position links still target the original line.
      const emitted = Array.isArray(transformed) ? transformed : [transformed];
      if (emitted.length > 0 && node.position && !(emitted[0] as any).position) {
        (emitted[0] as any).position = node.position;
      }
      for (const e of emitted) result.push(e);
    }
    // Advance past anything the transform consumed via ctx.consumeNext().
    i = handle.getCursor() + 1;
  }

  return result;
}

/** Returns true if an MDAST node is an HTML comment (<!-- ... -->). */
function isHtmlCommentNode(node: any): boolean {
  return node.type === 'html' && typeof node.value === 'string' && /^<!--[\s\S]*-->$/.test(node.value.trim());
}

const BUTTON_VARIANT_TOKENS = ['primary', 'secondary', 'danger'] as const;
const BUTTON_SIZE_TOKENS = ['small', 'large'] as const;
const BUTTON_STATE_TOKENS = ['disabled', 'loading'] as const;
const ALIGNMENT_TOKENS = ['left', 'center', 'right'] as const;
const VERTICAL_ALIGNMENT_TOKENS = ['top', 'bottom'] as const;
const STATUS_CLASS_TOKENS = ['primary', 'success', 'warning', 'error', 'danger'] as const;
const FORM_STATE_TOKENS = ['error', 'success', 'warning'] as const;

function ensureClass(props: any, className: string): void {
  props.classes = Array.isArray(props.classes) ? props.classes : [];
  if (!props.classes.includes(className)) props.classes.push(className);
}

function takeBooleanToken(props: any, token: string): boolean {
  if (props[token] !== true) return false;
  delete props[token];
  return true;
}

function normalizeButtonProps(props: any): void {
  for (const token of BUTTON_VARIANT_TOKENS) {
    if (takeBooleanToken(props, token) && !props.variant) {
      props.variant = token;
    }
  }

  for (const token of BUTTON_STATE_TOKENS) {
    if (takeBooleanToken(props, token) && !props.state) {
      props.state = token;
    }
  }

  for (const token of BUTTON_SIZE_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, token);
    }
  }
}

function normalizeBadgeProps(props: any): void {
  for (const token of BADGE_VARIANTS) {
    if (takeBooleanToken(props, token) && !props.variant) {
      props.variant = token === 'danger' ? 'error' : token;
    }
  }
}

function normalizeRowProps(props: any): void {
  for (const token of ALIGNMENT_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, token);
    }
  }

  for (const token of VERTICAL_ALIGNMENT_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, `align-${token}`);
    }
  }
}

function normalizeContainerProps(props: any): void {
  for (const token of STATUS_CLASS_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, token === 'danger' ? 'error' : token);
    }
  }
}

function normalizeFormControlProps(props: any): void {
  for (const token of FORM_STATE_TOKENS) {
    if (takeBooleanToken(props, token) && !props.state) {
      props.state = token;
    }
  }
}

function normalizeVerticalAlignmentProps(props: any): void {
  for (const token of VERTICAL_ALIGNMENT_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, `align-${token}`);
    }
  }
}

function normalizeGridItemProps(props: any): void {
  for (const key of Object.keys(props)) {
    const match = key.match(/^span-(\d+)$/);
    if (match && props[key] === true) {
      delete props[key];
      ensureClass(props, `col-span-${match[1]}`);
    }
  }

  for (const token of ALIGNMENT_TOKENS) {
    if (takeBooleanToken(props, token)) {
      ensureClass(props, `align-${token}`);
    }
  }

  normalizeVerticalAlignmentProps(props);
}

function normalizeSemanticTokens(node: any): void {
  if (!node || typeof node !== 'object') return;

  if (node.props) {
    normalizeVerticalAlignmentProps(node.props);
    if (node.type === 'button') normalizeButtonProps(node.props);
    if (node.type === 'badge') normalizeBadgeProps(node.props);
    if (node.type === 'container') normalizeContainerProps(node.props);
    if (['input', 'select', 'textarea'].includes(node.type)) normalizeFormControlProps(node.props);
    if (node.type === 'row') normalizeRowProps(node.props);
    if (node.type === 'grid-item') normalizeGridItemProps(node.props);
  }

  if (Array.isArray(node.children)) {
    node.children.forEach(normalizeSemanticTokens);
  }
}

function mapColumnClasses(classes: string[] = []): string[] {
  const mapped: string[] = [];
  for (const className of classes) {
    const span = className.match(/^span-(\d+)$/);
    if (span) {
      mapped.push(`col-span-${span[1]}`);
    } else if (['left', 'center', 'right'].includes(className)) {
      mapped.push(`align-${className}`);
    } else if (['top', 'bottom'].includes(className)) {
      mapped.push(`align-${className}`);
    } else {
      mapped.push(className);
    }
  }
  return mapped;
}

function parseBareColumnProps(value: string): any | null {
  const trimmed = value.trim();
  if (!trimmed || !trimmed.split(/\s+/).every((part) => part.startsWith('.'))) {
    return null;
  }
  return parseAttributes(`{${trimmed}}`);
}

function parseColumnInline(value: string): { title: string; props: any } {
  const trimmed = value.trim();
  const bareProps = parseBareColumnProps(trimmed);
  if (bareProps) {
    return { title: '', props: bareProps };
  }

  const attrMatch = trimmed.match(/^(.*?)(?:\s+(\{[^}]+\}))?$/);
  return {
    title: attrMatch?.[1]?.trim() || trimmed,
    props: attrMatch?.[2] ? parseAttributes(attrMatch[2]) : { classes: [] },
  };
}

function createColumnTitleHeading(title: string): WiremdNode {
  const children = parseInlineToNodes(title);
  const hasRichInline = children.some((child) => child.type !== 'text' || 'mark' in child);

  if (hasRichInline) {
    return {
      type: 'heading',
      level: 3,
      children: children as any,
      props: { classes: [] },
    };
  }

  return {
    type: 'heading',
    level: 3,
    content: title,
    props: { classes: [] },
  };
}

function transformColumnContainer(
  node: any,
  ctx: TransformContext,
  isCard = false,
): WiremdNode {
  const props = parseAttributes(node.attributes || '');
  const contentChildren = [...(node.children || [])];
  const inlineParts =
    typeof node.inline === 'string' ? parseColumnInline(node.inline) : null;
  const title = inlineParts?.title || '';

  if (inlineParts) {
    const baseClasses = props.classes || [];
    const inlineClasses = inlineParts.props.classes || [];
    Object.assign(props, inlineParts.props);
    props.classes = [...baseClasses, ...inlineClasses];
    if (
      contentChildren[0]?.type === 'paragraph' &&
      extractTextContent(contentChildren[0]).trim() === node.inline.trim()
    ) {
      contentChildren.shift();
    }
  } else if (contentChildren[0]?.type === 'paragraph') {
    const firstText = extractTextContent(contentChildren[0]);
    const firstParagraphProps = parseBareColumnProps(firstText);
    if (firstParagraphProps) {
      const baseClasses = props.classes || [];
      const paragraphClasses = firstParagraphProps.classes || [];
      Object.assign(props, firstParagraphProps);
      props.classes = [...baseClasses, ...paragraphClasses];
      contentChildren.shift();
    }
  }

  const classes = mapColumnClasses(props.classes || []);
  if (isCard) classes.unshift('card');
  const children = ctx.transformChildren(contentChildren) as any;
  if (title) {
    children.unshift(createColumnTitleHeading(title));
  }

  return {
    type: 'grid-item',
    props: { ...props, classes },
    children,
  };
}

function collectColumnItemsFromContainer(
  children: any[],
  ctx: TransformContext,
  isCard: boolean,
): WiremdNode[] {
  const items: WiremdNode[] = [];
  for (const child of children) {
    if (isHtmlCommentNode(child)) {
      const m = (child.value as string).match(/^<!--([\s\S]*?)-->$/);
      if (m) items.push({ type: 'comment', text: m[1].trim() } as any);
      continue;
    }
    if (child.type === 'wiremdContainer' && child.containerType === 'column') {
      items.push(transformColumnContainer(child, ctx, isCard));
    }
  }
  return items;
}

/**
 * Wrap each direct child of a ::: row container as an implicit grid-item.
 * Each paragraph/node is its own grid-item. Same-line controls split into
 * separate row items; separate physical lines inside the row remain horizontal.
 * Dropdown paragraphs are always grouped with their following option list.
 */
function collectRowItemsFromContainer(
  children: any[],
  ctx: TransformContext,
): WiremdNode[] {
  const items: WiremdNode[] = [];
  let i = 0;
  while (i < children.length) {
    const child = children[i];
    if (child.type === 'paragraph') {
      const nodeText = extractTextContent(child);
      const controls = parseBracketControlsFromLine(nodeText);
      const next = children[i + 1];
      const needsOptionList = controls?.some((control) => control.type === 'select') && next?.type === 'list';
      if (controls && !needsOptionList) {
        for (const control of controls) {
          items.push({
            type: 'grid-item',
            props: { classes: [] },
            children: [control] as any,
          });
        }
        i++;
        continue;
      }
    }
    const groupNodes = [child];
    i++;
    if (child.type === 'paragraph') {
      const nodeText = extractTextContent(child);
      const isDropdown = /\[[^\]]+v\](?:\s*\{[^}]+\})?$/.test(nodeText);
      if (isDropdown && i < children.length && children[i].type === 'list') {
        groupNodes.push(children[i]);
        i++;
      }
    }
    const transformed = ctx.transformChildren(groupNodes);
    for (const node of transformed) {
      if (node.type === 'row') {
        items.push(...(node.children || []));
      } else {
        items.push({
          type: 'grid-item',
          props: { classes: [] },
          children: [node] as any,
        });
      }
    }
  }

  return items;
}

/**
 * Transform container node (:::)
 */
function transformContainer(node: any, ctx: TransformContext): WiremdNode {
  const props = parseAttributes(node.attributes || '');
  const containerType: string = (node.containerType || '').trim();

  // ::: columns-N  /  ::: columns-N card
  const columnsMatch = containerType.match(/^columns-(\d+)$/);
  if (columnsMatch) {
    const columns = parseInt(columnsMatch[1], 10);
    const firstChild = node.children[0];
    const firstChildText: string =
      firstChild?.type === 'paragraph' && firstChild.children?.[0]?.type === 'text'
        ? (firstChild.children[0].value as string)
        : '';
    // Accept `card` as the FIRST WORD on the opener-inline line, ignoring any
    // free trailing text — `::: columns-3 card extra ignored` still flags it.
    const firstWord = firstChildText.trim().split(/\s+/)[0];
    const hasCard =
      firstWord === 'card' ||
      (props.classes || []).includes('card');
    const contentChildren = hasCard ? node.children.slice(1) : node.children;
    return {
      type: 'grid',
      columns,
      props: { ...props, card: hasCard, classes: (props.classes || []).filter((c: string) => c !== 'card') },
      children: collectColumnItemsFromContainer(contentChildren, ctx, hasCard) as any,
    };
  }

  // ::: column
  if (containerType === 'column') {
    return transformColumnContainer(node, ctx);
  }

  // ::: row
  if (containerType === 'row') {
    return {
      type: 'row',
      props,
      children: collectRowItemsFromContainer(node.children || [], ctx) as any,
    };
  }

  // ::: tabs  (children are ::: tab containers)
  if (containerType === 'tabs') {
    const processed = ctx.transformChildren(node.children || []) as any[];
    // Prepend comments that appear between :::tab blocks to the next tab's children
    const pending: any[] = [];
    const tabs: any[] = [];
    for (const n of processed) {
      if (n.type === 'comment') {
        pending.push(n);
      } else if (n.type === 'tab') {
        if (pending.length > 0) {
          n.children = [...pending, ...(n.children || [])];
          pending.length = 0;
        }
        if (!n.label) n.label = `Tab ${tabs.length + 1}`;
        tabs.push(n);
      }
    }
    if (tabs.length > 0 && !tabs.some((t: any) => t.active)) {
      tabs[0].active = true;
    }
    return { type: 'tabs', props, children: tabs as any };
  }

  // ::: tab Label  /  ::: tab Label {.active}
  if (containerType === 'tab') {
    let label = '';
    let isActive = false;
    let contentChildren = node.children || [];
    if (typeof node.inline === 'string' && node.inline) {
      const m = node.inline.match(/^(.+?)(?:\s*(\{[^}]+\}))?$/);
      label = m?.[1]?.trim() || node.inline.trim();
      isActive = (m?.[2] || '').includes('active');
      const firstChild = contentChildren[0];
      if (
        firstChild?.type === 'paragraph' &&
        extractTextContent(firstChild).trim() === node.inline.trim()
      ) {
        contentChildren = contentChildren.slice(1);
      }
    }
    return {
      type: 'tab',
      label,
      active: isActive,
      props,
      children: ctx.transformChildren(contentChildren) as any,
    };
  }

  if (containerType === 'demo') {
    return {
      type: 'demo',
      raw: node.rawContent || '',
      props,
      children: ctx.transformChildren(node.children || []) as any,
    };
  }

  // ::: accordion [card] / ::: accordion {exclusive}  (children are ::: item containers)
  if (containerType === 'accordion') {
    // `card` arrives as bare word in node.inline; `exclusive`/`open` as boolean props
    const inlineWord = (typeof node.inline === 'string' ? node.inline : '').trim().split(/\s+/)[0];
    const hasCard = inlineWord === 'card' || (props.classes || []).includes('card') || !!props.card;
    const hasExclusive = !!props.exclusive || (props.classes || []).includes('exclusive');
    const hasOpen = !!props.open || (props.classes || []).includes('open');
    const classes = [
      ...(props.classes || []).filter((c: string) => !['card', 'exclusive', 'open'].includes(c)),
      ...(hasCard ? ['card'] : []),
      ...(hasExclusive ? ['exclusive'] : []),
    ];
    const processed = ctx.transformChildren(node.children || []) as any[];
    const items = processed
      .filter((n: any) => n.type === 'accordion-item')
      .map((item: any) => hasOpen ? { ...item, expanded: true } : item);
    const { card: _card, exclusive: _excl, open: _open, ...restProps } = props;
    return { type: 'accordion', props: { ...restProps, classes }, children: items as any };
  }

  // ::: item Summary / ::: item Summary {open}
  if (containerType === 'item') {
    let summary = '';
    let isExpanded = false;
    let contentChildren = node.children || [];
    if (typeof node.inline === 'string' && node.inline) {
      const m = node.inline.match(/^(.+?)(?:\s*(\{[^}]+\}))?$/);
      summary = m?.[1]?.trim() || node.inline.trim();
      isExpanded = (m?.[2] || '').includes('open');
      const firstChild = contentChildren[0];
      if (
        firstChild?.type === 'paragraph' &&
        extractTextContent(firstChild).trim() === node.inline.trim()
      ) {
        contentChildren = contentChildren.slice(1);
      }
    }
    return {
      type: 'accordion-item',
      summary,
      expanded: isExpanded,
      props,
      children: ctx.transformChildren(contentChildren) as any,
    };
  }

  return {
    type: 'container',
    containerType: containerType as any,
    props,
    children: ctx.transformChildren(node.children || []) as any,
  };
}

/**
 * Transform inline container node ([[...]])
 */
function transformInlineContainer(node: any, _ctx: TransformContext): WiremdNode {
  const props = parseAttributes(node.attributes || '');
  const items = node.items || [];
  const children: WiremdNode[] = [];

  // Detect breadcrumb: single item containing ">" separator (e.g. [[ Home > Products > Item ]])
  if (items.length === 1 && items[0].includes('>')) {
    const crumbs = items[0].split(/\s*>\s*/).map((c: string) => c.trim()).filter(Boolean);
    return {
      type: 'breadcrumbs',
      props,
      children: crumbs.map((crumb: string, i: number) => ({
        type: 'breadcrumb-item',
        content: crumb,
        current: i === crumbs.length - 1,
        props: {},
      })) as any,
    };
  }

  // Parse each item - could be text, icon, or button
  let brandEmitted = false;
  for (const item of items) {
    const trimmed = item.trim();

    // Check if it's an active/emphasized item: *Text* or **Text**
    const activeMatch = trimmed.match(/^\*\*?([^*]+)\*\*?$/);
    if (activeMatch) {
      children.push({
        type: 'nav-item',
        content: activeMatch[1],
        props: { classes: ['active'] },
      });
      continue;
    }

    // Check if it's a link nav-item: [Text](url) or [Text](url)*
    const linkMatch = trimmed.match(/^\[([^\]]+)\]\(([^)]+)\)(\*)?$/);
    if (linkMatch) {
      children.push({
        type: 'nav-item',
        content: linkMatch[1],
        href: linkMatch[2],
        props: { variant: linkMatch[3] ? 'primary' : undefined },
      });
      continue;
    }

    // Check if it's a button: [Text] or [Text]*
    const buttonMatch = trimmed.match(/^\[([^\]]+)\](\*)?$/);
    if (buttonMatch) {
      children.push({
        type: 'button',
        content: buttonMatch[1],
        props: {
          variant: buttonMatch[2] ? 'primary' : undefined,
        },
      });
      continue;
    }

    // Check if it's an icon: :icon:
    const iconMatch = trimmed.match(/^:([a-z0-9-]+):$/);
    if (iconMatch) {
      children.push({
        type: 'icon',
        props: { name: iconMatch[1] },
      });
      continue;
    }

    // Check if it starts with icon: :icon: Text
    const iconTextMatch = trimmed.match(/^:([a-z0-9-]+):\s*(.+)$/);
    if (iconTextMatch) {
      const iconName = iconTextMatch[1];
      const text = iconTextMatch[2];

      // Create a brand node for :logo:, otherwise nav-item
      const nodeType = iconName === 'logo' ? 'brand' : 'nav-item';
      if (nodeType === 'brand') {
        brandEmitted = true;
      }

      children.push({
        type: nodeType,
        children: [
          { type: 'icon', props: { name: iconName } },
          { type: 'text', content: text },
        ],
        props: {},
      });
      continue;
    }

    // Otherwise, first plain text item is the brand; rest are nav items
    if (!brandEmitted) {
      brandEmitted = true;
      children.push({
        type: 'brand',
        children: [{ type: 'text', content: trimmed, props: {} }] as any,
        props: {},
      });
    } else {
      children.push({
        type: 'nav-item',
        content: trimmed,
        props: {},
      });
    }
  }

  return {
    type: 'nav',
    props,
    children: children as any,
  };
}

/**
 * Transform heading node
 */
function transformHeading(node: any, _ctx: TransformContext): WiremdNode {
  // Extract attributes from heading text
  const content = extractTextContent(node);

  // Check if heading has attributes at the end: "Title {.class}" or "{.class}" alone
  const attrMatch = content.match(/^(.*?)(\{[^}]+\})$/);
  let headingText = content;
  let props: any = { classes: [] };

  if (attrMatch) {
    headingText = attrMatch[1].trim();
    props = parseAttributes(attrMatch[2]);
  }

  // Parse icons in heading text
  if (/:([a-z0-9-]+):/.test(headingText)) {
    const iconPattern = /:([a-z0-9-]+):/g;
    const parts = headingText.split(iconPattern);
    const children: WiremdNode[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim()) {
          children.push({
            type: 'text',
            content: parts[i],
            props: {},
          });
        }
      } else {
        children.push({
          type: 'icon',
          props: { name: parts[i] },
        });
      }
    }

    return {
      type: 'heading',
      level: node.depth as 1 | 2 | 3 | 4 | 5 | 6,
      children: children as any,
      props,
    };
  }

  return {
    type: 'heading',
    level: node.depth as 1 | 2 | 3 | 4 | 5 | 6,
    content: headingText,
    props,
  };
}

/**
 * Detect one or more [[Text](url)]* patterns in a paragraph's children.
 * Remark produces alternating text/link nodes because CommonMark forbids nested links:
 *   "[", link, "]*[", link, "]"
 * Returns button nodes, or null if the children don't match this pattern at all.
 */
function tryParseButtonLinkSequence(children: any[]): WiremdNode[] | null {
  if (!children || children.length < 3 || children.length % 2 === 0) return null;

  // Must alternate: text, link, text, link, text, ...
  for (let i = 0; i < children.length; i++) {
    if (i % 2 === 0 && children[i].type !== 'text') return null;
    if (i % 2 === 1 && children[i].type !== 'link') return null;
  }

  // First text must be exactly "[" (optionally with leading whitespace)
  if (!/^\s*\[$/.test(children[0].value)) return null;

  // Last text must be "]" + optional "*" + optional "{attrs}" + nothing else
  const lastText: string = children[children.length - 1].value;
  if (!/^\](\*)?\s*(\{[^}]*\})?\s*$/.test(lastText)) return null;

  // Each middle text (between two links) must be "]...[" — closes previous, opens next
  for (let i = 2; i <= children.length - 3; i += 2) {
    if (!/^\](\*)?\s*(\{[^}]*\})?\s*\[$/.test(children[i].value)) return null;
  }

  return children
    .filter((_: any, i: number) => i % 2 === 1) // keep only link nodes
    .map((linkNode: any, idx: number) => {
      const closingText: string = children[idx * 2 + 2].value;
      const closeMatch = closingText.match(/^\](\*)?\s*(\{[^}]*\})?/);
      const isPrimary = !!(closeMatch && closeMatch[1]);
      const attrStr = (closeMatch && closeMatch[2]) || '';
      const attrs = attrStr ? parseAttributes(attrStr) : {};
      return {
        type: 'button' as const,
        content: extractTextContent(linkNode),
        href: linkNode.url || '#',
        props: { ...attrs, variant: isPrimary ? 'primary' : (attrs as any).variant },
      };
    });
}

function parseButtonLinkLines(serialized: string): WiremdNode | WiremdNode[] | null {
  if (!serialized.includes('\n')) return null;

  const lines = serialized
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  if (lines.length < 2) return null;

  const out: WiremdNode[] = [];
  for (const line of lines) {
    const buttons: WiremdNode[] = [];
    let remaining = line;
    const pattern = /^\[\[([^\]]+)\]\(([^)]+)\)\](\*)?(?:\s*(\{[^}]*\}))?/;

    while (remaining.trim()) {
      remaining = remaining.trimStart();
      const match = remaining.match(pattern);
      if (!match) return null;
      const [, text, href, isPrimary, attrs] = match;
      const props = attrs ? parseAttributes(attrs) : {};
      buttons.push({
        type: 'button',
        content: text,
        href,
        props: { ...props, variant: isPrimary ? 'primary' : (props as any).variant },
      });
      remaining = remaining.slice(match[0].length);
    }

    const node = controlsAsNode(buttons, true);
    if (node) out.push(node);
  }

  if (out.length === 0) return null;
  return out.length === 1 ? out[0] : out;
}

function serializeMdastChildren(children: any[]): string {
  return (children || []).map((child: any) => {
    if (child.type === 'link') {
      const text = (child.children || []).map((c: any) => c.value || '').join('');
      return `[${text}](${child.url})`;
    }
    if (child.type === 'strong') return `**${serializeMdastChildren(child.children)}**`;
    if (child.type === 'emphasis') return `*${serializeMdastChildren(child.children)}*`;
    return child.value || '';
  }).join('');
}

function makeImplicitRow(children: WiremdNode[]): WiremdNode {
  return {
    type: 'row',
    props: {},
    children: children.map((child) => ({
      type: 'grid-item',
      props: { classes: [] },
      children: [child],
    })) as any,
  };
}

function controlsAsNode(children: WiremdNode[], forceRow = false): WiremdNode | null {
  if (children.length === 0) return null;
  if (children.length === 1 && !forceRow) return children[0];
  return makeImplicitRow(children);
}

function switchNodeFromParts(text: string, attrs?: string): WiremdNode | null {
  const props = parseAttributes(attrs || '');
  if (!props.switch) return null;
  const checked = Boolean(props.checked);
  delete props.switch;
  delete props.checked;
  return {
    type: 'switch',
    label: text.trim(),
    checked,
    props,
  };
}

function parseBracketControlsFromLine(line: string): WiremdNode[] | null {
  const trimmed = line.trim();
  if (!trimmed || !/\[/.test(trimmed)) return null;

  const controlPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
  const controls: WiremdNode[] = [];
  let match;

  while ((match = controlPattern.exec(trimmed)) !== null) {
    const [, text, isPrimary, attrs] = match;
    const switchNode = switchNodeFromParts(text, attrs);
    if (switchNode) {
      controls.push(switchNode);
      continue;
    }

    const props = parseAttributes(attrs || '');

    if ('rows' in props) return null;

    if (/_{1,}v$/.test(text)) {
      const placeholder = text.replace(/_{1,}v$/, '').trim() || undefined;
      controls.push({
        type: 'select',
        props: { ...props, ...(placeholder ? { placeholder } : {}) },
        options: [],
      } as any);
      continue;
    }

    if (/^[_*]+$/.test(text) || /_{3,}$/.test(text)) {
      const placeholderMatch = text.match(/^([^_*]+)_{3,}$/);
      if (placeholderMatch) props.placeholder = placeholderMatch[1].trim();
      controls.push({ type: 'input', props });
      continue;
    }

    if (isPrimary) props.variant = 'primary';

    if (/:([a-z0-9-]+):/.test(text)) {
      const iconPattern = /:([a-z0-9-]+):/g;
      const parts = text.split(iconPattern);
      const children: WiremdNode[] = [];

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          if (parts[i].trim()) children.push({ type: 'text', content: parts[i], props: {} });
        } else {
          children.push({ type: 'icon', props: { name: parts[i] } });
        }
      }

      controls.push({ type: 'button', content: '', children: children as any, props });
    } else {
      controls.push({ type: 'button', content: text, props });
    }
  }

  if (controls.length === 0) return null;

  const remainingText = trimmed.replace(controlPattern, '').trim();
  return remainingText ? null : controls;
}

function transformParagraph(node: any, ctx: TransformContext): WiremdNode | WiremdNode[] {
  const nextNode = ctx.peekNext() as any;
  // Check for [[...]] inline container before any other processing — handles nested containers
  // where remark-inline-containers only runs on top-level nodes
  if (node.children?.length) {
    const serialized = serializeMdastChildren(node.children);
    const inlineMatch = serialized.match(/^\[\[\s*(.+?)\s*\]\](\{[^}]+\})?$/);
    if (inlineMatch) {
      const content = inlineMatch[1];
      const attrs = inlineMatch[2] || '';
      const items = content.split('|').map((item: string) => item.trim());
      return transformInlineContainer({ type: 'wiremdInlineContainer', content, items, attributes: attrs.trim() }, ctx);
    }

    const linkedButtonLines = parseButtonLinkLines(serialized);
    if (linkedButtonLines) return linkedButtonLines;
  }

  // Check if this paragraph has rich content (strong, emphasis, links, images, etc.)
  const hasRichContent = node.children && node.children.some((child: any) =>
    child.type === 'strong' || child.type === 'emphasis' || child.type === 'link' || child.type === 'code' || child.type === 'inlineCode' || child.type === 'image'
  );

  // [[Button](url)]* — one or more linked-button patterns on the same line.
  // CommonMark forbids nested links so remark produces alternating text/link children:
  //   "[", link, "]*", "[", link, "]"  for two buttons, etc.
  const buttonLinks = tryParseButtonLinkSequence(node.children);
  if (buttonLinks !== null) {
    if (buttonLinks.length === 1) return buttonLinks[0];
    return makeImplicitRow(buttonLinks as any);
  }

  // If it has rich content and is not a special pattern, return as a rich text paragraph
  if (hasRichContent) {
    let content = extractTextContent(node);
    // Clean up trailing ::: from container closing markers
    content = content.replace(/\s*:::\s*$/, '').trim();

    // Still check for button patterns first
    const buttonMatch = content.match(/^\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?$/);
    if (buttonMatch) {
      const switchNode = switchNodeFromParts(buttonMatch[1], buttonMatch[3]);
      if (switchNode) return switchNode;

      const attrs = buttonMatch[3] ? parseAttributes(buttonMatch[3]) : {};
      return {
        type: 'button',
        content: buttonMatch[1],
        props: {
          ...attrs,
          variant: buttonMatch[2] ? 'primary' : undefined,
        },
      };
    }

    // For other rich content, check if we have mixed content with buttons
    const processedChildren: WiremdNode[] = [];
    let currentText = '';

    const flushText = () => {
      if (currentText) {
        processedChildren.push({
          type: 'text',
          content: currentText,
          props: {},
        });
        currentText = '';
      }
    };

    for (const child of node.children) {
      if (child.type === 'text') {
        // Check for buttons and icons in text
        // Split on both button patterns and icon patterns
        const textParts = child.value.split(INLINE_TEXT_TOKEN_SPLIT);
        for (const part of textParts) {
          // Check for button
          const buttonMatch = part.match(/^\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?$/);
          if (buttonMatch && !/^\[[_*]+\]/.test(part)) {
            // It's a button or switch
            flushText();
            const switchNode = switchNodeFromParts(buttonMatch[1], buttonMatch[3]);
            if (switchNode) {
              processedChildren.push(switchNode);
              continue;
            }
            const attrs = buttonMatch[3] ? parseAttributes(buttonMatch[3]) : {};
            processedChildren.push({
              type: 'button',
              content: buttonMatch[1],
              props: {
                ...attrs,
                variant: buttonMatch[2] ? 'primary' : undefined,
              },
            });
          } else if (part.match(/^:([a-z0-9-]+):$/)) {
            // It's an icon
            flushText();
            const iconMatch = part.match(/^:([a-z0-9-]+):$/);
            if (iconMatch) {
              processedChildren.push({
                type: 'icon',
                props: { name: iconMatch[1] },
              });
            }
          } else if (parseBadgeToken(part)) {
            // It's a pill/badge
            flushText();
            processedChildren.push(parseBadgeToken(part)!);
          } else if (part) {
            currentText += part;
          }
        }
      } else if (child.type === 'image') {
        // Flush text before image and add image as separate child
        flushText();
        processedChildren.push({
          type: 'image',
          src: child.url || '',
          alt: child.alt || '',
          props: {},
        });
      } else if (child.type === 'strong') {
        flushText();
        processedChildren.push({
          type: 'text',
          content: extractTextContent(child),
          mark: 'strong',
          props: {},
        });
      } else if (child.type === 'emphasis') {
        flushText();
        processedChildren.push({
          type: 'text',
          content: extractTextContent(child),
          mark: 'em',
          props: {},
        });
      } else if (child.type === 'code' || child.type === 'inlineCode') {
        flushText();
        processedChildren.push({
          type: 'code',
          value: extractTextContent(child),
          inline: true,
        });
      } else if (child.type === 'link') {
        flushText();
        processedChildren.push({
          type: 'link',
          href: child.url || '#',
          title: child.title,
          children: [{ type: 'text', content: extractTextContent(child), props: {} }],
          props: {},
        });
      } else {
        currentText += extractTextContent(child);
      }
    }
    flushText();

    // If we only have one text child with no buttons, return as paragraph
    if (processedChildren.length === 1 && processedChildren[0].type === 'text') {
      const only = processedChildren[0] as Extract<WiremdNode, { type: 'text' }>;
      // A marked text (strong/em/code) needs to keep its mark — flatten to a
      // children-shaped paragraph so the renderer wraps it properly.
      if (only.mark) {
        return {
          type: 'paragraph',
          children: [only] as any,
          props: {},
        };
      }
      return {
        type: 'paragraph',
        content: only.content,
        props: {},
      };
    }

    // If every child is an inline text-like node (text, inline code, link),
    // return a paragraph with structured children instead of folding into a
    // form-group container. Form-group is for paragraphs that mix labels with
    // buttons/inputs/badges/icons/images.
    const isInlineTextLike = (n: WiremdNode) =>
      n.type === 'text' ||
      (n.type === 'code' && n.inline === true) ||
      n.type === 'link';
    if (processedChildren.length > 0 && processedChildren.every(isInlineTextLike)) {
      return {
        type: 'paragraph',
        children: processedChildren as any,
        props: {},
      };
    }

    // If we have multiple children or buttons, return as container
    return {
      type: 'container',
      containerType: 'form-group',
      children: processedChildren as any,
      props: {},
    };
  }

  let content = extractTextContent(node);
  // Clean up trailing ::: from container closing markers
  content = content.replace(/\s*:::\s*$/, '').trim();

  // Check for standalone checkbox: [ ] or [x] or [X]
  const checkboxMatch = content.match(/^\[\s*([xX ])\s*\]\s+(.+)$/);
  if (checkboxMatch) {
    const checked = checkboxMatch[1].toLowerCase() === 'x';
    let label = checkboxMatch[2];

    // Extract attributes from label if present
    const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
    let props: any = {};
    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }

    return {
      type: 'checkbox',
      label,
      checked,
      props,
    };
  }

  const standaloneSwitchMatch = content.match(/^\[([^\]]+)\](?:\s*(\{[^}]*\}))$/);
  if (standaloneSwitchMatch) {
    const switchNode = switchNodeFromParts(standaloneSwitchMatch[1], standaloneSwitchMatch[2]);
    if (switchNode) return switchNode;
  }

  // Check for inline radio buttons: (*) Option1 ( ) Option2 ( ) Option3
  // Must have at least 2 radio button patterns on the same line
  const radioPattern = /\(([*•x ])\)\s+([^(]+?)(?=\s*\(|$)/g;
  const radioMatches = Array.from(content.matchAll(radioPattern));

  if (radioMatches.length >= 2) {
    const radioButtons: WiremdNode[] = [];

    for (const match of radioMatches) {
      const selected = match[1] !== ' ';
      let label = match[2].trim();

      // Remove trailing attributes if present
      const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
      let props: any = {};
      if (attrMatch) {
        label = attrMatch[1].trim();
        props = parseAttributes(attrMatch[2]);
      }

      radioButtons.push({
        type: 'radio',
        label,
        selected,
        props,
      });
    }

    return {
      type: 'radio-group',
      props: { inline: true },
      children: radioButtons as any,
    };
  }

  // Check for inline container syntax [[...]]
  const inlineContainerMatch = content.match(/^\[\[\s*(.+?)\s*\]\](\{[^}]+\})?/);
  if (inlineContainerMatch) {
    const itemsContent = inlineContainerMatch[1];
    const attrs = inlineContainerMatch[2] || '';
    const items = itemsContent.split('|').map((item: string) => item.trim());

    // Create a wiremdInlineContainer-like structure and transform it
    const inlineContainerNode = {
      type: 'wiremdInlineContainer',
      content: itemsContent,
      items,
      attributes: attrs.trim(),
    };

    const transformed = transformInlineContainer(inlineContainerNode, ctx);

    // If there's text after the inline container, wrap both in a container
    const remainingText = content.substring(inlineContainerMatch[0].length).trim();
    if (remainingText) {
      return {
        type: 'container',
        containerType: 'section',
        children: [
          transformed,
          {
            type: 'paragraph',
            content: remainingText,
            props: {},
          }
        ] as any,
        props: {},
      };
    }

    return transformed;
  }

  // Handle multi-line paragraphs (e.g., "Username\n[_____]")
  // Split by newlines and check if any line matches our patterns
  const lines = content.split('\n').filter(line => line.trim());

  // If we have multiple lines, check if ALL lines are buttons/form elements
  if (lines.length > 1) {
    // Check if all lines have icon patterns (e.g., ":star: Star Icon")
    const allWithIcons = lines.every(line => /:([a-z0-9-]+):/.test(line.trim()));

    if (allWithIcons) {
      const iconLines: WiremdNode[] = [];
      for (const line of lines) {
        const trimmed = line.trim();
        const iconPattern = /:([a-z0-9-]+):/g;
        const parts = trimmed.split(iconPattern);
        const lineChildren: WiremdNode[] = [];

        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i].trim()) {
              lineChildren.push({
                type: 'text',
                content: parts[i],
                props: {},
              });
            }
          } else {
            lineChildren.push({
              type: 'icon',
              props: { name: parts[i] },
            });
          }
        }

        if (lineChildren.length > 0) {
          iconLines.push({
            type: 'paragraph',
            children: lineChildren as any,
            props: {},
          });
        }
      }

      if (iconLines.length > 0) {
        return {
          type: 'container',
          containerType: 'section',
          props: {},
          children: iconLines as any,
        };
      }
    }

    // Check if all lines consist entirely of bracket controls (one or more per line)
    const isInputLike = (s: string) => /\[[^\]]*_{3,}[^\]]*\]/.test(s) || /\[[_*]+\]/.test(s);
    const lineIsAllButtons = (line: string) => {
      const trimmed = line.trim();
      if (!trimmed || !/\[/.test(trimmed)) return false;
      if (isInputLike(trimmed)) return false;
      const stripped = trimmed.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, '').trim();
      return stripped === '';
    };
    const allButtons = lines.every(lineIsAllButtons);

    if (allButtons) {
      const out: WiremdNode[] = [];
      for (const line of lines) {
        const controls = parseBracketControlsFromLine(line)?.filter((child) => child.type === 'button' || child.type === 'switch') || [];
        const node = controls.length === 1 && controls[0].type === 'switch'
          ? controls[0]
          : controlsAsNode(controls, lines.length > 1);
        if (node) out.push(node);
      }
      if (out.length === 1) return out[0];
      if (out.length > 1) return out;
    }

    // Heterogeneous mix: some lines are pure-button lines, others are free
    // text. Split into sibling block-level nodes — `[Action]\nfree text`
    // becomes [button, paragraph]; `text\n[Save] [Cancel]` becomes
    // [paragraph, row]. Skipped when any line is a form element
    // (input/dropdown/textarea), because those still get the legacy
    // "label + form-element → form-group" treatment below.
    const hasFormElement = (line: string): boolean => {
      const trimmed = line.trim();
      if (/^\[[^\]]+v\](?:\s*\{[^}]+\})?$/.test(trimmed)) return true;   // dropdown ends with v]
      if (/\[[^\]]*[_*][^\]]*\]/.test(trimmed)) return true;              // input via _ / * inside brackets
      if (/\[[^\]]+\]\s*\{[^}]*\brows\s*:/.test(trimmed)) return true;   // textarea via {rows:N}
      return false;
    };
    const isInlineContainerLine = (line: string): boolean => {
      const trimmed = line.trim();
      return /^\[\[[\s\S]+\]\](\s*\{[^}]+\})?$/.test(trimmed);
    };
    const lineKinds = lines.map((line) => {
      const trimmed = line.trim();
      // Form-element detection wins over the all-buttons check, because
      // textareas like `[Write your message...]{rows:4}` strip cleanly with
      // the button regex but are not buttons.
      if (hasFormElement(trimmed)) return 'form' as const;
      if (isInlineContainerLine(trimmed)) return 'nav' as const;
      if (lineIsAllButtons(trimmed)) return 'buttons' as const;
      return 'text' as const;
    });
    const hasNonTextBlock = lineKinds.some((k) => k === 'buttons' || k === 'nav');
    const hasTextLine = lineKinds.includes('text');
    const hasFormLine = lineKinds.includes('form');
    if (hasNonTextBlock && hasTextLine && !hasFormLine) {
      type Group = { kind: 'buttons' | 'nav' | 'text'; lines: string[] };
      const groups: Group[] = [];
      for (let i = 0; i < lines.length; i++) {
        const kind = lineKinds[i] as Group['kind'];
        const last = groups[groups.length - 1];
        if (last && last.kind === kind) last.lines.push(lines[i]);
        else groups.push({ kind, lines: [lines[i]] });
      }
      const out: WiremdNode[] = [];
      for (const group of groups) {
        if (group.kind === 'buttons') {
          for (const line of group.lines) {
            const controls = parseBracketControlsFromLine(line)?.filter((child) => child.type === 'button' || child.type === 'switch') || [];
            const node = controls.length === 1 && controls[0].type === 'switch'
              ? controls[0]
              : controlsAsNode(controls, group.lines.length > 1);
            if (node) out.push(node);
          }
        } else if (group.kind === 'nav') {
          for (const line of group.lines) {
            const m = line.trim().match(/^\[\[\s*(.+?)\s*\]\](\s*\{[^}]+\})?$/);
            if (m) {
              const items = m[1].split('|').map((s) => s.trim());
              const navNode = transformInlineContainer(
                {
                  type: 'wiremdInlineContainer',
                  content: m[1],
                  items,
                  attributes: (m[2] || '').trim(),
                },
                ctx,
              );
              out.push(navNode);
            }
          }
        } else {
          const text = group.lines.join('\n').trim();
          if (!text) continue;
          // Run the text through the inline splitter so `:icon:` and badge
          // syntax produce proper nodes instead of leaking as literal text.
          const inlineNodes = parseInlineToNodes(text);
          if (inlineNodes.length === 1 && inlineNodes[0].type === 'text') {
            out.push({ type: 'paragraph', content: inlineNodes[0].content, props: {} });
          } else if (inlineNodes.length > 0) {
            out.push({ type: 'paragraph', children: inlineNodes as any, props: {} });
          }
        }
      }
      if (out.length === 1) return out[0];
      if (out.length > 1) return out;
    }

    // Otherwise check if the last line is a form element with labels before it
    const lastLine = lines[lines.length - 1].trim();
    const labelLineArray = lines.slice(0, -1);
    const labelLines = labelLineArray.join('\n');

    // If all preceding lines consist entirely of inline elements (buttons and/or inputs),
    // don't treat them as label text. Preserve physical line breaks outside explicit rows.
    const lineIsAllInlineElements = (line: string) => {
      const trimmed = line.trim();
      if (!trimmed || !/\[/.test(trimmed)) return false;
      const stripped = trimmed.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, '').trim();
      return stripped === '';
    };
    const labelLinesAreButtons = labelLineArray.length > 0 && labelLineArray.every(lineIsAllInlineElements);
    const parseLabelAsRows = (): WiremdNode[] => {
      const nodes: WiremdNode[] = [];
      for (const line of labelLineArray) {
        const controls = parseBracketControlsFromLine(line) || [];
        const node = controlsAsNode(controls, true);
        if (node) nodes.push(node);
      }
      return nodes;
    };

    // Check if last line is a dropdown
    const dropdownMatch = lastLine.match(/^\[([^\]]+)v\](?:\s*(\{[^}]+\}))?$/);
    if (dropdownMatch) {
      const [, text, attrs] = dropdownMatch;
      const props = parseAttributes(attrs || '');
      const options: any[] = [];

      // Check if next node is a list - if so, use list items as options
      if (nextNode && nextNode.type === 'list') {
        for (const item of nextNode.children || []) {
          options.push(selectOptionFromListItem(item));
        }
        // Only consume when we actually absorbed options — matches the legacy
        // post-hoc rule which required `hasSelectWithOptions` for container shapes.
        if (options.length > 0) ctx.consumeNext();
      }

      if (labelLinesAreButtons) {
        return [
          ...parseLabelAsRows(),
          makeImplicitRow([{
            type: 'select',
            props: { ...props, placeholder: text.replace(/[_\s]+$/, '').trim() || undefined },
            options,
          } as any]),
        ];
      }
      // Create a container with label and select
      return {
        type: 'container',
        containerType: 'form-group',
        props: {},
        children: [
          labelLines ? { type: 'text', content: labelLines } : null,
          {
            type: 'select',
            props: {
              ...props,
              placeholder: text.replace(/[_\s]+$/, '').trim() || undefined,
            },
            options,
          }
        ].filter(Boolean) as WiremdNode[],
      };
    }

    // Check if last line is an input
    if (/\[[^\]]*[_*][^\]]*\]/.test(lastLine)) {
      const match = lastLine.match(/^\[([^\]]+)\](?:\s*(\{[^}]+\}))?$/);
      if (match) {
        const [, pattern, attrs] = match;
        const props = parseAttributes(attrs || '');

        // Determine input type and placeholder from pattern
        let placeholderText = '';
        if (pattern.includes('*') && pattern.replace(/[^*]/g, '').length > 3) {
          props.inputType = 'password';
        } else {
          // Extract placeholder text before underscores
          const placeholderMatch = pattern.match(/^([^_*]+)[_*]/);
          if (placeholderMatch) {
            placeholderText = placeholderMatch[1].trim();
            props.placeholder = placeholderText;
          }
        }

        // Count underscores or asterisks to determine width (each char = ~1 character width)
        const underscoreCount = pattern.replace(/[^_]/g, '').length;
        const asteriskCount = pattern.replace(/[^*]/g, '').length;
        const widthChars = underscoreCount > 0 ? underscoreCount : asteriskCount;

        if (widthChars > 0) {
          // If there's placeholder text, width should be at least as long as placeholder + extra padding
          // Add 6 chars padding to account for Comic Sans variable width and browser padding
          // Otherwise use the underscore/asterisk count
          if (placeholderText) {
            props.width = Math.max(placeholderText.length + 6, widthChars);
          } else {
            props.width = widthChars;
          }
        }

        if (labelLinesAreButtons) {
          return [...parseLabelAsRows(), makeImplicitRow([{ type: 'input', props }])];
        }
        // Create a container with label and input
        return {
          type: 'container',
          containerType: 'form-group',
          props: {},
          children: [
            labelLines ? { type: 'text', content: labelLines } : null,
            {
              type: 'input',
              props,
            }
          ].filter(Boolean) as WiremdNode[],
        };
      }
    }

    // Check if last line is a textarea (has rows attribute), button, or multiple buttons
    if (/\[([^\]]+)\]/.test(lastLine)) {
      // First check if it's a textarea (contains rows attribute)
      const textareaMatch = lastLine.match(/^\[([^\]]+)\](?:\s*(\{[^}]*rows:[^}]*\}))$/);
      if (textareaMatch) {
        const [, placeholder, attrs] = textareaMatch;
        const props = parseAttributes(attrs || '');

        if (labelLinesAreButtons) {
          return [
            ...parseLabelAsRows(),
            makeImplicitRow([{
              type: 'textarea',
              props: { ...props, placeholder: placeholder.trim() },
            } as any]),
          ];
        }
        // Create a container with label and textarea
        return {
          type: 'container',
          containerType: 'form-group',
          props: {},
          children: [
            labelLines ? { type: 'text', content: labelLines } : null,
            {
              type: 'textarea',
              props: {
                ...props,
                placeholder: placeholder.trim(),
              }
            }
          ].filter(Boolean) as WiremdNode[],
        };
      }

      // Otherwise check for buttons (skip input-like patterns)
      const buttonPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
      const buttons: WiremdNode[] = [];
      let match;
      const isInputTextMulti = (t: string) => /^[_*]+$/.test(t) || /_{3,}$/.test(t);

      while ((match = buttonPattern.exec(lastLine)) !== null) {
        const [, text, isPrimary, attrs] = match;
        const switchNode = switchNodeFromParts(text, attrs);
        if (switchNode) {
          buttons.push(switchNode);
          continue;
        }

        const props = parseAttributes(attrs || '');
        if (isInputTextMulti(text) || 'rows' in props) continue;
        if (isPrimary) props.variant = 'primary';
        buttons.push({ type: 'button', content: text, props });
      }

      if (buttons.length > 0) {
        if (labelLinesAreButtons) {
          return [...parseLabelAsRows(), makeImplicitRow(buttons)];
        }
        // If we have label lines and buttons, create a container
        if (labelLines) {
          return {
            type: 'container',
            containerType: 'form-group',
            props: {},
            children: [
              { type: 'text', content: labelLines },
              ...buttons
            ] as WiremdNode[],
          };
        }
        if (buttons.length === 1) {
          return buttons[0];
        }
        return makeImplicitRow(buttons);
      }
    }
  }

  // Single line content - check all patterns as before

  // Check if this is a dropdown (ends with 'v]'): [Select option___v]
  const dropdownMatch = content.match(/^\[([^\]]+)v\](?:\s*(\{[^}]+\}))?$/);
  if (dropdownMatch) {
    const [, text, attrs] = dropdownMatch;
    const props = parseAttributes(attrs || '');
    const options: any[] = [];

    // Check if next node is a list - if so, use list items as options
    if (nextNode && nextNode.type === 'list') {
      for (const item of nextNode.children || []) {
        options.push(selectOptionFromListItem(item));
      }
      // Single-line dropdown always consumes when nextNode is a list — matches
      // the legacy post-hoc rule for `select` + `list` (which didn't gate on options length).
      ctx.consumeNext();
    }

    return {
      type: 'select',
      props: {
        ...props,
        placeholder: text.replace(/[_\s]+$/, '').trim() || undefined,
      },
      options,
    };
  }

  // Check if this is an input FIRST: [___] or [***] or [Email___]
  // Input must contain at least one underscore or asterisk
  // This matches: [_____], [*****], [Email___], [Name_______], etc.
  if (/^\[[^\]]*[_*][^\]]*\](?:\s*\{[^}]+\})?$/.test(content)) {
    const match = content.match(/^\[([^\]]+)\](?:\s*(\{[^}]+\}))?$/);
    if (match) {
      const [, pattern, attrs] = match;
      const props = parseAttributes(attrs || '');

      // Determine input type from pattern
      if (pattern.includes('*') && pattern.replace(/[^*]/g, '').length > 3) {
        props.inputType = 'password';
      } else {
        // Extract placeholder text before underscores
        const placeholderMatch = pattern.match(/^([^_*]+)[_*]/);
        if (placeholderMatch) {
          props.placeholder = placeholderMatch[1].trim();
        }
      }

      return {
        type: 'input',
        props,
      };
    }
  }

  // Check for single textarea (has rows attribute)
  const singleTextareaMatch = content.match(/^\[([^\]]+)\](?:\s*(\{[^}]*rows:[^}]*\}))$/);
  if (singleTextareaMatch) {
    const [, placeholder, attrs] = singleTextareaMatch;
    const props = parseAttributes(attrs || '');

    return {
      type: 'textarea',
      props: {
        ...props,
        placeholder: placeholder.trim(),
      }
    };
  }

  // Check for pills: ((Label)), ((Label)){.variant}, or legacy |Label|.
  if (BADGE_TOKEN_SPLIT.test(content)) {
    const textParts = content.split(BADGE_TOKEN_SPLIT_GLOBAL);
    const children: WiremdNode[] = [];

    for (const part of textParts) {
      const badge = parseBadgeToken(part);
      if (badge) {
        children.push(badge);
      } else if (part.trim()) {
        children.push({ type: 'text', content: part, props: {} });
      }
    }

    if (children.length === 1 && children[0].type === 'badge') {
      return children[0];
    }

    if (children.length > 0) {
      return {
        type: 'paragraph',
        children: children as any,
        props: {},
      };
    }
  }

  // Check for multiple buttons on the same line BEFORE icon check: [Submit] [Cancel]
  if (/\[([^\]]+)\]/.test(content)) {
    const buttonPattern = /\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g;
    const elements: WiremdNode[] = [];
    let match;
    const isInputText = (t: string) => /^[_*]+$/.test(t) || /_{3,}$/.test(t);
    const isSelectText = (t: string) => /_{1,}v$/.test(t);

    while ((match = buttonPattern.exec(content)) !== null) {
      const [, text, isPrimary, attrs] = match;
      const switchNode = switchNodeFromParts(text, attrs);
      if (switchNode) {
        elements.push(switchNode);
        continue;
      }

      const props = parseAttributes(attrs || '');

      if (isSelectText(text)) {
        // Dropdown pattern — [Option___v] or [Select_______v]
        const placeholder = text.replace(/_{1,}v$/, '').trim() || undefined;
        if (placeholder) props.placeholder = placeholder;
        elements.push({ type: 'select', props, options: [] } as any);
        continue;
      }

      if (isInputText(text)) {
        // Input pattern — [Search___] or [_____]
        const placeholderMatch = text.match(/^([^_*]+)_{3,}$/);
        if (placeholderMatch) props.placeholder = placeholderMatch[1].trim();
        elements.push({ type: 'input', props });
        continue;
      }

      // Skip if it has rows attribute (it's a textarea)
      if ('rows' in props) continue;

      if (isPrimary) props.variant = 'primary';

      // Parse icons in button text
      if (/:([a-z0-9-]+):/.test(text)) {
        const iconPattern = /:([a-z0-9-]+):/g;
        const parts = text.split(iconPattern);
        const children: WiremdNode[] = [];

        for (let i = 0; i < parts.length; i++) {
          if (i % 2 === 0) {
            if (parts[i].trim()) {
              children.push({ type: 'text', content: parts[i], props: {} });
            }
          } else {
            children.push({ type: 'icon', props: { name: parts[i] } });
          }
        }

        elements.push({ type: 'button', content: '', children: children as any, props });
      } else {
        elements.push({ type: 'button', content: text, props });
      }
    }

    const buttons = elements.filter(e => e.type === 'button');
    const hasMixed = elements.some(e => e.type !== 'button');

    if (elements.length === 1 && content.trim() === content.match(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/)![0]) {
      return elements[0];
    } else if (elements.length > 0) {
      const remainingText = content.replace(/\[([^\]]+)\](\*)?(?:\s*\{[^}]*\})?/g, '').trim();
      if (!remainingText && elements.length > 1) {
        return makeImplicitRow(elements);
      } else if (!remainingText && buttons.length === 1 && !hasMixed) {
        return buttons[0];
      } else if (!remainingText && elements.length === 1) {
        return elements[0];
      } else if (remainingText) {
        // Bracket control(s) with text - create paragraph with mixed content
        const children: WiremdNode[] = [];
        let lastIndex = 0;
        const buttonMatches = Array.from(content.matchAll(/\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?/g));

        buttonMatches.forEach((match, idx) => {
          // Add text before button
          const textBefore = content.substring(lastIndex, match.index);
          if (textBefore.trim()) {
            children.push({ type: 'text', content: textBefore, props: {} });
          }

          // Add bracket control in source order.
          children.push(elements[idx]);

          lastIndex = match.index! + match[0].length;
        });

        // Add remaining text after last button
        const textAfter = content.substring(lastIndex);
        if (textAfter.trim()) {
          children.push({ type: 'text', content: textAfter, props: {} });
        }

        return {
          type: 'paragraph',
          children: children as any,
          props: {},
        };
      }
      // Fallthrough to paragraph if there's mixed content
    }
  }

  // Check for icons in content (after button check to avoid conflicts)
  if (/:([a-z0-9-]+):/.test(content)) {
    const iconPattern = /:([a-z0-9-]+):/g;
    const textParts = content.split(iconPattern);
    const children: WiremdNode[] = [];

    for (let i = 0; i < textParts.length; i++) {
      if (i % 2 === 0) {
        // Text part
        if (textParts[i].trim()) {
          children.push({
            type: 'text',
            content: textParts[i],
            props: {},
          });
        }
      } else {
        // Icon name part
        children.push({
          type: 'icon',
          props: { name: textParts[i] },
        });
      }
    }

    if (children.length > 0) {
      // If only one child and it's an icon, return as icon
      if (children.length === 1 && children[0].type === 'icon') {
        return children[0];
      }

      // If only one child and it's text, return as paragraph
      if (children.length === 1 && children[0].type === 'text') {
        return {
          type: 'paragraph',
          content: children[0].content,
          props: {},
        };
      }

      // Mixed content, return as paragraph with children
      // Clean up trailing ::: from the last text child if present
      const cleanedChildren = [...children];
      if (cleanedChildren.length > 0) {
        const lastChild = cleanedChildren[cleanedChildren.length - 1];
        if (lastChild.type === 'text' && lastChild.content) {
          const cleaned = lastChild.content.replace(/\s*:::\s*$/, '').trim();
          if (cleaned) {
            cleanedChildren[cleanedChildren.length - 1] = { ...lastChild, content: cleaned };
          } else {
            // Remove empty text node
            cleanedChildren.pop();
          }
        }
      }

      return {
        type: 'paragraph',
        children: cleanedChildren as any,
        props: {},
      };
    }
  }

  // Check for standalone icon syntax: :icon-name:
  const iconMatch = content.match(/^:([a-z0-9-]+):$/);
  if (iconMatch) {
    return {
      type: 'icon',
      props: {
        name: iconMatch[1],
      },
    };
  }

  // Default: return as paragraph
  // Remove trailing container closing markers (:::) if present
  const cleanedContent = content.replace(/\s*:::\s*$/, '').trim();

  return {
    type: 'paragraph',
    content: cleanedContent,
    props: {},
  };
}

/**
 * Transform list node
 */
function transformList(node: any, ctx: TransformContext): WiremdNode {
  const children: WiremdNode[] = [];

  for (const item of node.children) {
    pushTransformed(children, ctx.transformChild(item));
  }

  return {
    type: 'list',
    ordered: node.ordered || false,
    props: {},
    children: children as any,
  };
}

/**
 * Transform list item node
 */
function transformListItem(node: any, ctx: TransformContext): WiremdNode {
  // Extract immediate text content (from paragraph) and nested children
  let immediateContent = '';
  const nestedChildren: WiremdNode[] = [];

  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      // First paragraph contains the immediate list item text
      if (child.type === 'paragraph' && !immediateContent) {
        immediateContent = extractTextContent(child);
      }
      // Nested lists should be transformed and added as children
      else if (child.type === 'list') {
        const transformed = transformList(child, ctx);
        if (transformed) {
          nestedChildren.push(transformed);
        }
      }
    }
  }

  const content = immediateContent || extractTextContent(node);

  // Check for task list checkbox: remark-gfm sets checked property
  // node.checked will be true, false, or null (for non-task-list items)
  if (node.checked !== null && node.checked !== undefined) {
    // Extract attributes from label if present
    const attrMatch = content.match(/^(.+?)(\{[^}]+\})$/);
    let label = content;
    let props: any = {};

    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }

    // Parse icons in checkbox label
    if (/:([a-z0-9-]+):/.test(label)) {
      const iconPattern = /:([a-z0-9-]+):/g;
      const parts = label.split(iconPattern);
      const children: WiremdNode[] = [];

      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) {
          if (parts[i].trim()) {
            children.push({
              type: 'text',
              content: parts[i],
              props: {},
            });
          }
        } else {
          children.push({
            type: 'icon',
            props: { name: parts[i] },
          });
        }
      }

      // Add nested children if any
      if (nestedChildren.length > 0) {
        children.push(...nestedChildren);
      }

      return {
        type: 'checkbox',
        label: '', // Will use children instead
        checked: node.checked === true,
        props: { ...props, hasChildren: true },
        children: children as any,
      };
    }

    return {
      type: 'checkbox',
      label,
      checked: node.checked === true,
      props,
      children: nestedChildren.length > 0 ? (nestedChildren as any) : undefined,
    };
  }

  // Check for radio button: ( ) or (•) or (x) or (*)
  const radioMatch = content.match(/^\(([•x* ])\)\s*(.+)$/);
  if (radioMatch) {
    let label = radioMatch[2];

    // Extract attributes from label if present
    const attrMatch = label.match(/^(.+?)(\{[^}]+\})$/);
    let props: any = {};

    if (attrMatch) {
      label = attrMatch[1].trim();
      props = parseAttributes(attrMatch[2]);
    }

    return {
      type: 'radio',
      label,
      selected: radioMatch[1] !== ' ',
      props,
      children: nestedChildren.length > 0 ? (nestedChildren as any) : undefined,
    };
  }

  // Parse icons in regular list items
  if (/:([a-z0-9-]+):/.test(content)) {
    const iconPattern = /:([a-z0-9-]+):/g;
    const parts = content.split(iconPattern);
    const children: WiremdNode[] = [];

    for (let i = 0; i < parts.length; i++) {
      if (i % 2 === 0) {
        if (parts[i].trim()) {
          children.push({
            type: 'text',
            content: parts[i],
            props: {},
          });
        }
      } else {
        children.push({
          type: 'icon',
          props: { name: parts[i] },
        });
      }
    }

    // Add nested children if any
    if (nestedChildren.length > 0) {
      children.push(...nestedChildren);
    }

    return {
      type: 'list-item',
      children: children as any,
      props: {},
    };
  }

  return {
    type: 'list-item',
    content,
    props: {},
    children: nestedChildren.length > 0 ? (nestedChildren as any) : undefined,
  };
}

/**
 * Transform table node
 */
function transformTable(node: any, ctx: TransformContext): WiremdNode {
  const children: WiremdNode[] = [];
  const align = node.align || [];

  // Process each row
  for (let rowIndex = 0; rowIndex < node.children.length; rowIndex++) {
    const row = node.children[rowIndex];
    const isHeader = rowIndex === 0;
    const cells: WiremdNode[] = [];

    // Process each cell in the row
    for (let cellIndex = 0; cellIndex < row.children.length; cellIndex++) {
      const cell = row.children[cellIndex];
      const cellAlign = align[cellIndex] || 'left';
      const cellChildren: WiremdNode[] = [];

      // Transform cell content
      const pushCellTextWithInline = (value: string) => {
        // Split text on all inline wiremd tokens: buttons/inputs/switches
        // `[Label]*{attrs}`, badges `((text)){.cls}`, and icons `:icon:`.
        // Mirrors the rich-paragraph splitter so table cells render all
        // inline elements as proper nodes instead of leaking literal syntax.
        const parts = value.split(INLINE_TEXT_TOKEN_SPLIT);
        for (const part of parts) {
          if (!part) continue;
          const badge = parseBadgeToken(part);
          if (badge) {
            cellChildren.push(badge);
            continue;
          }
          const iconOnly = part.match(/^:([a-z0-9-]+):$/);
          if (iconOnly) {
            cellChildren.push({ type: 'icon', props: { name: iconOnly[1] } });
            continue;
          }
          // Button / input / switch / checkbox: [text]*{attrs}
          const bracketMatch = part.match(/^\[([^\]]+)\](\*)?(?:\s*(\{[^}]*\}))?$/);
          if (bracketMatch) {
            const [, text, isPrimary, attrs] = bracketMatch;
            // Labelless checkbox: [ ] (unchecked) or [x]/[X] (checked)
            if (/^\s*$/.test(text) || /^[xX]$/.test(text)) {
              cellChildren.push({
                type: 'checkbox',
                checked: /^[xX]$/i.test(text.trim()),
                label: '',
                props: parseAttributes(attrs || ''),
              } as any);
              continue;
            }
            const switchNode = switchNodeFromParts(text, attrs);
            if (switchNode) {
              cellChildren.push(switchNode);
              continue;
            }
            const props = parseAttributes(attrs || '');
            if (/_{1,}v$/.test(text)) {
              const placeholder = text.replace(/_{1,}v$/, '').trim() || undefined;
              cellChildren.push({
                type: 'select',
                props: { ...props, ...(placeholder ? { placeholder } : {}) },
                options: [],
              } as any);
              continue;
            }
            if (/^[_*]+$/.test(text) || /_{3,}$/.test(text)) {
              const placeholderMatch = text.match(/^([^_*]+)_{3,}$/);
              if (placeholderMatch) props.placeholder = placeholderMatch[1].trim();
              cellChildren.push({ type: 'input', props });
              continue;
            }
            if (isPrimary) props.variant = 'primary';
            cellChildren.push({ type: 'button', content: text, props });
            continue;
          }
          if (part.trim()) {
            cellChildren.push({ type: 'text', content: part, props: {} });
          }
        }
      };
      for (const child of cell.children || []) {
        if (child.type === 'text') {
          const iconMatch = /^:([a-z0-9-]+):\s*([\s\S]*)$/.exec(child.value);
          if (iconMatch) {
            cellChildren.push({
              type: 'icon',
              props: { name: iconMatch[1] },
            });
            const remainder = iconMatch[2].trim();
            if (remainder) {
              pushCellTextWithInline(remainder);
            }
          } else if (INLINE_TEXT_TOKEN_SPLIT.test(child.value)) {
            // Cell text contains inline wiremd syntax — split into proper nodes.
            pushCellTextWithInline(child.value);
          } else {
            cellChildren.push({
              type: 'text',
              content: child.value,
              props: {},
            });
          }
        } else if (child.type === 'strong') {
          cellChildren.push({
            type: 'text',
            content: `<strong>${extractTextContent(child)}</strong>`,
            props: {},
          });
        } else if (child.type === 'emphasis') {
          cellChildren.push({
            type: 'text',
            content: `<em>${extractTextContent(child)}</em>`,
            props: {},
          });
        } else if (child.type === 'code') {
          cellChildren.push({
            type: 'text',
            content: `<code>${extractTextContent(child)}</code>`,
            props: {},
          });
        } else {
          pushTransformed(cellChildren, ctx.transformChild(child));
        }
      }

      cells.push({
        type: 'table-cell',
        content: extractTextContent(cell),
        children: cellChildren.length > 0 ? cellChildren : undefined,
        align: cellAlign as 'left' | 'center' | 'right',
        header: isHeader,
      });
    }

    if (isHeader) {
      children.push({
        type: 'table-header',
        children: cells,
      });
    } else {
      children.push({
        type: 'table-row',
        children: cells,
      });
    }
  }

  return {
    type: 'table',
    props: {},
    children,
  };
}

/**
 * Transform blockquote node
 */
function transformBlockquote(node: any, ctx: TransformContext): WiremdNode {
  const children: WiremdNode[] = [];

  for (const child of node.children) {
    pushTransformed(children, ctx.transformChild(child));
  }

  return {
    type: 'blockquote',
    props: {},
    children,
  };
}

/**
 * Extract text content from a node and its children
 */
function extractTextContent(node: any): string {
  if (typeof node === 'string') {
    return node;
  }

  if (node.value) {
    return node.value;
  }

  if (node.children && Array.isArray(node.children)) {
    return node.children.map(extractTextContent).join('');
  }

  return '';
}

function selectOptionFromListItem(item: any): Extract<WiremdNode, { type: 'option' }> {
  const label = extractTextContent(item).trim();
  const option: Extract<WiremdNode, { type: 'option' }> = {
    type: 'option',
    value: label,
    label,
    selected: false,
  };

  const paragraph = item?.children?.find((child: any) => child.type === 'paragraph') ?? item;
  const inlineChildren = Array.isArray(paragraph?.children) ? paragraph.children : [];
  const meaningfulChildren = inlineChildren.filter((child: any) =>
    child.type !== 'text' || child.value.trim() !== ''
  );

  if (meaningfulChildren.length === 1) {
    const onlyChild = meaningfulChildren[0];
    if (onlyChild.type === 'link') {
      return {
        ...option,
        value: onlyChild.url || '#',
        label: extractTextContent(onlyChild).trim(),
        href: onlyChild.url || '#',
      };
    }
  }

  const buttonMatch = label.match(/^\[([^\]]+)\](?:\*)?(?:\s*\{[^}]*\})?$/);
  if (buttonMatch) {
    return {
      ...option,
      value: buttonMatch[1].trim(),
      label: buttonMatch[1].trim(),
      action: buttonMatch[1].trim(),
    };
  }

  return option;
}

function parseBadgeToken(token: string): WiremdNode | null {
  const match = token.match(BADGE_TOKEN_EXACT);
  if (!match) return null;

  const [, parenContent, pipeContent, attrs] = match;
  const props = parseAttributes(attrs || '') as any;
  const variantClass = props.classes?.find((className: string) => BADGE_VARIANTS.includes(className));
  if (variantClass) {
    props.variant = variantClass === 'danger' ? 'error' : variantClass;
    props.classes = props.classes.filter((className: string) => className !== variantClass);
  }

  return {
    type: 'badge',
    content: (parenContent ?? pipeContent).trim(),
    props,
  };
}

/**
 * Split a plain-text fragment into inline wiremd nodes — text, badges,
 * and icons. Used by both the multi-line paragraph splitter and the table
 * cell splitter. Pills (`((text)){.cls}` or the legacy pipe form) are split first; each remaining
 * text segment is then split on `:icon:` patterns.
 */
function parseInlineToNodes(content: string): WiremdNode[] {
  const nodes: WiremdNode[] = [];
  const pillSplit = content.split(BADGE_TOKEN_SPLIT_GLOBAL);
  for (const part of pillSplit) {
    if (!part) continue;
    const badge = parseBadgeToken(part);
    if (badge) {
      nodes.push(badge);
      continue;
    }
    const iconSplit = part.split(/:([a-z0-9-]+):/);
    for (let i = 0; i < iconSplit.length; i++) {
      if (i % 2 === 0) {
        if (iconSplit[i]) nodes.push({ type: 'text', content: iconSplit[i], props: {} });
      } else {
        nodes.push({ type: 'icon', props: { name: iconSplit[i] } });
      }
    }
  }
  return nodes;
}

/**
 * Tokenize an attribute body, respecting double/single-quoted strings so
 * values like `placeholder:"Search components..."` survive the split.
 * Returns tokens with quotes still attached on the value side; quote
 * stripping happens in `parseAttributes`.
 */
function tokenizeAttrBody(inner: string): string[] {
  const tokens: string[] = [];
  let buf = '';
  let quote: '"' | "'" | null = null;
  for (let i = 0; i < inner.length; i++) {
    const c = inner[i];
    if (quote) {
      buf += c;
      if (c === quote) quote = null;
    } else if (c === '"' || c === "'") {
      quote = c;
      buf += c;
    } else if (/\s/.test(c)) {
      if (buf) {
        tokens.push(buf);
        buf = '';
      }
    } else {
      buf += c;
    }
  }
  if (buf) tokens.push(buf);
  return tokens;
}

/**
 * Parse attributes from string like {.class key:value key:"quoted value"}
 */
function parseAttributes(attrString: string): any {
  const props: any = {
    classes: [],
  };

  if (!attrString) {
    return props;
  }

  // Remove outer braces
  const inner = attrString.replace(/^\{|\}$/g, '').trim();

  if (!inner) {
    return props;
  }

  const parts = tokenizeAttrBody(inner);

  for (const part of parts) {
    // Class: .classname
    if (part.startsWith('.')) {
      props.classes.push(part.slice(1));
    }
    // State: :state — single leading `:` followed by a single token (no `:value`)
    else if (part.startsWith(':') && !part.slice(1).includes(':')) {
      props.state = part.slice(1);
    }
    // Key-value: key:value (value may be quoted to preserve spaces)
    else if (part.includes(':')) {
      const colonIdx = part.indexOf(':');
      const key = part.slice(0, colonIdx);
      let value = part.slice(colonIdx + 1);
      // Strip surrounding matching quotes.
      if (
        value.length >= 2 &&
        ((value[0] === '"' && value[value.length - 1] === '"') ||
          (value[0] === "'" && value[value.length - 1] === "'"))
      ) {
        value = value.slice(1, -1);
      }
      props[key] = value || true;
    }
    // Boolean: required, disabled, etc.
    else {
      props[part] = true;
    }
  }

  return props;
}
