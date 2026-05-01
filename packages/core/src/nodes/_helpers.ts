/**
 * Re-exports of shared helpers used by node-type modules.
 *
 * During the strangler-fig migration these still live in the legacy
 * parser/renderer files. As nodes migrate, helpers will move here and
 * the legacy files will import from this module instead.
 */

export {
  nextRadioGroupName as nextRadioGroupNameHTML,
  applyRadioGroupName as applyRadioGroupNameHTML,
  renderChildrenList,
} from '../renderer/html-renderer.js';
