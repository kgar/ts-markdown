import { getMarkdownString } from '../rendering';

export const highlightRenderer: MarkdownRenderer = (
  entry: HighlightEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight, options)}==`;
  }

  throw new Error('Entry is not a highlight entry. Unable to render.');
};
