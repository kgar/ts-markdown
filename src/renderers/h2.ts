import { getMarkdownString, getOptionalHeaderIdText } from "../renderMarkdown";

export const h2Renderer: MarkdownRenderer = (
  entry: H2Entry,
  options: DataDrivenMarkdownOptions
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

    return headerText;
  }

  throw new Error('Entry is not an h2 entry. Unable to render.');
};