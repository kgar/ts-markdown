import { getMarkdownString } from '../rendering';
import { getOptionalHeaderIdText } from './header';
import { RenderOptions, MarkdownRenderer } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

export interface H2Entry extends MarkdownEntry {
  h2: InlineTypes;
  underline?: boolean;
  id?: string;
  append?: string;
}

export const h2Renderer: MarkdownRenderer = (
  entry: H2Entry,
  options: RenderOptions
) => {
  if ('h2' in entry) {
    let useUnderlining = entry.underline ?? options.useH2Underlining;
    let header2IndicatorPrefix = useUnderlining ? '' : '## ';
    let headerText = `${header2IndicatorPrefix}${getMarkdownString(
      entry.h2,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    if (useUnderlining) {
      headerText += '\n' + ''.padEnd(headerText.length, '-');
    }

    return {
      markdown: headerText,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not an h2 entry. Unable to render.');
};
