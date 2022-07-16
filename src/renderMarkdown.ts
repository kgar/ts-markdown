export function renderMarkdown(
  data: DataDrivenMarkdownEntry[],
  options?: DataDrivenMarkdownOptions
) {
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

function renderEntries(
  data: DataDrivenMarkdownEntry[],
  options: DataDrivenMarkdownOptions
) {
  options ??= {
    unorderedListItemIndicator: '-',
    prefix: '',
  };

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

      if (requiresAdditionalNewline(entry)) {
        textStack += entryPrefix;
        textStack += '\n';
      }
    }
  }
  return textStack;
}

function requiresAdditionalNewline(entry: DataDrivenMarkdownEntry) {
  if (typeof entry === 'string') {
    return false;
  }
  return (
    'p' in entry ||
    'blockquote' in entry ||
    'h1' in entry ||
    'h2' in entry ||
    'h3' in entry ||
    'h4' in entry ||
    'h5' in entry ||
    'h6' in entry ||
    'hr' in entry ||
    'table' in entry ||
    'ul' in entry ||
    'ol' in entry
  );
}

function getMarkdownString(
  entry: DataDrivenMarkdownEntry | string,
  options: DataDrivenMarkdownOptions
): string | string[] {
  if (entry === null || entry === undefined) {
    return '';
  }

  if (typeof entry === 'string') {
    return entry;
  }

  if ('h1' in entry) {
    let useUnderlining = entry.underline ?? options.useH1Underlining;
    let header1IndicatorPrefix = useUnderlining ? '' : '# ';
    let headerText = `${header1IndicatorPrefix}${getMarkdownString(
      entry.h1,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;

    if (useUnderlining) {
      headerText += '\n' + ''.padEnd(headerText.length, '=');
    }

    return headerText;
  }

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

  if ('h3' in entry) {
    return `### ${getMarkdownString(
      entry.h3,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  if ('h4' in entry) {
    return `#### ${getMarkdownString(
      entry.h4,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  if ('h5' in entry) {
    return `##### ${getMarkdownString(
      entry.h5,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  if ('h6' in entry) {
    return `###### ${getMarkdownString(
      entry.h6,
      options
    )}${getOptionalHeaderIdText(entry, ' ')}`;
  }

  if ('bold' in entry) {
    return `**${getMarkdownString(entry.bold, options)}**`;
  }

  if ('italic' in entry) {
    return `*${getMarkdownString(entry.italic, options)}*`;
  }

  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight, options)}==`;
  }

  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
  }

  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text
      .map((entry) => getMarkdownString(entry, options))
      .join('');
  }

  if ('blockquote' in entry) {
    return typeof entry.blockquote === 'string'
      ? '> ' + getMarkdownString(entry.blockquote, options)
      : renderEntries(entry.blockquote, { ...options, prefix: '> ' });
  }

  if ('ol' in entry) {
    return entry.ol.map((liEntry, index) => {
      const li = liEntry.li;
      if (Array.isArray(li)) {
        return renderEntries(li, {
          ...options,
          prefix: (liIndex) => {
            return liIndex === 0 ? `${index + 1}. ` : '    ';
          },
        });
      }

      return join(getMarkdownString(li, options), '\n', (liIndex) => {
        return liIndex === 0 ? `${index + 1}. ` : '    ';
      });
    });
  }

  if ('ul' in entry) {
    let indicator = entry.indicator ?? options.unorderedListItemIndicator;
    return entry.ul
      .map((liEntry) => {
        const li = liEntry.li;
        if (Array.isArray(li)) {
          return renderEntries(li, {
            ...options,
            prefix: (liIndex) => (liIndex === 0 ? `${indicator} ` : '    '),
          });
        }

        return join(getMarkdownString(li, options), '\n', (liIndex) =>
          liIndex === 0 ? `${indicator} ` : '    '
        );
      })
      .map((x) => x.replace(/^([\-\+\*]\s[\d]+)(\.)/, '$1\\.'));
  }

  if ('hr' in entry) {
    return '---';
  }

  if ('code' in entry) {
    let backtickTally = 0;
    entry.code.split('').reduce((prev, curr) => {
      let tally = curr === '`' ? prev + 1 : 0;
      backtickTally = Math.max(backtickTally, tally);
      return tally;
    }, 0);

    let codeStartPadding = entry.code.startsWith('`') ? ' ' : '';
    let codeEndPadding = entry.code.endsWith('`') ? ' ' : '';

    let codeIndicator = ''.padEnd(backtickTally + 1, '`');
    return `${codeIndicator}${codeStartPadding}${entry.code}${codeEndPadding}${codeIndicator}`;
  }

  if ('link' in entry) {
    const formattedLink = entry.link.source.replace(/\s/g, '%20');

    if (!entry.link.text) {
      return formattedLink;
    }

    const titleSegment =
      entry.link.title !== undefined ? ` "${entry.link.title}"` : '';

    return `[${entry.link.text}](${formattedLink}${titleSegment})`;
  }

  if ('p' in entry) {
    if (typeof entry.p === 'string') {
      return getMarkdownString(formatParagraphText(entry.p), options);
    }

    if (Array.isArray(entry.p)) {
      return formatParagraphText(
        entry.p.map((entry) => getMarkdownString(entry, options)).join('')
      );
    }

    let result = getMarkdownString(entry.p, options);
    if (typeof result === 'string') {
      return formatParagraphText(result);
    }

    return result.map((x) => formatParagraphText(x));
  }

  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  if ('table' in entry) {
    escapePipes(entry);
    let columnCount = entry.table.columns.length;
    let columnNames = entry.table.columns.reduce(
      (prev, curr) => prev.concat(typeof curr === 'string' ? curr : curr.name),
      []
    );

    let cellWidths = [];
    for (let i = 0; i < columnCount; i++) {
      let column = entry.table.columns[i];
      let columnName = getColumnName(column);

      let columnCellTexts = [
        getColumnHeaderTextLength(entry.table.columns[i]),
        ...entry.table.rows
          .reduce<string[]>((prev, curr) => {
            let value = 'length' in curr ? curr[i] : curr[columnName];
            if (value !== undefined) {
              let result = getMarkdownString(value, options);
              if (typeof result === 'string') {
                prev.push(result);
              } else {
                throw new Error(
                  'Unknown table rendering scenario encountered. Multi-line table cell content is not supported.'
                );
              }
            }

            return prev;
          }, [])
          .map((columnCellText) => columnCellText.length),
      ];

      cellWidths[i] = columnCellTexts.reduce(
        (prev, curr) => Math.max(prev, curr),
        0
      );
    }

    return [
      buildHeaderRow(entry, cellWidths, entry.table.columns),
      buildDividerRow(cellWidths, entry.table.columns),
      ...buildDataRows(entry, cellWidths, columnNames, options),
    ].join('\n');
  }

  if ('tasks' in entry) {
    return entry.tasks
      .map((taskEntry) => {
        let completed = false;
        let taskText = '';

        if (typeof taskEntry === 'string') {
          taskText = taskEntry;
        } else if ('task' in taskEntry) {
          completed = taskEntry.completed === true;
          let result = getMarkdownString(taskEntry.task, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        } else {
          let result = getMarkdownString(taskEntry, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        }

        return `- [${completed ? 'x' : ' '}] ${taskText}`;
      })
      .join('\n');
  }

  if ('emoji' in entry) {
    return `:${entry.emoji}:`;
  }

  if ('sup' in entry) {
    let useSuperscriptHtml = entry.html ?? options.useSuperscriptHtml ?? false;
    let superscriptOpen = useSuperscriptHtml ? '<sup>' : '^';
    let superscriptClose = useSuperscriptHtml ? '</sup>' : '^';
    return `${superscriptOpen}${getMarkdownString(
      entry.sup,
      options
    )}${superscriptClose}`;
  }

  if ('sub' in entry) {
    let useSubscriptHtml = entry.html ?? options.useSubscriptHtml ?? false;
    let subscriptOpen = useSubscriptHtml ? '<sub>' : '~';
    let subscriptClose = useSubscriptHtml ? '</sub>' : '~';
    return `${subscriptOpen}${getMarkdownString(
      entry.sub,
      options
    )}${subscriptClose}`;
  }

  if ('codeblock' in entry) {
    let linePrefix = entry.fenced ? '' : '    ';
    let blockStart = entry.fenced ? getCodeFenceOpen(entry) + '\n' : '';
    let blockEnd = entry.fenced ? '\n' + getCodeFenceClose(entry) : '';

    let codeBlock =
      typeof entry.codeblock === 'string'
        ? linePrefix + entry.codeblock.split('\n').join('\n' + linePrefix)
        : entry.codeblock.map((line) => linePrefix + line).join('\n');

    return `${blockStart}${codeBlock}${blockEnd}`;
  }

  if ('footnote' in entry) {
    return `[^${entry.footnote.id}]`;
  }

  return null;
}

function buildDataRows(
  entry: TableEntry,
  cellWidths: number[],
  columnNames: string[],
  options: DataDrivenMarkdownOptions
) {
  return entry.table.rows.map((row) => {
    let cells: string[] = [];
    if (Array.isArray(row)) {
      cells = [
        ...row.map((cell, index) =>
          padAlign(
            renderCellText(cell, options),
            cellWidths[index],
            entry.table.columns[index]
          )
        ),
      ];
    } else if (typeof row === 'object') {
      cells = columnNames.reduce(
        (prev, curr, index) =>
          prev.concat(
            padAlign(
              renderCellText(row[curr], options) ?? '',
              cellWidths[index],
              entry.table.columns[index]
            )
          ),
        []
      );
    }
    return `| ${cells.join(' | ')} |`;
  });
}

function renderCellText(
  value: string | TextEntry,
  options: DataDrivenMarkdownOptions
): string {
  if (typeof value === 'string') {
    return value;
  }

  return renderEntries([value], options);
}

function padAlign(
  cellText: string,
  cellWidth: number,
  column: string | TableColumn
): string {
  return typeof column === 'string' || column.align === 'left' || !column.align
    ? cellText.padEnd(cellWidth, ' ')
    : column.align === 'center'
    ? cellText
        .padStart(
          cellText.length + Math.floor(cellWidth - cellText.length) / 2,
          ' '
        )
        .padEnd(cellWidth, ' ')
    : column.align === 'right'
    ? cellText.padStart(cellWidth, ' ')
    : cellText;
}

function buildDividerRow(
  cellWidths: number[],
  columns: (string | TableColumn)[]
) {
  return `|${cellWidths
    .map(
      (cellWidth, index) =>
        getLeftSideAlignmentCharacter(columns[index]) +
        ''.padStart(cellWidth, '-') +
        getRightSideAlignmentCharacter(columns[index])
    )
    .join('|')}|`;
}

function getLeftSideAlignmentCharacter(column: string | TableColumn) {
  if (typeof column === 'string') {
    return ' ';
  }

  return column.align === 'left' || column.align === 'center' ? ':' : ' ';
}

function getRightSideAlignmentCharacter(column: string | TableColumn) {
  if (typeof column === 'string') {
    return ' ';
  }

  return column.align === 'right' || column.align === 'center' ? ':' : ' ';
}

function buildHeaderRow(
  entry: TableEntry,
  cellWidths: number[],
  columns: (string | TableColumn)[]
) {
  return `| ${entry.table.columns
    .map((column, index) =>
      padAlign(getColumnName(column), cellWidths[index], columns[index])
    )
    .join(' | ')} |`;
}

function getColumnName(column: string | TableColumn) {
  return typeof column === 'string' ? column : column.name;
}

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
}

