import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating subscript text.
 */
export interface SubscriptEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The subscript contents and identifying property for the renderer.
   */
  sub: RichTextEntry;

  /**
   * Option to render the subscript indicators as HTML.
   * Default: false
   */
  html?: boolean;
}

/**
 * The renderer for subscript entries.
 * @param entry The subscript entry.
 * @param options Document-level render options.
 * @returns Subscript markdown content.
 */
export const subRenderer: MarkdownRenderer = (
  entry: SubscriptEntry,
  options: RenderOptions
) => {
  if ('sub' in entry) {
    let useSubscriptHtml = entry.html ?? options.useSubscriptHtml ?? false;
    let subscriptOpen = useSubscriptHtml ? '<sub>' : '~';
    let subscriptClose = useSubscriptHtml ? '</sub>' : '~';
    return `${subscriptOpen}${getMarkdownString(
      entry.sub,
      options
    )}${subscriptClose}`;
  }

  throw new Error('Entry is not a sub entry. Unable to render.');
};
