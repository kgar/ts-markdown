import { getMarkdownString } from '../rendering';
import { RenderOptions } from '../rendering.types';
import { RichTextEntry, MarkdownEntry } from '../shared.types';

export type SubscriptEntry = {
  sub: RichTextEntry;
  html?: boolean;
} & MarkdownEntry &
  RichTextEntry;

export const subRenderer = (entry: SubscriptEntry, options: RenderOptions) => {
  if ('sub' in entry) {
    let useSubscriptHtml = entry.html ?? options.useSubscriptHtml ?? false;
    let subscriptOpen = useSubscriptHtml ? '<sub>' : '~';
    let subscriptClose = useSubscriptHtml ? '</sub>' : '~';
    return `${subscriptOpen}${getMarkdownString(
      entry.sub,
      options
    )}${subscriptClose}`;
  }

  throw new Error('Entry is not a sub entry. Unable to render.');
};
