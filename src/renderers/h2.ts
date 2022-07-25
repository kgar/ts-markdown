import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h2 elements.
 */
export interface H2Entry extends MarkdownEntry {
  /**
   * The h2 contents and identifying property for the renderer.
   */
  h2: InlineTypes;

  /**
   * Option which will use '-' underlining rather than a '##' prefix.
   */
  underline?: boolean;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `## Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h2, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h2 entries.
 *
 * @param entry The h2 entry.
 * @param options Document-level render options.
 * @returns Block-level h2 markdown content.
 */
export const h2Renderer: MarkdownRenderer = (
  entry: H2Entry,
  options: RenderOptions
) => {
  if ('h2' in entry) {
    let useUnderlining = entry.underline ?? options.useH2Underlining;
    let header2IndicatorPrefix = useUnderlining ? '' : '## ';
    let headerText = `${header2IndicatorPrefix}${getMarkdownString(
      entry.h2,
      options
    )}${getOptionalHeaderIdText(entry.id, ' ')}`;

    if (useUnderlining) {
      headerText += '\n' + ''.padEnd(headerText.length, '-');
    }

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h2 entry. Unable to render.');
};
