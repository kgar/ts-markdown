import { getMarkdownString } from '../rendering';

export const boldRenderer: MarkdownRenderer = (
  entry: BoldEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('bold' in entry) {
    let indicator = entry.indicator ?? options.boldIndicator ?? '*';

    return `${indicator}${indicator}${getMarkdownString(
      entry.bold,
      options
    )}${indicator}${indicator}`;
  }

  throw new Error('Entry is not a bold entry. Unable to render.');
};
