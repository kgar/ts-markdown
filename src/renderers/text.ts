import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { RichTextEntry, InlineTypes } from '../shared.types';
import { CodeEntry } from './code';
import { ImageEntry } from './img';
import { LinkEntry } from './link';

export interface TextEntry extends InlineTypes {
  text: string | (RichTextEntry | LinkEntry | ImageEntry | CodeEntry)[];
}

export const textRenderer: MarkdownRenderer = (
  entry: TextEntry,
  options: RenderOptions
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
