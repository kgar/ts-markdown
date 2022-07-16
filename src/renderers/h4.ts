import { getMarkdownString, getOptionalHeaderIdText } from '../rendering';

export const h4Renderer: MarkdownRenderer = (
  entry: H4Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h4' in entry) {
    return `#### ${getMarkdownString(
      entry.h4,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h4 entry. Unable to render.');
};
