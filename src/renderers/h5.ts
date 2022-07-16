import { getMarkdownString, getOptionalHeaderIdText } from '../renderMarkdown';

export const h5Renderer: MarkdownRenderer = (
  entry: H5Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h5' in entry) {
    return `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h5 entry. Unable to render.');
};
