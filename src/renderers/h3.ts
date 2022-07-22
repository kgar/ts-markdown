import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export interface H3Entry extends MarkdownEntry {
  h3: InlineTypes;
  id?: string;
  append?: string;
}

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
