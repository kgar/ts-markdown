import { CODEBLOCK } from '../constants';

export const codeblockRenderer = (entry: CodeBlockEntry) => {
  if ('codeblock' in entry) {
    let linePrefix = entry.fenced ? '' : CODEBLOCK.NON_FENCED_PREFIX;
    let blockStart = entry.fenced ? getCodeFenceOpen(entry) + '\n' : '';
    let blockEnd = entry.fenced ? '\n' + getCodeFenceClose(entry) : '';

    let codeBlock =
      typeof entry.codeblock === 'string'
        ? linePrefix + entry.codeblock.split('\n').join('\n' + linePrefix)
        : entry.codeblock.map((line) => linePrefix + line).join('\n');

    return `${blockStart}${codeBlock}${blockEnd}`;
  }

  throw new Error('Entry is not a codeblock entry. Unable to render.');
};

function getCodeFenceOpen(entry: CodeBlockEntry) {
  let fenceCharacter = getCodeFenceCharacter(entry);
  let languageCharacter = entry.language ?? '';
  return fenceCharacter + fenceCharacter + fenceCharacter + languageCharacter;
}

function getCodeFenceCharacter(entry: CodeBlockEntry) {
  return entry.fenced === CODEBLOCK.FENCE_INDICATOR_TILDE
    ? CODEBLOCK.FENCE_INDICATOR_TILDE
    : CODEBLOCK.FENCE_INDICATOR_BACKTICK;
}

function getCodeFenceClose(entry: CodeBlockEntry) {
  let fenceCharacter = getCodeFenceCharacter(entry);
  return fenceCharacter + fenceCharacter + fenceCharacter;
}
