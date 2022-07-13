export function renderMarkdown(data: DataDrivenMarkdownEntry[]) {
  return data.map(getMarkdownString).join('');
}

function getMarkdownString(entry: DataDrivenMarkdownEntry | string): string {
  if (typeof entry === 'string') {
    return entry;
  }

  if ('h1' in entry) {
    return `# ${entry.h1}`;
  }

  if ('h2' in entry) {
    return `## ${entry.h2}`;
  }

  if ('h3' in entry) {
    return `### ${entry.h3}`;
  }

  if ('h4' in entry) {
    return `#### ${entry.h4}`;
  }

  if ('h5' in entry) {
    return `##### ${entry.h5}`;
  }

  if ('h6' in entry) {
    return `###### ${entry.h6}`;
  }

  if ('bold' in entry) {
    return `**${entry.bold}**`;
  }

  if ('italic' in entry) {
    return `*${entry.italic}*`;
  }

  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text.map(getMarkdownString).join('');
  }

  return null;
}
