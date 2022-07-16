export const imgRenderer = (
  entry: ImageEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  throw new Error('Entry is not an img entry. Unable to render.');
};
