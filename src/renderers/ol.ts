import { renderEntries, getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { ListItemEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating ordered lists.
 */
export interface OrderedListEntry extends MarkdownEntry {
  /**
   * The ordered list contetns and identifying property for the renderer.
   */
  ol: ListItemEntry[];

  /**
   * Option which will arbitrarily append a string immediately below the ordered list, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for ordered list entries.
 *
 * @param entry The ordererd list entry.
 * @param options Document-level render options.
 * @returns Block-level ordered list markdown content.
 */
export const olRenderer: MarkdownRenderer = (
  entry: OrderedListEntry,
  options: RenderOptions
) => {
  if ('ol' in entry) {
    let markdown = entry.ol
      .map((li, index) => {
        return renderEntries(Array.isArray(li) ? li : [li], {
          ...options,
          prefix: (liIndex) => {
            return liIndex === 0 ? `${index + 1}. ` : '    ';
          },
        });
      })
      .join('\n');

    return {
      markdown,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an ol entry. Unable to render.');
};

/**
 * Helper which creates an ordered list entry.
 *
 * @param options Entry-level options for this element.
 * @returns an ordered list entry
 */
export function ol(
  content: OrderedListEntry['ol'],
  options?: Omit<OrderedListEntry, 'ol'>
): OrderedListEntry {
  return {
    ol: content,
    ...options,
  };
}
