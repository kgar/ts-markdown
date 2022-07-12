export function renderMarkdown(data: DataDrivenMarkdownEntry[]) {
  let entry = data[0];

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
}
