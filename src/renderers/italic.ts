import { getMarkdownString } from "../rendering";

export const italicRenderer: MarkdownRenderer = (
  entry: ItalicEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('italic' in entry) {
    return `*${getMarkdownString(entry.italic, options)}*`;
  }

  throw new Error('Entry is not an italic entry. Unable to render.');
};