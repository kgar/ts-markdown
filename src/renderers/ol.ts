import { renderEntries, join, getMarkdownString } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { ListItemEntry, MarkdownEntry } from '../shared.types';

export type OrderedListEntry = {
  ol: ListItemEntry[];
  append?: string;
} & MarkdownEntry;

export const olRenderer = (entry: OrderedListEntry, options: RenderOptions) => {
  if ('ol' in entry) {
    return entry.ol.map((li, index) => {
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
