import { getMarkdownString, renderEntries } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

export type BlockquoteEntry = {
  blockquote: string | MarkdownEntry[];
  append?: string;
} & MarkdownEntry;

export const blockquoteRenderer: MarkdownRenderer = (
  entry: BlockquoteEntry,
  options: RenderOptions
) => {
  if ('blockquote' in entry) {
    return {
      markdown:
        typeof entry.blockquote === 'string'
          ? '> ' + getMarkdownString(entry.blockquote, options)
          : renderEntries(entry.blockquote, { ...options, prefix: '> ' }),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a blockquote entry. Unable to render.');
};
