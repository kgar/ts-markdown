import { renderEntries } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { DataDrivenMarkdownEntry, RichTextEntry } from '../shared.types';

export type FootnoteEntry = {
  footnote: {
    id: string;
    content: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
  };
} & DataDrivenMarkdownEntry &
  RichTextEntry;

export const footnoteRenderer = (
  entry: FootnoteEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('footnote' in entry) {
    return `[^${entry.footnote.id}]`;
  }

  throw new Error('Entry is not a footnote entry. Unable to render.');
};

export function appendFootnotes(
  data: DataDrivenMarkdownEntry[],
  document: string,
  options: DataDrivenMarkdownOptions
) {
  let footnotes = getFootnoteEntries(data);

  if (footnotes.length > 0) {
    document += '\n\n' + getFootnotesString(footnotes, options);
  }
  return document;
}

function getFootnotesString(
  footnotes: FootnoteEntry[],
  options: DataDrivenMarkdownOptions
) {
  return footnotes
    .map((entry) => {
      let content = Array.isArray(entry.footnote.content)
        ? entry.footnote.content
        : [entry.footnote.content];
      return renderEntries(content, options)
        .split('\n')
        .map((line, index) => {
          let prefix = index === 0 ? `[^${entry.footnote.id}]: ` : '    ';
          return prefix + line;
        })
        .join('\n');
    })
    .join('\n\n');
}

function getFootnoteEntries(data: unknown): FootnoteEntry[] {
  if (Array.isArray(data)) {
    return data.reduce(
      (prev, curr) => [...prev, ...getFootnoteEntries(curr)],
      []
    );
  }

  if (typeof data === 'object' && 'footnote' in data) {
    return [data as FootnoteEntry];
  }

  if (typeof data === 'object') {
    return Object.keys(data).reduce(
      (prev, key) => [...prev, ...getFootnoteEntries(data[key])],
      []
    );
  }

  return [];
}
