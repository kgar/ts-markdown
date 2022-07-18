export const codeblockRenderer = (
  entry: CodeBlockEntry,
  options: DataDrivenMarkdownOptions
) => {
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

  throw new Error('Entry is not a codeblock entry. Unable to render.');
};

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
