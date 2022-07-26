import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating code blocks.
 */
export interface CodeBlockEntry extends MarkdownEntry {
  /**
   * The block of code, newlines included.
   */
  codeblock: string | string[];

  /**
   * The character for signifying how to fence the code block.
   * Leaving this blank results in the classic indented code block.
   */
  fenced?: boolean | '`' | '~';

  /**
   * The code language, used for syntax highlighting in some markdown renderers.
   */
  language?: string;

  /**
   * Option which will arbitrarily append a string immediately below the blockquote, ignoring block-level settings.
   */
  append?: string;
}

/**
 * The renderer for codeblock entries.
 *
 * @param entry The codeblock entry
 * @param options Document-level render options
 * @returns Block-level codeblock markdown content
 */
export const codeblockRenderer: MarkdownRenderer = (
  entry: CodeBlockEntry,
  options: RenderOptions
) => {
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

function getCodeFenceOpen(fencing: boolean | '`' | '~', language?: string) {
  let fenceCharacter = getCodeFenceCharacter(fencing);
  let languageCharacter = language ?? '';
  return fenceCharacter + fenceCharacter + fenceCharacter + languageCharacter;
}

function getCodeFenceCharacter(fencing: boolean | '`' | '~' | undefined) {
  return fencing === '~' ? '~' : '`';
}

function getCodeFenceClose(entry: CodeBlockEntry, options: RenderOptions) {
  let fenceCharacter = getCodeFenceCharacter(
    entry.fenced ?? options.useCodeblockFencing
  );
  return fenceCharacter + fenceCharacter + fenceCharacter;
}

export function codeblock(
  content: CodeBlockEntry['codeblock'],
  options?: Omit<CodeBlockEntry, 'codeblock'>
): MarkdownEntry {
  return {
    codeblock: content,
    ...options,
  };
}
