import { renderEntries, getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { ListItemEntry, MarkdownEntry } from '../shared.types';

export type UnorderedListEntry = {
  ul: ListItemEntry[];
  indicator?: UnorderedListItemIndicator;
  append?: string;
} & MarkdownEntry;

export type UnorderedListItemIndicator = '-' | '*' | '+';

export const ulRenderer: MarkdownRenderer = (
  entry: UnorderedListEntry,
  options: RenderOptions
) => {
  if ('ul' in entry) {
    let markdown = getUnorderedListMarkdown(entry, options);

    return {
      markdown,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an ul entry. Unable to render.');
};

function getUnorderedListMarkdown(
  entry: UnorderedListEntry,
  options: RenderOptions
) {
  let indicator = entry.indicator ?? options.unorderedListItemIndicator ?? '-';

  return entry.ul
    .map((li) => {
      if (Array.isArray(li)) {
        return renderEntries(li, {
          ...options,
          prefix: (liIndex) => (liIndex === 0 ? `${indicator} ` : '    '),
        });
      }

      return `${indicator} ${getMarkdownString(li, options)}`;
    })
    .map((x) => x.replace(/^([\-\+\*]\s[\d]+)(\.)/, '$1\\.'))
    .join('\n');
}
