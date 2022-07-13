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

  if ('blockquote' in entry) {
    return `> ${entry.blockquote}`;
  }

  if ('ol' in entry) {
    return `1. ${entry.ol}`;
  }

  if ('ul' in entry) {
    return `- ${entry.ul}`;
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

    return formatParagraphText(entry.p.map(getMarkdownString).join(''));
  }

  if ('img' in entry) {
    const formattedLink = entry.img.href.replace(/\s/g, '%20');

    const titleSegment =
      entry.img.title !== undefined ? ` "${entry.img.title}"` : '';

    return `![${entry.img.alt ?? ''}](${formattedLink}${titleSegment})`;
  }

  return null;
}

function formatParagraphText(text: string) {
  return text
    ?.trimStart()
    .replace(/(^.*?)[\t]+/g, '')
    .trimStart();
}
