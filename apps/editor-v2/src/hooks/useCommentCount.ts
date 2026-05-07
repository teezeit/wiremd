import { useMemo } from 'react';
import { parse, countCommentThreads } from '@eclectic-ai/wiremd';

export function useCommentCount(markdown: string): number {
  return useMemo(() => countCommentThreads(parse(markdown)), [markdown]);
}
