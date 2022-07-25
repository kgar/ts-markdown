import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating superscript text.
 */
export interface SuperscriptEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The superscript contents and identifying property for the renderer.
   */
  sup: RichTextEntry;

  /**
   * Option to render the superscript indicators as HTML.
   * Default: false
   */
  html?: boolean;
}

/**
 * The renderer for superscript entries.
 * @param entry The superscript entry.
 * @param options Document-level render options.
 * @returns Superscript markdown content.
 */
export const supRenderer: MarkdownRenderer = (
  entry: SuperscriptEntry,
  options: RenderOptions
) => {
  if ('sup' in entry) {
    let useSuperscriptHtml = entry.html ?? options.useSuperscriptHtml ?? false;
    let superscriptOpen = useSuperscriptHtml ? '<sup>' : '^';
    let superscriptClose = useSuperscriptHtml ? '</sup>' : '^';
    return `${superscriptOpen}${getMarkdownString(
      entry.sup,
      options
    )}${superscriptClose}`;
  }

  throw new Error('Entry is not an sup entry. Unable to render.');
};