function getColumnHeaderTextLength(column: string | TableColumn) {
  return typeof column === 'string' ? column.length : column.name.length;
}

function escapePipes<T>(target: T): T {
  if (typeof target === 'string') {
    return target.replaceAll('|', '&#124;') as unknown as T;
  }

  if (Array.isArray(target)) {
    for (let i = 0; i < target.length; i++) {
      target[i] = escapePipes(target[i]);
    }
  }

  if (typeof target === 'object') {
    for (let key of Object.keys(target)) {
      target[key] = escapePipes(target[key]);
    }
  }

  return target;
}

function getOptionalHeaderIdText(
  entry: Partial<Identifiable>,
  prefix: string = ''
) {
  if (entry.id === undefined) {
    return '';
  }

  return `${prefix}{#${entry.id}}`;
}
function getCodeFenceOpen(entry: CodeBlockEntry) {
  let fenceCharacter = getCodeFenceCharacter(entry);
  let languageCharacter = entry.language ?? '';
  return fenceCharacter + fenceCharacter + fenceCharacter + languageCharacter;
}

function getCodeFenceCharacter(entry: CodeBlockEntry) {
  return entry.fenced === '~' ? '~' : '`';
}

function getCodeFenceClose(entry: CodeBlockEntry) {
  let fenceCharacter = getCodeFenceCharacter(entry);
  return fenceCharacter + fenceCharacter + fenceCharacter;
}

function join(
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
