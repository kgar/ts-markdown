import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, InlineTypes } from '../shared.types';

export interface DescriptionListEntry extends MarkdownEntry {
  dl: (DescriptionTerm | DescriptionDetails)[];
  html?: boolean;
  append?: string;
}

export type DescriptionTerm = {
  dt: InlineTypes;
};

export type DescriptionDetails = {
  dd: InlineTypes;
};

export const dlRenderer: MarkdownRenderer = (
  entry: DescriptionListEntry,
  options: RenderOptions
) => {
  if ('dl' in entry) {
    let useHtml = options.useDescriptionListHtml ?? entry.html;
    let termStart = useHtml ? '    <dt>' : '';
    let termEnd = useHtml ? '</dt>' : '';
    let descriptionStart = useHtml ? '    <dd>' : ': ';
    let descriptionEnd = useHtml ? '</dd>' : '';

    let lines: string[] = [];

    if (useHtml) {
      lines.push('<dl>');
    }

    let lastItem: string | undefined = undefined;
    for (let descriptionItem of entry.dl) {
      if ('dt' in descriptionItem && lastItem === 'dd') {
        if (lines.length > 0) {
          lines.push('\n');
        }
      }

      if ('dt' in descriptionItem) {
        const termContent =
          termStart + getMarkdownString(descriptionItem.dt, options) + termEnd;
        lines.push(termContent);
        lastItem = 'dt';
      } else if ('dd' in descriptionItem) {
        const descriptionContent =
          descriptionStart +
          getMarkdownString(descriptionItem.dd, options) +
          descriptionEnd;
        lines.push(descriptionContent);
        lastItem = 'dd';
      }
    }

    if (useHtml) {
      lines.push('</dl>');
    }

    return {
      markdown: lines.join('\n'),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a dl entry. Unable to render.');
};
