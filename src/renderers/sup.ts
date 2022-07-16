import { getMarkdownString } from '../renderMarkdown';

export const supRenderer = (
  entry: SuperscriptEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('sup' in entry) {
    let useSuperscriptHtml = entry.html ?? options.useSuperscriptHtml ?? false;
    let superscriptOpen = useSuperscriptHtml ? '<sup>' : '^';
    let superscriptClose = useSuperscriptHtml ? '</sup>' : '^';
    return `${superscriptOpen}${getMarkdownString(
      entry.sup,
      options
    )}${superscriptClose}`;
  }

  throw new Error('Entry is not an sup entry. Unable to render.');
};
