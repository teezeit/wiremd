/** Convert a CodeMirror character offset into a 1-based line number. */
export function lineFromOffset(doc: string, offset: number): number {
  const clamped = Math.min(offset, doc.length);
  let line = 1;
  for (let i = 0; i < clamped; i++) {
    if (doc[i] === '\n') line++;
  }
  return line;
}
