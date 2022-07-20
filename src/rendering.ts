import { getBlockLevelEntries, getRenderers } from './defaults';
import { appendFootnotes } from './renderers/footnote';

export function renderMarkdown(
  data: DataDrivenMarkdownEntry[],
  options?: DataDrivenMarkdownOptions
) {
  options ??= {
    prefix: '',
  };

  options.renderers ??= getRenderers();
  options.blockLevelEntries ??= getBlockLevelEntries();

  let document = renderEntries(data, options);

  document = options.applyCompletedDocumentChangesPreFootnotes
    ? options.applyCompletedDocumentChangesPreFootnotes(data, document, options)
    : document;

  document = appendFootnotes(data, document, options);

  document = options.applyCompletedDocumentChangesPostFootnotes
    ? options.applyCompletedDocumentChangesPostFootnotes(
        data,
        document,
        options
      )
    : document;

  // TODO: Formalize a post-render callback option
  document = correctInvalidMidWordBoldAndItalics(document);

  return document;
}

/**
 * Finds and corrects and mid-word bold/italics that use hyphens, changing the hyphens to asterisks, per best practice: https://www.markdownguide.org/basic-syntax/#bold-best-practices
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

export function renderEntries(
  data: DataDrivenMarkdownEntry[],
  options: DataDrivenMarkdownOptions
) {
  let prefix = options.prefix ?? '';

  let textStack = '';
  for (const [index, entry] of data.entries()) {
    let entryPrefix = renderPrefix(prefix, index, entry);

    const result = getMarkdownString(entry, options);
    const newText =
      typeof result === 'string'
        ? result.split('\n')
        : result.reduce((prev, curr) => [...prev, ...curr.split('\n')], []);
    textStack += newText.map((text) => entryPrefix + text).join('\n');

    let appendContent =
      typeof entry === 'object' && 'append' in entry
        ? getMarkdownString((entry as Appendable).append, options)
        : '';

    if (appendContent !== '') {
      textStack += '\n' + appendContent;
    }

    if (index < data.length - 1) {
      textStack += '\n';
    }

    if (index < data.length - 1) {
      if (requiresAdditionalNewline(entry, options)) {
        textStack += entryPrefix;
        textStack += '\n';
      }
    }
  }
  return textStack;
}

function requiresAdditionalNewline(
  entry: DataDrivenMarkdownEntry,
  options: DataDrivenMarkdownOptions
) {
  if (typeof entry === 'string') {
    return false;
  }
  return Object.keys(entry).find((x) => options.blockLevelEntries.has(x));
}

export function getMarkdownString(
  entry: DataDrivenMarkdownEntry | string,
  options: DataDrivenMarkdownOptions
): string | string[] {
  if (entry === null || entry === undefined) {
    return '';
  }

  if (typeof entry === 'string') {
    return options.renderers.get('string')(entry, options);
  }

  for (let key in entry) {
    let renderer = options.renderers.get(key);
    if (renderer) {
      return renderer(entry, options);
    }
  }

  return '';
}

export function getOptionalHeaderIdText(
  entry: Partial<Identifiable>,
  prefix: string = ''
) {
  if (entry.id === undefined) {
    return '';
  }

  return `${prefix}{#${entry.id}}`;
}

export function join(
  value: string | string[],
  delimiter: string,
  prefix: MarkdownRenderPrefix = ''
) {
  return typeof value === 'string'
    ? renderPrefix(prefix, 0) + value
    : value.map((x, index) => renderPrefix(prefix, index) + x).join(delimiter);
}

function renderPrefix(
  prefix: MarkdownRenderPrefix,
  index: number,
  entry?: DataDrivenMarkdownEntry
) {
  if (typeof prefix === 'string') {
    return prefix;
  }

  return prefix(index);
}
