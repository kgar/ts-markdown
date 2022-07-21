import { getMarkdownString } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { RichTextEntry, InlineTypes } from '../shared.types';
import { CodeEntry } from './code';
import { ImageEntry } from './img';
import { LinkEntry } from './link';

export type TextEntry = {
  text: string | (RichTextEntry | LinkEntry | ImageEntry | CodeEntry)[];
} & InlineTypes;

export const textRenderer = (entry: TextEntry, options: RenderOptions) => {
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
