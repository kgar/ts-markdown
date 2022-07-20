export const linkRenderer = (
  entry: LinkEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('link' in entry) {
    const formattedLink = entry.link.source.replace(/\s/g, '%20');

    if (!entry.link.text) {
      return `<${formattedLink}>`;
    }

    const titleSegment =
      entry.link.title !== undefined ? ` "${entry.link.title}"` : '';

    return `[${entry.link.text}](${formattedLink}${titleSegment})`;
  }

  throw new Error('Entry is not a link entry. Unable to render.');
};
