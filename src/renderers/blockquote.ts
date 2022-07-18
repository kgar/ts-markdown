import { BLOCKQUOTE } from '../constants';
import { getMarkdownString, renderEntries } from '../rendering';

export const blockquoteRenderer = (
  entry: BlockquoteEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('blockquote' in entry) {
    return typeof entry.blockquote === 'string'
      ? BLOCKQUOTE.PREFIX + getMarkdownString(entry.blockquote, options)
      : renderEntries(entry.blockquote, { ...options, prefix: BLOCKQUOTE.PREFIX });
  }

  throw new Error('Entry is not a blockquote entry. Unable to render.');
};
