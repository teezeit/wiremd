/**
 * Style dispatcher.
 *
 * Picks a per-theme CSS module by name and prepends the structural CSS
 * shared across all themes (tabs, rows, comments, demo block, etc.).
 *
 * Adding a new visual style = drop a `styles/<name>.ts` file exporting
 * `get<Name>Style(prefix)` and add it to the switch below.
 */

import { getStructuralCSS } from './_structural.js';
import { getSketchStyle } from './sketch.js';
import { getCleanStyle } from './clean.js';
import { getWireframeStyle } from './wireframe.js';
import { getNoneStyle } from './none.js';
import { getTailwindStyle } from './tailwind.js';
import { getMaterialStyle } from './material.js';
import { getBrutalStyle } from './brutal.js';

export function getStyleCSS(style: string, prefix: string): string {
  let themeCSS: string;
  switch (style) {
    case 'sketch':    themeCSS = getSketchStyle(prefix); break;
    case 'clean':     themeCSS = getCleanStyle(prefix); break;
    case 'wireframe': themeCSS = getWireframeStyle(prefix); break;
    case 'none':      themeCSS = getNoneStyle(prefix); break;
    case 'tailwind':  themeCSS = getTailwindStyle(prefix); break;
    case 'material':  themeCSS = getMaterialStyle(prefix); break;
    case 'brutal':    themeCSS = getBrutalStyle(prefix); break;
    default:          themeCSS = getSketchStyle(prefix);
  }
  return getStructuralCSS(prefix) + themeCSS;
}

export {
  getSketchStyle,
  getCleanStyle,
  getWireframeStyle,
  getNoneStyle,
  getTailwindStyle,
  getMaterialStyle,
  getBrutalStyle,
};
