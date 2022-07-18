import { DL } from '../constants';
import { getMarkdownString, join } from '../rendering';

export const dlRenderer = (
  entry: DescriptionListEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('dl' in entry) {
    let useHtml = options.useDescriptionListHtml ?? entry.html;
    let termStart = useHtml ? `    ${DL.HTML_TERM_OPEN}` : '';
    let termEnd = useHtml ? DL.HTML_TERM_CLOSE : '';
    let descriptionStart = useHtml ? `    ${DL.HTML_DESCRIPTION_OPEN}` : ': ';
    let descriptionEnd = useHtml ? DL.HTML_DESCRIPTION_CLOSE : '';

    let lines: string[] = [];

    if (useHtml) {
      lines.push(DL.HTML_LIST_OPEN);
    }

    let lastItem: string = undefined;
    for (let descriptionItem of entry.dl) {
      if ('dt' in descriptionItem && lastItem === 'dd') {
        if (lines.length > 0) {
          lines.push('\n');
        }
      }

      if ('dt' in descriptionItem) {
        const termContent =
          termStart +
          join(getMarkdownString(descriptionItem.dt, options), '') +
          termEnd;
        lines.push(termContent);
        lastItem = 'dt';
      } else if ('dd' in descriptionItem) {
        const descriptionContent =
          descriptionStart +
          join(getMarkdownString(descriptionItem.dd, options), '') +
          descriptionEnd;
        lines.push(descriptionContent);
        lastItem = 'dd';
      }
    }

    if (useHtml) {
      lines.push(DL.HTML_LIST_CLOSE);
    }

    return lines.join('\n');
  }

  throw new Error('Entry is not a dl entry. Unable to render.');
};
