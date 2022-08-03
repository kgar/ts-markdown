import { getRenderers } from './defaults';
import { appendFootnotes } from './renderers/footnote';
import {
  RenderOptions,
  MarkdownRenderPrefix,
  MarkdownRenderResult,
  MarkdownEntryOrPrimitive,
} from './rendering.types';

/**
 * The main entrypoint into rendering documents in **ts-markdown**.
 *
 * @param data The markdown entries which should be rendered into a markdown document.
 * @param options Document-level options which can affect broad aspects of the rendering process.
 * @returns A string of markdown.
 */
export function tsMarkdown(
  data: MarkdownEntryOrPrimitive[],
  options?: RenderOptions
) {
  options ??= {
    prefix: '',
  };

  options.renderers ??= getRenderers();

  let document = renderEntries(data, options);

  document = options.onDocumentFootnoteAppending
    ? options.onDocumentFootnoteAppending(data, document, options)
    : document;

  document = appendFootnotes(data, document, options);

  document = options.onDocumentFootnoteAppended
    ? options.onDocumentFootnoteAppended(data, document, options)
    : document;

  // TODO: Formalize a post-render callback option
  document = correctInvalidMidWordBoldAndItalics(document);

  return document;
}

/**
 * Finds and corrects and mid-word bold/italics that use hyphens, changing the hyphens to asterisks, per best practice: https://www.markdownguide.org/basic-syntax/#bold-best-practices
 *
 * @param document the rendered document
 * @returns document with mid-world bold and italics set to asterisks
 */
function correctInvalidMidWordBoldAndItalics(document: string): string {
  return document
    .replace(
      /(?<pretext>[^\_^\s])(?<prefix1>[\_]{3})(?<text1>[^\s^\_]+)(?<suffix1>[\_]{3})|(?<prefix2>[\_]{3})(?<text2>[^\s^\_]+)(?<suffix2>[\_]{3})(?<posttext>[^\_^\s])/g,
      '$<pretext>***$<text1>$<text2>***$<posttext>'
    )
    .replace(
      /(?<pretext>[^\_^\s])(?<prefix1>[\_]{2})(?<text1>[^\s^\_]+)(?<suffix1>[\_]{2})|(?<prefix2>[\_]{2})(?<text2>[^\s^\_]+)(?<suffix2>[\_]{2})(?<posttext>[^\_^\s])/g,
      '$<pretext>**$<text1>$<text2>**$<posttext>'
    )
    .replace(
      /(?<pretext>[^\_^\s])(?<prefix1>[\_]{1})(?<text1>[^\s^\_]+)(?<suffix1>[\_]{1})|(?<prefix2>[\_]{1})(?<text2>[^\s^\_]+)(?<suffix2>[\_]{1})(?<posttext>[^\_^\s])/g,
      '$<pretext>*$<text1>$<text2>*$<posttext>'
    );
}

/**
 * Reduces an array of markdown entries to a single string.
 *
 * @param data the markdown entries to process.
 * @param options Document-level options which can affect broad aspects of the rendering process.
 * @returns a string of markdown content.
 */
export function renderEntries(
  data: MarkdownEntryOrPrimitive[],
  options: RenderOptions
): string {
  let prefix = options.prefix ?? '';

  let textStack = '';
  for (const [index, entry] of data.entries()) {
    let entryPrefix = renderPrefix(prefix, index, entry);

    const result = getMarkdownString(entry, options);

    let { markdown, blockLevel } =
      typeof result === 'string'
        ? { markdown: result, blockLevel: false }
        : result;

    textStack += markdown
      .split('\n')
      .map((text) => entryPrefix + text)
      .join('\n');

    if (isAppendable(entry)) {
      let appendable = entry as { append: string };
      let appendContent = getMarkdownString(appendable.append, options);
      if (appendContent !== '') {
        textStack += '\n' + appendContent;
      }
    }

    if (index < data.length - 1) {
      textStack += '\n';
    }

    if (index < data.length - 1 && blockLevel) {
      textStack += entryPrefix;
      textStack += '\n';
    }
  }
  return textStack;
}

function isAppendable(entry: MarkdownEntryOrPrimitive) {
  return (
    !!entry &&
    typeof entry === 'object' &&
    'append' in entry &&
    typeof 'append' === 'string'
  );
}

/**
 * Reduces a single markdown entry to a string of markdown content.
 *
 * @param entry the target markdown entry or string of text.
 * @param options Document-level options which can affect broad aspects of the rendering process.
 * @returns
 */
export function getMarkdownString(
  entry: MarkdownEntryOrPrimitive,
  options: RenderOptions
): MarkdownRenderResult {
  if (entry === null && options.renderers?.null) {
    return options.renderers.null(entry, options);
  }

  if (entry === undefined && options.renderers?.null) {
    return options.renderers.undefined(entry, options);
  }

  if (typeof entry === 'string' && options.renderers?.string) {
    return options.renderers.string(entry, options);
  }

  if (typeof entry === 'boolean' && options.renderers?.boolean) {
    return options.renderers.boolean(entry, options);
  }

  if (typeof entry === 'number' && options.renderers?.number) {
    return options.renderers.number(entry, options);
  }

  if (typeof entry === 'bigint' && options.renderers?.bigint) {
    return options.renderers.bigint(entry, options);
  }

  if (entry instanceof Date && options.renderers?.date) {
    return options.renderers.date(entry, options);
  }

  if (typeof entry === 'object') {
    for (let key in entry) {
      let renderer = options.renderers?.[key];
      if (renderer) {
        return renderer(entry, options);
      }
    }
  }

  return '';
}

function renderPrefix(
  prefix: MarkdownRenderPrefix,
  index: number,
  entry?: MarkdownEntryOrPrimitive
) {
  if (typeof prefix === 'string') {
    return prefix;
  }

  return prefix(index, entry);
}
