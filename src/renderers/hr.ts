import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating hr elements.
 */
export interface HorizontalRuleEntry extends MarkdownEntry {
  /**
   * The hr contents and identifying property for the renderer.
   */
  hr: any;

  /**
   * Option determining which indicator to use for an hr.
   * Default: '-'
   */
  indicator?: '*' | '-' | '_';

  /**
   * Option which will arbitrarily append a string immediately below the hr, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for hr entries.
 * @param entry The hr entry.
 * @param options Document-level render options.
 * @returns Block-level hr markdown content.
 */
export const hrRenderer: MarkdownRenderer = (
  entry: HorizontalRuleEntry,
  options: RenderOptions
) => {
  if ('hr' in entry) {
    let indicator = entry.indicator ?? '-';

    return {
      markdown: `${indicator}${indicator}${indicator}`,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an hr entry. Unable to render.');
};
