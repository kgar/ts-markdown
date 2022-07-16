import { getMarkdownString, getOptionalHeaderIdText } from '../rendering';

export const h6Renderer: MarkdownRenderer = (
  entry: H6Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h6' in entry) {
    return `###### ${getMarkdownString(
      entry.h6,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h6 entry. Unable to render.');
};
