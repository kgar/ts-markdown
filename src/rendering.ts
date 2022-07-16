import {
  getDefaultEntriesToSurroundWithTwoNewlines,
  getDefaultRendererMap,
} from './defaults';

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

  let footnotes = getFootnotes(data);

  if (footnotes.length > 0) {
    document +=
      '\n\n' +
      footnotes
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
function getFootnotes(data: unknown): FootnoteEntry[] {
  if (Array.isArray(data)) {
    return data.reduce((prev, curr) => [...prev, ...getFootnotes(curr)], []);
  }

  if (typeof data === 'object' && 'footnote' in data) {
    return [data as FootnoteEntry];
  }

  if (typeof data === 'object') {
    return Object.keys(data).reduce(
      (prev, key) => [...prev, ...getFootnotes(data[key])],
      []
    );
  }

  return [];
}
