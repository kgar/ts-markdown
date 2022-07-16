export const footnoteRenderer = (
  entry: FootnoteEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('footnote' in entry) {
    return `[^${entry.footnote.id}]`;
  }

  throw new Error('Entry is not a footnote entry. Unable to render.');
};
