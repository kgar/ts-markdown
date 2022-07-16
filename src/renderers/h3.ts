import { getMarkdownString, getOptionalHeaderIdText } from '../rendering';

export const h3Renderer: MarkdownRenderer = (
  entry: H3Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h3' in entry) {
    return `### ${getMarkdownString(
      entry.h3,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h3 entry. Unable to render.');
};
