import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating h5 elements.
 */
export interface H5Entry extends MarkdownEntry {
  /**
   * The h5 contents and identifying property for the renderer.
   */
  h5: InlineTypes;

  /**
   * Option which will append a markdown heading ID.
   * E.g., given the ID 'my-id' and the header 'Header Example',
   * `##### Header Example {#my-id}`
   */
  id?: string;

  /**
   * Option which will arbitrarily append a string immediately below the h5, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for h5 entries.
 *
 * @param entry The h5 entry.
 * @param options Document-level render options.
 * @returns Block-level h5 markdown content.
 */
export const h5Renderer: MarkdownRenderer = (
  entry: H5Entry,
  options: RenderOptions
) => {
  if ('h5' in entry) {
    let headerText = `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry.id, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h5 entry. Unable to render.');
};

/**
 * Helper which creates a fifth-level header entry.
 *
 * @param options Entry-level options for this element.
 * @returns a fifth-level header entry
 */
export function h5(
  content: H5Entry['h5'],
  options?: Omit<H5Entry, 'h5'>
): H5Entry {
  return {
    h5: content,
    ...options,
  };
}
