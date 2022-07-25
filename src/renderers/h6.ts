import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h6 elements.
 */
export interface H6Entry extends MarkdownEntry {
  /**
   * The h6 contents and identifying property for the renderer.
   */
  h6: InlineTypes;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `###### Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h6, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h6 entries.
 *
 * @param entry The h6 entry.
 * @param options Document-level render options.
 * @returns Block-level h6 markdown content.
 */
export const h6Renderer: MarkdownRenderer = (
  entry: H6Entry,
  options: RenderOptions
) => {
  if ('h6' in entry) {
    let headerText = `###### ${getMarkdownString(
      entry.h6,
      options
    )}${getOptionalHeaderIdText(entry.id, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h6 entry. Unable to render.');
};
