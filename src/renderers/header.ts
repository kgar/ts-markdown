/**
 * Appends a heading with an ID.
 * @param id The ID. Can also be null or undefined.
 * @param prefix Any prefix text that should be prepended to the resulting ID markdown.
 * @returns A header with ID markdown appended, or an empty string.
 */
export function getOptionalHeaderIdText(id?: string, prefix: string = '') {
  return id !== undefined ? `${prefix}{#${id}}` : '';
}
