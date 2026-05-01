/**
 * Static registry of migrated node-type modules.
 *
 * Empty during the scaffold phase. As each node type is moved into
 * `nodes/<type>/`, its NodeDefinition is added here and the
 * corresponding case arms are deleted from the legacy parser/renderer
 * switch statements.
 *
 * Lookup is a plain object access; tree-shaking handles the rest.
 */

import type { AnyNodeDefinition } from './_contract.js';
import { button } from './button/index.js';
import { container } from './container/index.js';
import { nav } from './nav/index.js';
import { navItem } from './nav-item/index.js';
import { brand } from './brand/index.js';
import { grid } from './grid/index.js';
import { gridItem } from './grid-item/index.js';
import { row } from './row/index.js';
import { heading } from './heading/index.js';
import { paragraph } from './paragraph/index.js';
import { text } from './text/index.js';
import { image } from './image/index.js';
import { icon } from './icon/index.js';
import { link } from './link/index.js';
import { list } from './list/index.js';
import { listItem } from './list-item/index.js';
import { table } from './table/index.js';
import { tableHeader } from './table-header/index.js';
import { tableRow } from './table-row/index.js';
import { tableCell } from './table-cell/index.js';
import { blockquote } from './blockquote/index.js';
import { code } from './code/index.js';

export const registry: Partial<Record<string, AnyNodeDefinition>> = {
  button: button as AnyNodeDefinition,
  container: container as AnyNodeDefinition,
  nav: nav as AnyNodeDefinition,
  'nav-item': navItem as AnyNodeDefinition,
  brand: brand as AnyNodeDefinition,
  grid: grid as AnyNodeDefinition,
  'grid-item': gridItem as AnyNodeDefinition,
  row: row as AnyNodeDefinition,
  heading: heading as AnyNodeDefinition,
  paragraph: paragraph as AnyNodeDefinition,
  text: text as AnyNodeDefinition,
  image: image as AnyNodeDefinition,
  icon: icon as AnyNodeDefinition,
  link: link as AnyNodeDefinition,
  list: list as AnyNodeDefinition,
  'list-item': listItem as AnyNodeDefinition,
  table: table as AnyNodeDefinition,
  'table-header': tableHeader as AnyNodeDefinition,
  'table-row': tableRow as AnyNodeDefinition,
  'table-cell': tableCell as AnyNodeDefinition,
  blockquote: blockquote as AnyNodeDefinition,
  code: code as AnyNodeDefinition,
};

/**
 * Lookup helper. Returns `undefined` for unmigrated node types so
 * callers can fall through to legacy dispatch.
 */
export function getNodeDefinition(type: string): AnyNodeDefinition | undefined {
  return registry[type];
}
