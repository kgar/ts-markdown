import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating img elements.
 */
export interface ImageEntry extends MarkdownEntry {
  /**
   * The img settings and identifying property for the renderer.
   */
  img: {
    /**
     * The path to the image.
     */
    source: string;

    /**
     * Alternative text to include with the image for accessibility.
     */
    alt?: string;

    /**
     * A title for the image.
     */
    title?: string;
  };
}

/**
 * The renderer for img entries.
 *
 * @param entry The img entry.
 * @param options Document-level render options.
 * @returns img markdown content.
 */
export const imgRenderer: MarkdownRenderer = (
  entry: ImageEntry,
  options: RenderOptions
) => {
  if ('img' in entry) {
    const formattedLink = entry.img.source.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  throw new Error('Entry is not an img entry. Unable to render.');
};

export function img(settings: ImageEntry['img']): ImageEntry {
  return {
    img: settings,
  };
}
