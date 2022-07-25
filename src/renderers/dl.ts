import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, InlineTypes } from '../shared.types';

/**
 * A markdown entry for generating description lists.
 */
export interface DescriptionListEntry extends MarkdownEntry {
  /**
   * The description list contents and identifying property for the renderer.
   */
  dl: (DescriptionTerm | DescriptionDetails)[];

  /**
   * Indicates whether to use HTML to render the entry.
   * Default: false
   */
  html?: boolean;

  /**
   * Option which will arbitrarily append a string immediately below the blockquote, ignoring block-level settings.
   */
  append?: string;
}

/**
 * A description term field.
 */
export type DescriptionTerm = {
  /**
   * The content of the description term.
   */
  dt: InlineTypes;
};

/**
 * A description details field.
 */
export type DescriptionDetails = {
  /**
   * The content of the details.
   */
  dd: InlineTypes;
};

/**
 * The renderer for descriptions list entries.
 *
 * @param entry The description list entry.
 * @param options Document-level render options.
 * @returns Block-level description list markdown content.
 */
export const dlRenderer: MarkdownRenderer = (
  entry: DescriptionListEntry,
  options: RenderOptions
) => {
  if ('dl' in entry) {
    let useHtml = options.useDescriptionListHtml ?? entry.html;
    let termStart = useHtml ? '    <dt>' : '';
    let termEnd = useHtml ? '</dt>' : '';
    let descriptionStart = useHtml ? '    <dd>' : ': ';
    let descriptionEnd = useHtml ? '</dd>' : '';

    let lines: string[] = [];

    if (useHtml) {
      lines.push('<dl>');
    }

    let lastItem: string | undefined = undefined;
    for (let descriptionItem of entry.dl) {
      if ('dt' in descriptionItem && lastItem === 'dd') {
        if (lines.length > 0) {
          lines.push('\n');
        }
      }

      if ('dt' in descriptionItem) {
        const termContent =
          termStart + getMarkdownString(descriptionItem.dt, options) + termEnd;
        lines.push(termContent);
        lastItem = 'dt';
      } else if ('dd' in descriptionItem) {
        const descriptionContent =
          descriptionStart +
          getMarkdownString(descriptionItem.dd, options) +
          descriptionEnd;
        lines.push(descriptionContent);
        lastItem = 'dd';
      }
    }

    if (useHtml) {
      lines.push('</dl>');
    }

    return {
      markdown: lines.join('\n'),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a dl entry. Unable to render.');
};
