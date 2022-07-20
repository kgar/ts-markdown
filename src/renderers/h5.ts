import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { InlineTypes, DataDrivenMarkdownEntry } from '../shared.types';

export type H5Entry = {
  h5: InlineTypes;
  id?: string;
  append?: string;
} & DataDrivenMarkdownEntry;

export const h5Renderer: MarkdownRenderer = (
  entry: H5Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h5' in entry) {
    return `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h5 entry. Unable to render.');
};
