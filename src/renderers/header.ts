export function getOptionalHeaderIdText(
  entry: { id?: string },
  prefix: string = ''
) {
  if (entry.id === undefined) {
    return '';
  }

  return `${prefix}{#${entry.id}}`;
}