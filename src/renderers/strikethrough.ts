import { getMarkdownString } from '../rendering';

export const strikethroughRenderer = (
  entry: StrikethroughEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
  }

  throw new Error('Entry is not a strikethrough entry. Unable to render.');
};
