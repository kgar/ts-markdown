import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type H6Entry = {
  h6: InlineTypes;
  id?: string;
  append?: string;
} & MarkdownEntry;

export const h6Renderer: MarkdownRenderer = (
  entry: H6Entry,
  options: RenderOptions
) => {
  if ('h6' in entry) {
    let headerText = `###### ${getMarkdownString(
      entry.h6,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h6 entry. Unable to render.');
};
