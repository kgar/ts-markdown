import { renderEntries } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

export type FootnoteEntry = {
  footnote: {
    id: string;
    content: MarkdownEntry | MarkdownEntry[];
  };
} & MarkdownEntry &
  RichTextEntry;

export const footnoteRenderer = (
  entry: FootnoteEntry,
  options: RenderOptions
) => {
  if ('footnote' in entry) {
    return `[^${entry.footnote.id}]`;
  }

  throw new Error('Entry is not a footnote entry. Unable to render.');
};

export function appendFootnotes(
  data: MarkdownEntry[],
  document: string,
  options: RenderOptions
) {
  let footnotes = getFootnoteEntries(data);

  if (footnotes.length > 0) {
    document += '\n\n' + getFootnotesString(footnotes, options);
  }
  return document;
}

function getFootnotesString(
  footnotes: FootnoteEntry[],
  options: RenderOptions
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
