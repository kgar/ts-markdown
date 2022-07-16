import { getMarkdownString, renderEntries } from '../rendering';

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
