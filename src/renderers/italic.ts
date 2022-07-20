import { getMarkdownString } from '../rendering';

export const italicRenderer: MarkdownRenderer = (
  entry: ItalicEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('italic' in entry) {
    let indicator = entry.indicator ?? options.italicIndicator ?? '*';
    return `${indicator}${getMarkdownString(
      entry.italic,
      options
    )}${indicator}`;
  }

  throw new Error('Entry is not an italic entry. Unable to render.');
};
