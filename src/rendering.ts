import {
  getDefaultEntriesToSurroundWithTwoNewlines,
  getDefaultRendererMap,
} from './defaults';
import { appendFootnotes } from './renderers/footnote';

export function renderMarkdown(
  data: DataDrivenMarkdownEntry[],
  options?: DataDrivenMarkdownOptions
) {
  options ??= {
    prefix: '',
  };

  options.renderers ??= getDefaultRendererMap();
  options.entriesToSurroundWithTwoNewlines ??=
    getDefaultEntriesToSurroundWithTwoNewlines();

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

  return document;
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

    if (index < data.length - 1) {
      textStack += '\n';

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
  return Object.keys(entry).find((x) =>
    options.entriesToSurroundWithTwoNewlines.has(x)
  );
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
