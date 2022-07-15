export function renderMarkdown(
  data: DataDrivenMarkdownEntry[],
  prefix: MarkdownRenderPrefix = ''
) {
  let textStack = '';
  for (const [index, entry] of data.entries()) {
    let entryPrefix = renderPrefix(prefix, index, entry);

    const result = getMarkdownString(entry);
    const newText =
      typeof result === 'string'
        ? result.split('\n')
        : result.reduce((prev, curr) => [...prev, curr.split('\n')], []);
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
  entry: DataDrivenMarkdownEntry | string
): string | string[] {
  if (entry === null || entry === undefined) {
    return '';
  }

  if (typeof entry === 'string') {
    return entry;
  }

  if ('h1' in entry) {
    return `# ${getMarkdownString(entry.h1)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('h2' in entry) {
    return `## ${getMarkdownString(entry.h2)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('h3' in entry) {
    return `### ${getMarkdownString(entry.h3)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('h4' in entry) {
    return `#### ${getMarkdownString(entry.h4)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('h5' in entry) {
    return `##### ${getMarkdownString(entry.h5)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('h6' in entry) {
    return `###### ${getMarkdownString(entry.h6)}${getOptionalHeaderIdText(
      entry,
      ' '
    )}`;
  }

  if ('bold' in entry) {
    return `**${getMarkdownString(entry.bold)}**`;
  }

  if ('italic' in entry) {
    return `*${getMarkdownString(entry.italic)}*`;
  }

  if ('highlight' in entry) {
    return `==${getMarkdownString(entry.highlight)}==`;
  }

  if ('strikethrough' in entry) {
    return `~~${getMarkdownString(entry.strikethrough)}~~`;
  }

  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text.map((entry) => getMarkdownString(entry)).join('');
  }

  if ('blockquote' in entry) {
    return typeof entry.blockquote === 'string'
      ? '> ' + getMarkdownString(entry.blockquote)
      : renderMarkdown(entry.blockquote, '> ');
  }

  if ('ol' in entry) {
    return entry.ol.map((liEntry, index) => {
      const li = liEntry.li;
      if (Array.isArray(li)) {
        return renderMarkdown(li, (liIndex) => {
          return liIndex === 0 ? `${index + 1}. ` : '    ';
        });
      }

      return join(getMarkdownString(li), '\n', (liIndex) => {
        return liIndex === 0 ? `${index + 1}. ` : '    ';
      });
    });
  }

  if ('ul' in entry) {
    return entry.ul.map((liEntry, index) => {
      const li = liEntry.li;
      if (Array.isArray(li)) {
        return renderMarkdown(li, (liIndex) => (liIndex === 0 ? `- ` : '  '));
      }

      return join(getMarkdownString(li), '\n', (liIndex) =>
        liIndex === 0 ? `- ` : '    '
      );
    });
  }

  if ('hr' in entry) {
    return '---';
  }

  if ('code' in entry) {
    return `\`${entry.code}\``;
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
      return getMarkdownString(formatParagraphText(entry.p));
    }

    return formatParagraphText(
      entry.p.map((entry) => getMarkdownString(entry)).join('')
    );
  }

  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  // TODO: Extract to own module. It's getting unruly in here.
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
              let result = getMarkdownString(value);
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
      ...buildDataRows(entry, cellWidths, columnNames),
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
          let result = getMarkdownString(taskEntry.task);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        } else {
          let result = getMarkdownString(taskEntry);
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
    let superscriptOpen = entry.html ? '<sup>' : '^';
    let superscriptClose = entry.html ? '</sup>' : '^';
    return `${superscriptOpen}${getMarkdownString(
      entry.sup
    )}${superscriptClose}`;
  }

  if ('sub' in entry) {
    let subscriptOpen = entry.html ? '<sub>' : '~';
    let subscriptClose = entry.html ? '</sub>' : '~';
    return `${subscriptOpen}${getMarkdownString(entry.sub)}${subscriptClose}`;
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

  return null;
}

function buildDataRows(
  entry: TableEntry,
  cellWidths: number[],
  columnNames: string[]
) {
  return entry.table.rows.map((row) => {
    let cells: string[] = [];
    if (Array.isArray(row)) {
      cells = [
        ...row.map((cell, index) =>
          padAlign(
            renderCellText(cell),
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
              renderCellText(row[curr]) ?? '',
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

function renderCellText(value: string | TextEntry): string {
  if (typeof value === 'string') {
    return value;
  }

  return renderMarkdown([value]);
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
