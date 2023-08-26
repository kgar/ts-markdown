var tsMarkdown = (function (exports) {
  'use strict';

  /**
   * The renderer for footnote entries.
   *
   * @param entry The footnote entry.
   * @param options Document-level render options.
   * @returns Footnote ID markdown content.
   */
  const footnoteRenderer = (entry, options) => {
    if ('footnote' in entry) {
      return `[^${entry.footnote.id}]`;
    }
    throw new Error('Entry is not a footnote entry. Unable to render.');
  };
  /**
   * The renderer for footnote content at the bottom of the document.
   *
   * @param data Content to include in the footnote.
   * @param document The document to update.
   * @param options Document-level options.
   * @returns The updated document.
   */
  function appendFootnotes(data, document, options) {
    let footnotes = getFootnoteEntries(data);
    if (footnotes.length > 0) {
      document += '\n\n' + getFootnotesString(footnotes, options);
    }
    return document;
  }
  function getFootnotesString(footnotes, options) {
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
  function getFootnoteEntries(data) {
    return Array.isArray(data)
      ? data.reduce((prev, curr) => [...prev, ...getFootnoteEntries(curr)], [])
      : data !== null && typeof data === 'object' && 'footnote' in data
      ? [data]
      : data !== null && typeof data === 'object'
      ? Object.keys(data).reduce(
          (prev, key) => [...prev, ...getFootnoteEntries(data[key])],
          []
        )
      : [];
  }
  /**
   * Helper which creates a footnote entry.
   *
   * @param options Entry-level options for this element.
   * @returns a footnote entry
   */
  function footnote(id, content, options) {
    return {
      footnote: {
        id,
        content,
      },
      ...options,
    };
  }

  /**
   * The main entrypoint into rendering documents in **ts-markdown**.
   *
   * @param data The markdown entries which should be rendered into a markdown document.
   * @param options Document-level options which can affect broad aspects of the rendering process.
   * @returns A string of markdown.
   */
  function tsMarkdown(data, options) {
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
    return document;
  }
  /**
   * Reduces an array of markdown entries to a single string.
   *
   * @param data the markdown entries to process.
   * @param options Document-level options which can affect broad aspects of the rendering process.
   * @returns a string of markdown content.
   */
  function renderEntries(data, options) {
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
        let appendable = entry;
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
  function isAppendable(entry) {
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
  function getMarkdownString(entry, options) {
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
  function renderPrefix(prefix, index, entry) {
    if (typeof prefix === 'string') {
      return prefix;
    }
    return prefix(index, entry);
  }

  /**
   * The renderer for blockquote entries.
   *
   * @param entry The blockquote entry.
   * @param options Document-level render options.
   * @returns Block-level blockquote markdown content.
   */
  const blockquoteRenderer = (entry, options) => {
    if ('blockquote' in entry) {
      return {
        markdown: renderEntries(
          Array.isArray(entry.blockquote)
            ? entry.blockquote
            : [entry.blockquote],
          { ...options, prefix: '> ' }
        ),
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a blockquote entry. Unable to render.');
  };
  /**
   * Helper which creates a blockquote entry.
   *
   * @param options Entry-level options for this element.
   * @returns a blockquote entry
   */
  function blockquote(content, options) {
    return {
      blockquote: content,
      ...options,
    };
  }

  /**
   * The renderer for bold entries.
   *
   * @param entry The renderer for bolded entries.
   * @param options Document-level render options.
   * @returns Bolded markdown content.
   */
  const boldRenderer = (entry, options) => {
    if ('bold' in entry) {
      let indicator = entry.indicator ?? options.boldIndicator ?? '*';
      return `${indicator}${indicator}${getMarkdownString(
        entry.bold,
        options
      )}${indicator}${indicator}`;
    }
    throw new Error('Entry is not a bold entry. Unable to render.');
  };
  /**
   * Helper which creates a bold text entry.
   *
   * @param options Entry-level options for this element.
   * @returns a bold text entry
   */
  function bold(content, options) {
    return {
      bold: content,
      ...options,
    };
  }

  /**
   * The renderer for code entries.
   *
   * @param entry The code entry.
   * @param options Document-level render options.
   * @returns Code markdown content.
   */
  const codeRenderer = (entry, options) => {
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
    throw new Error('Entry is not a code entry. Unable to render.');
  };
  /**
   * Helper which creates a code segment entry.
   *
   * @param options Entry-level options for this element.
   * @returns a code segment entry
   */
  function code(content, options) {
    return {
      code: content,
      ...options,
    };
  }

  /**
   * The renderer for codeblock entries.
   *
   * @param entry The codeblock entry
   * @param options Document-level render options
   * @returns Block-level codeblock markdown content
   */
  const codeblockRenderer = (entry, options) => {
    const fencing = options.useCodeblockFencing ?? entry.fenced;
    if ('codeblock' in entry) {
      let linePrefix = fencing ? '' : '    ';
      let blockStart = fencing
        ? getCodeFenceOpen(fencing, entry.language) + '\n'
        : '';
      let blockEnd = fencing ? '\n' + getCodeFenceClose(entry, options) : '';
      let codeBlock =
        typeof entry.codeblock === 'string'
          ? linePrefix + entry.codeblock.split('\n').join('\n' + linePrefix)
          : entry.codeblock.map((line) => linePrefix + line).join('\n');
      return {
        markdown: `${blockStart}${codeBlock}${blockEnd}`,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a codeblock entry. Unable to render.');
  };
  function getCodeFenceOpen(fencing, language) {
    let fenceCharacter = getCodeFenceCharacter(fencing);
    let languageCharacter = language ?? '';
    return fenceCharacter + fenceCharacter + fenceCharacter + languageCharacter;
  }
  function getCodeFenceCharacter(fencing) {
    return fencing === '~' ? '~' : '`';
  }
  function getCodeFenceClose(entry, options) {
    let fenceCharacter = getCodeFenceCharacter(
      entry.fenced ?? options.useCodeblockFencing
    );
    return fenceCharacter + fenceCharacter + fenceCharacter;
  }
  /**
   * Helper which creates a codeblock entry.
   *
   * @param options Entry-level options for this element.
   * @returns a codeblock entry
   */
  function codeblock(content, options) {
    return {
      codeblock: content,
      ...options,
    };
  }

  /**
   * The renderer for descriptions list entries.
   *
   * @param entry The description list entry.
   * @param options Document-level render options.
   * @returns Block-level description list markdown content.
   */
  const dlRenderer = (entry, options) => {
    if ('dl' in entry) {
      let useHtml = options.useDescriptionListHtml ?? entry.html;
      let termStart = useHtml ? '    <dt>' : '';
      let termEnd = useHtml ? '</dt>' : '';
      let descriptionStart = useHtml ? '    <dd>' : ': ';
      let descriptionEnd = useHtml ? '</dd>' : '';
      let lines = [];
      if (useHtml) {
        lines.push('<dl>');
      }
      let lastItem = undefined;
      for (let descriptionItem of entry.dl) {
        if ('dt' in descriptionItem && lastItem === 'dd') {
          if (lines.length > 0) {
            lines.push('\n');
          }
        }
        if ('dt' in descriptionItem) {
          const termContent =
            termStart +
            getMarkdownString(descriptionItem.dt, options) +
            termEnd;
          lines.push(termContent);
          lastItem = 'dt';
        } else if ('dd' in descriptionItem) {
          const descriptionContent =
            descriptionStart +
            getMarkdownString(descriptionItem.dd, options) +
            descriptionEnd;
          lines.push(descriptionContent);
          lastItem = 'dd';
        }
      }
      if (useHtml) {
        lines.push('</dl>');
      }
      return {
        markdown: lines.join('\n'),
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a dl entry. Unable to render.');
  };
  /**
   * Helper which creates a description list entry.
   *
   * @param options Entry-level options for this element.
   * @returns a description list entry
   */
  function dl(content, options) {
    return {
      dl: content,
      ...options,
    };
  }

  /**
   * The renderer for emoji entries.
   *
   * @param entry The emoji entry.
   * @param options Document-level render options.
   * @returns Emoji markdown content.
   */
  const emojiRenderer = (entry, options) => {
    if ('emoji' in entry) {
      return `:${entry.emoji}:`;
    }
    throw new Error('Entry is not an emoji entry. Unable to render.');
  };
  /**
   * Helper which creates an emoji entry.
   *
   * @param options Entry-level options for this element.
   * @returns an emoji entry
   */
  function emoji(content, options) {
    return {
      emoji: content,
      ...options,
    };
  }

  /**
   * Appends a heading with an ID.
   *
   * @param id The ID. Can also be null or undefined.
   * @param prefix Any prefix text that should be prepended to the resulting ID markdown.
   * @returns A header with ID markdown appended, or an empty string.
   */
  function getOptionalHeaderIdText(id, prefix = '') {
    return id !== undefined ? `${prefix}{#${id}}` : '';
  }
  /**
   * Helper which creates a header entry at the specified level.
   * Designed to help with more programmatic, dynamic header generation.
   *
   * @param options Entry-level options for this element.
   * @returns a header entry
   */
  function header(level, content, options) {
    switch (level) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
        return {
          ['h' + level]: content,
          ...options,
        };
      default:
        throw new Error(`Header level ${level} is not supported.`);
    }
  }

  /**
   * The renderer for h1 entries.
   *
   * @param entry The h1 entry.
   * @param options Document-level render options.
   * @returns Block-level h1 markdown content.
   */
  const h1Renderer = (entry, options) => {
    if ('h1' in entry) {
      let useUnderlining = entry.underline ?? options.useH1Underlining;
      let header1IndicatorPrefix = useUnderlining ? '' : '# ';
      let headerText = `${header1IndicatorPrefix}${getMarkdownString(
        entry.h1,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      if (useUnderlining) {
        headerText += '\n' + ''.padEnd(headerText.length, '=');
      }
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h1 entry. Unable to render.');
  };
  /**
   * Helper which creates a first-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a first-level header entry
   */
  function h1(content, options) {
    return {
      h1: content,
      ...options,
    };
  }

  /**
   * The renderer for h2 entries.
   *
   * @param entry The h2 entry.
   * @param options Document-level render options.
   * @returns Block-level h2 markdown content.
   */
  const h2Renderer = (entry, options) => {
    if ('h2' in entry) {
      let useUnderlining = entry.underline ?? options.useH2Underlining;
      let header2IndicatorPrefix = useUnderlining ? '' : '## ';
      let headerText = `${header2IndicatorPrefix}${getMarkdownString(
        entry.h2,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      if (useUnderlining) {
        headerText += '\n' + ''.padEnd(headerText.length, '-');
      }
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h2 entry. Unable to render.');
  };
  /**
   * Helper which creates a second-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a second-level header entry
   */
  function h2(content, options) {
    return {
      h2: content,
      ...options,
    };
  }

  /**
   * The renderer for h3 entries.
   *
   * @param entry The h3 entry.
   * @param options Document-level render options.
   * @returns Block-level h3 markdown content.
   */
  const h3Renderer = (entry, options) => {
    if ('h3' in entry) {
      let headerText = `### ${getMarkdownString(
        entry.h3,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h3 entry. Unable to render.');
  };
  /**
   * Helper which creates a third-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a third-level header entry
   */
  function h3(content, options) {
    return {
      h3: content,
      ...options,
    };
  }

  /**
   * The renderer for h4 entries.
   *
   * @param entry The h4 entry.
   * @param options Document-level render options.
   * @returns Block-level h4 markdown content.
   */
  const h4Renderer = (entry, options) => {
    if ('h4' in entry) {
      let headerText = `#### ${getMarkdownString(
        entry.h4,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h4 entry. Unable to render.');
  };
  /**
   * Helper which creates a fourth-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a fourth-level header entry
   */
  function h4(content, options) {
    return {
      h4: content,
      ...options,
    };
  }

  /**
   * The renderer for h5 entries.
   *
   * @param entry The h5 entry.
   * @param options Document-level render options.
   * @returns Block-level h5 markdown content.
   */
  const h5Renderer = (entry, options) => {
    if ('h5' in entry) {
      let headerText = `##### ${getMarkdownString(
        entry.h5,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h5 entry. Unable to render.');
  };
  /**
   * Helper which creates a fifth-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a fifth-level header entry
   */
  function h5(content, options) {
    return {
      h5: content,
      ...options,
    };
  }

  /**
   * The renderer for h6 entries.
   *
   * @param entry The h6 entry.
   * @param options Document-level render options.
   * @returns Block-level h6 markdown content.
   */
  const h6Renderer = (entry, options) => {
    if ('h6' in entry) {
      let headerText = `###### ${getMarkdownString(
        entry.h6,
        options
      )}${getOptionalHeaderIdText(entry.id, ' ')}`;
      return {
        markdown: headerText,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an h6 entry. Unable to render.');
  };
  /**
   * Helper which creates a sixth-level header entry.
   *
   * @param options Entry-level options for this element.
   * @returns a sixth-level header entry
   */
  function h6(content, options) {
    return {
      h6: content,
      ...options,
    };
  }

  /**
   * The renderer for highlight entries.
   *
   * @param entry The highlight entry.
   * @param options Document-level render options.
   * @returns Hihglighted text markdown content.
   */
  const highlightRenderer = (entry, options) => {
    if ('highlight' in entry) {
      return `==${getMarkdownString(entry.highlight, options)}==`;
    }
    throw new Error('Entry is not a highlight entry. Unable to render.');
  };
  /**
   * Helper which creates a highlighted text entry.
   *
   * @param options Entry-level options for this element.
   * @returns a highlighted text entry
   */
  function highlight(content, options) {
    return {
      highlight: content,
      ...options,
    };
  }

  /**
   * The renderer for hr entries.
   *
   * @param entry The hr entry.
   * @param options Document-level render options.
   * @returns Block-level hr markdown content.
   */
  const hrRenderer = (entry, options) => {
    if ('hr' in entry) {
      let indicator = entry.indicator ?? '-';
      return {
        markdown: `${indicator}${indicator}${indicator}`,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an hr entry. Unable to render.');
  };
  /**
   * Helper which creates a horizontal rule entry.
   *
   * @param options Entry-level options for this element.
   * @returns a horizontal rule entry
   */
  function hr(options) {
    return {
      hr: true,
      ...options,
    };
  }

  /**
   * The renderer for img entries.
   *
   * @param entry The img entry.
   * @param options Document-level render options.
   * @returns img markdown content.
   */
  const imgRenderer = (entry, options) => {
    if ('img' in entry) {
      const formattedLink = entry.img.source.replace(/\s/g, '%20');
      const titleSegment =
        entry.img.title !== undefined ? ` "${entry.img.title}"` : '';
      return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
    }
    throw new Error('Entry is not an img entry. Unable to render.');
  };
  function img(settings) {
    return {
      img: settings,
    };
  }

  /**
   * The renderer for italic entries.
   *
   * @param entry The italic entry.
   * @param options Document-level render options.
   * @returns Italic markdown content.
   */
  const italicRenderer = (entry, options) => {
    if ('italic' in entry) {
      let indicator = entry.indicator ?? options.italicIndicator ?? '*';
      return `${indicator}${getMarkdownString(
        entry.italic,
        options
      )}${indicator}`;
    }
    throw new Error('Entry is not an italic entry. Unable to render.');
  };
  function italic(content, options) {
    return {
      italic: content,
      ...options,
    };
  }

  /**
   * The renderer for link entries.
   *
   * @param entry The link entry.
   * @param options Document-level render options.
   * @returns Link markdown content.
   */
  const linkRenderer = (entry, options) => {
    if ('link' in entry) {
      const formattedLink = entry.link.href.replace(/\s/g, '%20');
      if (!entry.link.text) {
        return `<${formattedLink}>`;
      }
      const titleSegment =
        entry.link.title !== undefined ? ` "${entry.link.title}"` : '';
      return `[${entry.link.text}](${formattedLink}${titleSegment})`;
    }
    throw new Error('Entry is not a link entry. Unable to render.');
  };
  function link(settings) {
    return {
      link: settings,
    };
  }

  /**
   * The renderer for ordered list entries.
   *
   * @param entry The ordererd list entry.
   * @param options Document-level render options.
   * @returns Block-level ordered list markdown content.
   */
  const olRenderer = (entry, options) => {
    if ('ol' in entry) {
      let markdown = entry.ol
        .map((li, index) => {
          return renderEntries(Array.isArray(li) ? li : [li], {
            ...options,
            prefix: (liIndex) => {
              return liIndex === 0 ? `${index + 1}. ` : '    ';
            },
          });
        })
        .join('\n');
      return {
        markdown,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an ol entry. Unable to render.');
  };
  /**
   * Helper which creates an ordered list entry.
   *
   * @param options Entry-level options for this element.
   * @returns an ordered list entry
   */
  function ol(content, options) {
    return {
      ol: content,
      ...options,
    };
  }

  /**
   * The renderer for paragraph entries.
   *
   * @param entry The paragraph entry.
   * @param options Document-level render options.
   * @returns Block-level paragraph markdown content.
   */
  const pRenderer = (entry, options) => {
    if ('p' in entry) {
      let result = getParagraphMarkdown(entry, options);
      return {
        markdown: typeof result === 'string' ? result : result.markdown,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a p entry. Unable to render.');
  };
  function formatParagraphText(text) {
    return text
      ?.trimStart()
      .replace(/(^.*?)[\t]+/g, '')
      .trimStart();
  }
  function getParagraphMarkdown(entry, options) {
    if (typeof entry.p === 'string') {
      return getMarkdownString(formatParagraphText(entry.p), options);
    }
    if (Array.isArray(entry.p)) {
      return formatParagraphText(
        entry.p.map((entry) => getMarkdownString(entry, options)).join('')
      );
    }
    let result = getMarkdownString(entry.p, options);
    let resultMarkdown = typeof result === 'string' ? result : result.markdown;
    return formatParagraphText(resultMarkdown)
      .split('\n')
      .map((x) => formatParagraphText(x))
      .join('\n');
  }
  function p(content, options) {
    return {
      p: content,
      ...options,
    };
  }

  /**
   * The renderer for strickethrough text entries.
   *
   * @param entry The strikethrough entry.
   * @param options Document-level render options.
   * @returns Strikethrough markdown content.
   */
  const strikethroughRenderer = (entry, options) => {
    if ('strikethrough' in entry) {
      return `~~${getMarkdownString(entry.strikethrough, options)}~~`;
    }
    throw new Error('Entry is not a strikethrough entry. Unable to render.');
  };
  /**
   * Helper which creates a strikethrough text entry.
   *
   * @param options Entry-level options for this element.
   * @returns a strikethrough text entry
   */
  function strikethrough(content, options) {
    return {
      strikethrough: content,
      ...options,
    };
  }

  /**
   * The renderer for string entries.
   *
   * @param entry A string of text.
   * @returns String content.
   */
  const stringRenderer = (entry) => entry;
  /**
   * The renderer for null entries.
   *
   * @param entry null
   * @returns an empty string
   */
  const nullRenderer = (entry) => '';
  /**
   * The renderer for undefined entries.
   *
   * @param entry undefined
   * @returns an empty string
   */
  const undefinedRenderer = (entry) => '';
  /**
   * The renderer for boolean entries.
   *
   * @param entry a boolean
   * @returns the boolean as a string
   */
  const booleanRenderer = (entry) => entry.toString();
  /**
   * The renderer for number entries.
   *
   * @param entry a number
   * @returns the number as a string
   */
  const numberRenderer = (entry) => entry.toString();
  /**
   * The renderer for bigint entries.
   *
   * @param entry a bigint
   * @returns the bigint as a string
   */
  const bigintRenderer = (entry) => entry.toString();
  /**
   * The renderer for date entries.
   *
   * @param entry a date
   * @returns the date as an ISO string.
   */
  const dateRenderer = (entry) => entry.toISOString();

  /**
   * The renderer for subscript entries.
   *
   * @param entry The subscript entry.
   * @param options Document-level render options.
   * @returns Subscript markdown content.
   */
  const subRenderer = (entry, options) => {
    if ('sub' in entry) {
      let useSubscriptHtml = entry.html ?? options.useSubscriptHtml ?? false;
      let subscriptOpen = useSubscriptHtml ? '<sub>' : '~';
      let subscriptClose = useSubscriptHtml ? '</sub>' : '~';
      return `${subscriptOpen}${getMarkdownString(
        entry.sub,
        options
      )}${subscriptClose}`;
    }
    throw new Error('Entry is not a sub entry. Unable to render.');
  };
  /**
   * Helper which creates a subscript text entry.
   *
   * @param options Entry-level options for this element.
   * @returns a subscript text entry
   */
  function sub(content, options) {
    return {
      sub: content,
      ...options,
    };
  }

  /**
   * The renderer for superscript entries.
   *
   * @param entry The superscript entry.
   * @param options Document-level render options.
   * @returns Superscript markdown content.
   */
  const supRenderer = (entry, options) => {
    if ('sup' in entry) {
      let useSuperscriptHtml =
        entry.html ?? options.useSuperscriptHtml ?? false;
      let superscriptOpen = useSuperscriptHtml ? '<sup>' : '^';
      let superscriptClose = useSuperscriptHtml ? '</sup>' : '^';
      return `${superscriptOpen}${getMarkdownString(
        entry.sup,
        options
      )}${superscriptClose}`;
    }
    throw new Error('Entry is not an sup entry. Unable to render.');
  };
  /**
   * Helper which creates a superscript text entry.
   *
   * @param options Entry-level options for this element.
   * @returns a superscript text entry
   */
  function sup(content, options) {
    return {
      sup: content,
      ...options,
    };
  }

  /**
   * The renderer for table entries.
   *
   * @param entry The table entry.
   * @param options Document-level render options.
   * @returns Block-level table markdown content.
   */
  const tableRenderer = (entry, options) => {
    if ('table' in entry) {
      return {
        markdown: getTableMarkdown(entry, options),
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a table entry. Unable to render.');
  };
  function getTableMarkdown(entry, options) {
    escapePipes(entry);
    let columnCount = entry.table.columns.length;
    entry.table.columns.reduce(
      (prev, curr) => prev.concat(typeof curr === 'string' ? curr : curr.name),
      []
    );
    let minColumnWidth = 3;
    let cellWidths = [];
    for (let i = 0; i < columnCount; i++) {
      let column = entry.table.columns[i];
      let columnCellTexts = [
        getColumnHeaderTextLength(entry.table.columns[i]),
        ...entry.table.rows
          .reduce((prev, curr) => {
            let value = Array.isArray(curr)
              ? curr[i]
              : curr[getDataRowPropertyName(column)];
            if (value !== undefined) {
              let result = renderCellText(value, options);
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
        (prev, curr) => Math.max(minColumnWidth, prev, curr),
        0
      );
    }
    return [
      buildHeaderRow(entry, cellWidths, entry.table.columns),
      buildDividerRow(cellWidths, entry.table.columns),
      ...buildDataRows(entry, cellWidths, entry.table.columns, options),
    ].join('\n');
  }
  function buildDataRows(entry, cellWidths, columns, options) {
    return entry.table.rows.map((row) => {
      let cells = [];
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
        cells = columns.reduce(
          (prev, curr, index) =>
            prev.concat(
              padAlign(
                renderCellText(row[getDataRowPropertyName(curr)], options) ??
                  '',
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
  function renderCellText(value, options) {
    return renderEntries([value], options);
  }
  function padAlign(cellText, cellWidth, column) {
    return typeof column === 'string' ||
      column.align === 'left' ||
      !column.align
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
  function buildDividerRow(cellWidths, columns) {
    return `|${cellWidths
      .map(
        (cellWidth, index) =>
          getLeftSideAlignmentCharacter(columns[index]) +
          ''.padStart(cellWidth, '-') +
          getRightSideAlignmentCharacter(columns[index])
      )
      .join('|')}|`;
  }
  function getLeftSideAlignmentCharacter(column) {
    if (typeof column === 'string') {
      return ' ';
    }
    return column.align === 'left' || column.align === 'center' ? ':' : ' ';
  }
  function getRightSideAlignmentCharacter(column) {
    if (typeof column === 'string') {
      return ' ';
    }
    return column.align === 'right' || column.align === 'center' ? ':' : ' ';
  }
  function buildHeaderRow(entry, cellWidths, columns) {
    return `| ${entry.table.columns
      .map((column, index) =>
        padAlign(getColumnName(column), cellWidths[index], columns[index])
      )
      .join(' | ')} |`;
  }
  function getColumnName(column) {
    return typeof column === 'string' ? column : column.name;
  }
  function getColumnHeaderTextLength(column) {
    return typeof column === 'string' ? column.length : column.name.length;
  }
  function escapePipes(target) {
    if (typeof target === 'string') {
      return target.replaceAll('|', '&#124;');
    }
    if (Array.isArray(target)) {
      for (let i = 0; i < target.length; i++) {
        target[i] = escapePipes(target[i]);
      }
    }
    if (typeof target === 'object' && target !== null) {
      let assignable = target;
      for (let key of Object.keys(assignable)) {
        assignable[key] = escapePipes(assignable[key]);
      }
    }
    return target;
  }
  function table(settings, options) {
    return {
      table: settings,
      ...options,
    };
  }
  function getDataRowPropertyName(curr) {
    return typeof curr === 'string' ? curr : curr.field ?? curr.name;
  }

  /**
   * The renderer for task list entries.
   *
   * @param entry The task list entry.
   * @param options Document-level render options.
   * @returns Block-level task list markdown content.
   */
  const tasksRenderer = (entry, options) => {
    if ('tasks' in entry) {
      return {
        markdown: getTasksMarkdown(entry, options),
        blockLevel: true,
      };
    }
    throw new Error('Entry is not a tasks entry. Unable to render.');
  };
  function getTasksMarkdown(entry, options) {
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
  /**
   * Helper which creates a task list entry.
   *
   * @param options Entry-level options for this element.
   * @returns a task list entry
   */
  function tasks(content, options) {
    return {
      tasks: content,
      ...options,
    };
  }

  /**
   * The renderer for inline text entries.
   *
   * @param entry The text entry.
   * @param options Document-level render options.
   * @returns Inline text markdown content.
   */
  const textRenderer = (entry, options) => {
    if ('text' in entry) {
      return (Array.isArray(entry.text) ? entry.text : [entry.text])
        .map((textSegment) => getMarkdownString(textSegment, options))
        .join('');
    }
    throw new Error('Entry is not a text entry. Unable to render.');
  };
  function text(content) {
    return {
      text: content,
    };
  }

  /**
   * The renderer for unordered list entries.
   *
   * @param entry The unordered list entry.
   * @param options Document-level render options.
   * @returns Block-level unordered list markdown content.
   */
  const ulRenderer = (entry, options) => {
    if ('ul' in entry) {
      let markdown = getUnorderedListMarkdown(entry, options);
      return {
        markdown,
        blockLevel: true,
      };
    }
    throw new Error('Entry is not an ul entry. Unable to render.');
  };
  function getUnorderedListMarkdown(entry, options) {
    let indicator =
      entry.indicator ?? options.unorderedListItemIndicator ?? '-';
    return entry.ul
      .map((li) => {
        if (Array.isArray(li)) {
          return renderEntries(li, {
            ...options,
            prefix: (liIndex) => (liIndex === 0 ? `${indicator} ` : '    '),
          });
        }
        return `${indicator} ${getMarkdownString(li, options)}`;
      })
      .map((x) => x.replace(/^([\-\+\*]\s[\d]+)(\.)/, '$1\\.'))
      .join('\n');
  }
  /**
   * Helper which creates an unordered list entry.
   *
   * @param options Entry-level options for this element.
   * @returns an unordered list entry
   */
  function ul(content, options) {
    return {
      ul: content,
      ...options,
    };
  }

  /**
   * Provides default, custom, and overridden renderers for markdown rendering.
   * This is often invoked when the caller wishes to provide custom renderers when rendering a markdown document.
   *
   * @param customRenderers Any renderers which should be used in addition to or in place of existing default renderers.
   * @returns An object map of renderers where the key is the identifying property of the particular markdown entry type.
   */
  function getRenderers(customRenderers = {}) {
    return {
      string: stringRenderer,
      null: nullRenderer,
      undefined: undefinedRenderer,
      boolean: booleanRenderer,
      number: numberRenderer,
      bigint: bigintRenderer,
      date: dateRenderer,
      h1: h1Renderer,
      h2: h2Renderer,
      h3: h3Renderer,
      h4: h4Renderer,
      h5: h5Renderer,
      h6: h6Renderer,
      blockquote: blockquoteRenderer,
      bold: boldRenderer,
      code: codeRenderer,
      codeblock: codeblockRenderer,
      dl: dlRenderer,
      emoji: emojiRenderer,
      footnote: footnoteRenderer,
      highlight: highlightRenderer,
      hr: hrRenderer,
      img: imgRenderer,
      italic: italicRenderer,
      link: linkRenderer,
      ol: olRenderer,
      p: pRenderer,
      strikethrough: strikethroughRenderer,
      sub: subRenderer,
      sup: supRenderer,
      table: tableRenderer,
      tasks: tasksRenderer,
      text: textRenderer,
      ul: ulRenderer,
      ...customRenderers,
    };
  }

  exports.appendFootnotes = appendFootnotes;
  exports.bigintRenderer = bigintRenderer;
  exports.blockquote = blockquote;
  exports.blockquoteRenderer = blockquoteRenderer;
  exports.bold = bold;
  exports.boldRenderer = boldRenderer;
  exports.booleanRenderer = booleanRenderer;
  exports.code = code;
  exports.codeRenderer = codeRenderer;
  exports.codeblock = codeblock;
  exports.codeblockRenderer = codeblockRenderer;
  exports.dateRenderer = dateRenderer;
  exports.dl = dl;
  exports.dlRenderer = dlRenderer;
  exports.emoji = emoji;
  exports.emojiRenderer = emojiRenderer;
  exports.footnote = footnote;
  exports.footnoteRenderer = footnoteRenderer;
  exports.getMarkdownString = getMarkdownString;
  exports.getOptionalHeaderIdText = getOptionalHeaderIdText;
  exports.getRenderers = getRenderers;
  exports.h1 = h1;
  exports.h1Renderer = h1Renderer;
  exports.h2 = h2;
  exports.h2Renderer = h2Renderer;
  exports.h3 = h3;
  exports.h3Renderer = h3Renderer;
  exports.h4 = h4;
  exports.h4Renderer = h4Renderer;
  exports.h5 = h5;
  exports.h5Renderer = h5Renderer;
  exports.h6 = h6;
  exports.h6Renderer = h6Renderer;
  exports.header = header;
  exports.highlight = highlight;
  exports.highlightRenderer = highlightRenderer;
  exports.hr = hr;
  exports.hrRenderer = hrRenderer;
  exports.img = img;
  exports.imgRenderer = imgRenderer;
  exports.italic = italic;
  exports.italicRenderer = italicRenderer;
  exports.link = link;
  exports.linkRenderer = linkRenderer;
  exports.nullRenderer = nullRenderer;
  exports.numberRenderer = numberRenderer;
  exports.ol = ol;
  exports.olRenderer = olRenderer;
  exports.p = p;
  exports.pRenderer = pRenderer;
  exports.renderEntries = renderEntries;
  exports.strikethrough = strikethrough;
  exports.strikethroughRenderer = strikethroughRenderer;
  exports.stringRenderer = stringRenderer;
  exports.sub = sub;
  exports.subRenderer = subRenderer;
  exports.sup = sup;
  exports.supRenderer = supRenderer;
  exports.table = table;
  exports.tableRenderer = tableRenderer;
  exports.tasks = tasks;
  exports.tasksRenderer = tasksRenderer;
  exports.text = text;
  exports.textRenderer = textRenderer;
  exports.tsMarkdown = tsMarkdown;
  exports.ul = ul;
  exports.ulRenderer = ulRenderer;
  exports.undefinedRenderer = undefinedRenderer;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
})({});
