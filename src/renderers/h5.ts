import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export type H5Entry = {
  h5: InlineTypes;
  id?: string;
  append?: string;
} & MarkdownEntry;

export const h5Renderer: MarkdownRenderer = (
  entry: H5Entry,
  options: RenderOptions
) => {
  if ('h5' in entry) {
    return `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h5 entry. Unable to render.');
};
