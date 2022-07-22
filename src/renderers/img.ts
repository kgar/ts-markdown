import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

export interface ImageEntry extends MarkdownEntry {
  img: {
    href: string;
    alt?: string;
    title?: string;
  };
}

export const imgRenderer: MarkdownRenderer = (
  entry: ImageEntry,
  options: RenderOptions
) => {
  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  throw new Error('Entry is not an img entry. Unable to render.');
};
