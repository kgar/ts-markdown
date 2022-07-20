import { renderEntries, join, getMarkdownString } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { ListItemEntry, DataDrivenMarkdownEntry } from '../shared.types';

export type UnorderedListEntry = {
  ul: ListItemEntry[];
  indicator?: UnorderedListItemIndicator;
  append?: string;
} & DataDrivenMarkdownEntry;

export type UnorderedListItemIndicator = '-' | '*' | '+';

export const ulRenderer = (
  entry: UnorderedListEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('ul' in entry) {
    let indicator =
      entry.indicator ?? options.unorderedListItemIndicator ?? '-';
    return entry.ul
      .map((li) => {
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
