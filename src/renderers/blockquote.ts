import { getMarkdownString, renderEntries } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { DataDrivenMarkdownEntry } from '../shared.types';

export type BlockquoteEntry = {
  blockquote: string | DataDrivenMarkdownEntry[];
  append?: string;
} & DataDrivenMarkdownEntry;

export const blockquoteRenderer = (
  entry: BlockquoteEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('blockquote' in entry) {
    return typeof entry.blockquote === 'string'
      ? '> ' + getMarkdownString(entry.blockquote, options)
      : renderEntries(entry.blockquote, { ...options, prefix: '> ' });
  }

  throw new Error('Entry is not a blockquote entry. Unable to render.');
};
