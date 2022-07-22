import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export interface H4Entry extends MarkdownEntry {
  h4: InlineTypes;
  id?: string;
  append?: string;
}

export const h4Renderer: MarkdownRenderer = (
  entry: H4Entry,
  options: RenderOptions
) => {
  if ('h4' in entry) {
    let headerText = `#### ${getMarkdownString(
      entry.h4,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h4 entry. Unable to render.');
};
