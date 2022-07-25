import { renderEntries, getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { ListItemEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating unordered lists.
 */
export interface UnorderedListEntry extends MarkdownEntry {
  /**
   * The unordered list contents and identifying property for the renderer.
   */
  ul: ListItemEntry[];

  /**
   * An indicator specifying which character to use when denoting a list item.
   * Default: '-'
   */
  indicator?: UnorderedListItemIndicator;

  /**
   * Option which will arbitrarily append a string immediately below the unordered list, ignoring block-level settings.
   */
  append?: string;
}

/**
 * Eligible characters for denoting a list item.
 */
export type UnorderedListItemIndicator = '-' | '*' | '+';

/**
 * The renderer for unordered list entries.
 *
 * @param entry The unordered list entry.
 * @param options Document-level render options.
 * @returns Block-level unordered list markdown content.
 */
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
