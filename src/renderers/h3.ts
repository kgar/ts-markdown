import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h3 elements.
 */
export interface H3Entry extends MarkdownEntry {
  /**
   * The h3 contents and identifying property for the renderer.
   */
  h3: InlineTypes;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `### Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h3, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h3 entries.
 * @param entry The h3 entry.
 * @param options Document-level render options.
 * @returns Block-level h3 markdown content.
 */
export const h3Renderer: MarkdownRenderer = (
  entry: H3Entry,
  options: RenderOptions
) => {
  if ('h3' in entry) {
    let headerText = `### ${getMarkdownString(
      entry.h3,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h3 entry. Unable to render.');
};
