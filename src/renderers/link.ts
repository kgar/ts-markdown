import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating links.
 */
export interface LinkEntry extends MarkdownEntry {
  /**
   * The link settings and identifying property for the renderer.
   */
  link: {
    /**
     * The hypertext reference to the target resource.
     */
    href: string;

    /**
     * Hyperlink text to show for the link itself.
     * When not provided, the href will be rendered as an auto-link.
     * E.g., `<https://www.google.com>`
     */
    text?: string;

    /**
     * A title for the link. Ignored for links without text.
     */
    title?: string;
  };
}

/**
 * The renderer for link entries.
 * @param entry The link entry.
 * @param options Document-level render options.
 * @returns Link markdown content.
 */
export const linkRenderer: MarkdownRenderer = (
  entry: LinkEntry,
  options: RenderOptions
) => {
  if ('link' in entry) {
    const formattedLink = entry.link.href.replace(/\s/g, '%20');

    if (!entry.link.text) {
      return `<${formattedLink}>`;
    }

    const titleSegment =
      entry.link.title !== undefined ? ` "${entry.link.title}"` : '';

    return `[${entry.link.text}](${formattedLink}${titleSegment})`;
  }

  throw new Error('Entry is not a link entry. Unable to render.');
};
