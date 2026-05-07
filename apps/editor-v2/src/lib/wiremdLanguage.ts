import { StreamLanguage } from '@codemirror/language';
import type { StringStream } from '@codemirror/language';

export const wiremdLanguage = StreamLanguage.define({
  name: 'wiremd',
  token(stream: StringStream): string | null {
    if (stream.match(/^#{1,6} /)) { stream.skipToEnd(); return 'heading'; }
    if (stream.match(/^:::/)) { stream.skipToEnd(); return 'typeName'; }
    if (stream.match(/\[\[.*?\]\]/)) return 'string';
    if (stream.match(/\(\([^()\n]+\)\)(\{[^}]*\})?/)) return 'tagName';
    if (stream.match(/\[.*?\]\*/)) return 'keyword';
    if (stream.match(/\[[*_|]+\]/)) return 'number';
    if (stream.match(/\{[^}]*\}/)) return 'meta';
    if (stream.match(/^>.*$/)) { stream.skipToEnd(); return 'comment'; }
    if (stream.match(/\*\*[^*]+\*\*/)) return 'strong';
    if (stream.match(/\*[^*]+\*/)) return 'emphasis';
    if (stream.match(/\|/)) return 'operator';
    stream.next();
    return null;
  },
});
