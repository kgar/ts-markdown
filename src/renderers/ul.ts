import { renderEntries, join, getMarkdownString } from '../renderMarkdown';

export const ulRenderer = (
  entry: UnorderedListEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('ul' in entry) {
    let indicator = entry.indicator ?? options.unorderedListItemIndicator;
    return entry.ul
      .map((liEntry) => {
        const li = liEntry.li;
        if (Array.isArray(li)) {
          return renderEntries(li, {
            ...options,
            prefix: (liIndex) => (liIndex === 0 ? `${indicator} ` : '    '),
          });
        }

        return join(getMarkdownString(li, options), '\n', (liIndex) =>
          liIndex === 0 ? `${indicator} ` : '    '
        );
      })
      .map((x) => x.replace(/^([\-\+\*]\s[\d]+)(\.)/, '$1\\.'));
  }

  throw new Error('Entry is not an ul entry. Unable to render.');
};
