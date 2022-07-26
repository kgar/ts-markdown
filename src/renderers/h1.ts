import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h1 elements.
 */
export interface H1Entry extends MarkdownEntry {
  /**
   * The h1 contents and identifying property for the renderer.
   */
  h1: InlineTypes;

  /**
   * Option which will use '=' underlining rather than a '#' prefix.
   */
  underline?: boolean;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `# Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h1, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h1 entries.
 *
 * @param entry The h1 entry.
 * @param options Document-level render options.
 * @returns Block-level h1 markdown content.
 */
export const h1Renderer: MarkdownRenderer = (
  entry: H1Entry,
  options: RenderOptions
) => {
  if ('h1' in entry) {
    let useUnderlining = entry.underline ?? options.useH1Underlining;
    let header1IndicatorPrefix = useUnderlining ? '' : '# ';
    let headerText = `${header1IndicatorPrefix}${getMarkdownString(
      entry.h1,
      options
    )}${getOptionalHeaderIdText(entry.id, ' ')}`;

    if (useUnderlining) {
      headerText += '\n' + ''.padEnd(headerText.length, '=');
    }

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h1 entry. Unable to render.');
};

export function h1(
  content: H1Entry['h1'],
  options?: Omit<H1Entry, 'h1'>
): H1Entry {
  return {
    h1: content,
    ...options,
  };
}
