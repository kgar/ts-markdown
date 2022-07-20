import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { InlineTypes, DataDrivenMarkdownEntry } from '../shared.types';

export type H6Entry = {
  h6: InlineTypes;
  id?: string;
  append?: string;
} & DataDrivenMarkdownEntry;

export const h6Renderer: MarkdownRenderer = (
  entry: H6Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h6' in entry) {
    return `###### ${getMarkdownString(
      entry.h6,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  throw new Error('Entry is not an h6 entry. Unable to render.');
};
