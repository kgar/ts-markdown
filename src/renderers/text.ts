import { getMarkdownString } from '../rendering';

export const textRenderer = (
  entry: TextEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('text' in entry) {
    if (typeof entry.text === 'string') {
      return entry.text;
    }

    return entry.text
      .map((entry) => getMarkdownString(entry, options))
      .join('');
  }

  throw new Error('Entry is not a text entry. Unable to render.');
};
