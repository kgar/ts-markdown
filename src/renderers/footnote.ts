import { renderEntries } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry, RichTextEntry } from '../shared.types';

/**
 * A markdown entry for generating footnotes.
 */
export interface FootnoteEntry extends MarkdownEntry, RichTextEntry {
  /**
   * The footnote contents and identifying property for the renderer.
   */
  footnote: {
    /**
     * The footnote ID. This is used inline to signify which footnote to reference.
     * Identifiers can be numbers or words, but they cannot contain spaces or tabs.
     */
    id: string;

    /**
     * The footnote content to appear at the bottom of the document.
     */
    content: MarkdownEntry | MarkdownEntry[];
  };
}

/**
 * The renderer for footnote entries.
 * @param entry The footnote entry.
 * @param options Document-level render options.
 * @returns Footnote ID markdown content.
 */
export const footnoteRenderer: MarkdownRenderer = (
  entry: FootnoteEntry,
  options: RenderOptions
) => {
  if ('footnote' in entry) {
    return `[^${entry.footnote.id}]`;
  }

  throw new Error('Entry is not a footnote entry. Unable to render.');
};

/**
 * The renderer for footnote content at the bottom of the document.
 * @param data Content to include in the footnote.
 * @param document The document to update.
 * @param options Document-level options.
 * @returns The updated document.
 */
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
  return Array.isArray(data)
    ? data.reduce((prev, curr) => [...prev, ...getFootnoteEntries(curr)], [])
    : data !== null && typeof data === 'object' && 'footnote' in data
    ? [data as FootnoteEntry]
    : data !== null && typeof data === 'object'
    ? Object.keys(data).reduce<FootnoteEntry[]>(
        (prev, key) => [
          ...prev,
          ...getFootnoteEntries(data[key as keyof typeof data]),
        ],
        []
      )
    : [];
}
