import { renderEntries, getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { ListItemEntry, MarkdownEntry } from '../shared.types';

export type OrderedListEntry = {
  ol: ListItemEntry[];
  append?: string;
} & MarkdownEntry;

export const olRenderer: MarkdownRenderer = (
  entry: OrderedListEntry,
  options: RenderOptions
) => {
  if ('ol' in entry) {
    let markdown = entry.ol
      .map((li, index) => {
        if (Array.isArray(li)) {
          return renderEntries(li, {
            ...options,
            prefix: (liIndex) => {
              return liIndex === 0 ? `${index + 1}. ` : '    ';
            },
          });
        }

        return `${index + 1}. ${getMarkdownString(li, options)}`;
      })
      .join('\n');

    return {
      markdown,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an ol entry. Unable to render.');
};
