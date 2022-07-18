import { BOLD } from '../constants';
import { getMarkdownString } from '../rendering';

export const boldRenderer: MarkdownRenderer = (
  entry: BoldEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('bold' in entry) {
    return `${BOLD.INDICATOR}${getMarkdownString(entry.bold, options)}${
      BOLD.INDICATOR
    }`;
  }

  throw new Error('Entry is not a bold entry. Unable to render.');
};
