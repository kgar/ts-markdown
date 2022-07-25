import { getMarkdownString, renderEntries } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating blockquotes.
 */
export interface BlockquoteEntry extends MarkdownEntry {
  /**
   * The blockquote contents and identifying property for the renderer.
   */
  blockquote: string | MarkdownEntry[];

  /**
   * Option which will arbitrarily append a string immediately below the blockquote, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for blockquote entries.
 *
 * @param entry The blockquote entry.
 * @param options Document-level render options.
 * @returns Block-level blockquote markdown content.
 */
export const blockquoteRenderer: MarkdownRenderer = (
  entry: BlockquoteEntry,
  options: RenderOptions
) => {
  if ('blockquote' in entry) {
    return {
      markdown:
        typeof entry.blockquote === 'string'
          ? '> ' + getMarkdownString(entry.blockquote, options)
          : renderEntries(entry.blockquote, { ...options, prefix: '> ' }),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a blockquote entry. Unable to render.');
};
