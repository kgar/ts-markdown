import { getMarkdownString } from '../renderMarkdown';

export const boldRenderer: MarkdownRenderer = (
  entry: BoldEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('bold' in entry) {
    return `**${getMarkdownString(entry.bold, options)}**`;
  }

  throw new Error('Entry is not a bold entry. Unable to render.');
};
