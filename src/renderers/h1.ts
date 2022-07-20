import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import {
  DataDrivenMarkdownOptions,
  MarkdownRenderer,
} from '../rendering.types';
import { InlineTypes, DataDrivenMarkdownEntry } from '../shared.types';

export type H1Entry = {
  h1: InlineTypes;
  underline?: boolean;
  id?: string;
  append?: string;
} & DataDrivenMarkdownEntry;

export const h1Renderer: MarkdownRenderer = (
  entry: H1Entry,
  options: DataDrivenMarkdownOptions
) => {
  if ('h1' in entry) {
    let useUnderlining = entry.underline ?? options.useH1Underlining;
    let header1IndicatorPrefix = useUnderlining ? '' : '# ';
    let headerText = `${header1IndicatorPrefix}${getMarkdownString(
      entry.h1,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    if (useUnderlining) {
      headerText += '\n' + ''.padEnd(headerText.length, '=');
    }

    return headerText;
  }

  throw new Error('Entry is not an h1 entry. Unable to render.');
};
