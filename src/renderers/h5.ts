import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export interface H5Entry extends MarkdownEntry {
  h5: InlineTypes;
  id?: string;
  append?: string;
}

export const h5Renderer: MarkdownRenderer = (
  entry: H5Entry,
  options: RenderOptions
) => {
  if ('h5' in entry) {
    let headerText = `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h5 entry. Unable to render.');
};
