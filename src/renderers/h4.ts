import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h4 elements.
 */
export interface H4Entry extends MarkdownEntry {
  /**
   * The h4 contents and identifying property for the renderer.
   */
  h4: InlineTypes;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `#### Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h4, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h4 entries.
 * @param entry The h4 entry.
 * @param options Document-level render options.
 * @returns Block-level h4 markdown content.
 */
export const h4Renderer: MarkdownRenderer = (
  entry: H4Entry,
  options: RenderOptions
) => {
  if ('h4' in entry) {
    let headerText = `#### ${getMarkdownString(
      entry.h4,
      options
    )}${getOptionalHeaderIdText(entry.id, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h4 entry. Unable to render.');
};
