import { renderEntries, join, getMarkdownString } from '../rendering';

export const olRenderer = (
  entry: OrderedListEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('ol' in entry) {
    return entry.ol.map((liEntry, index) => {
      const li = liEntry.li;
      if (Array.isArray(li)) {
        return renderEntries(li, {
          ...options,
          prefix: (liIndex) => {
            return liIndex === 0 ? `${index + 1}. ` : '    ';
          },
        });
      }

      return join(getMarkdownString(li, options), '\n', (liIndex) => {
        return liIndex === 0 ? `${index + 1}. ` : '    ';
      });
    });
  }

  throw new Error('Entry is not an ol entry. Unable to render.');
};
