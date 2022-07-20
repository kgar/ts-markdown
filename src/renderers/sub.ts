import { getMarkdownString } from '../rendering';
import { DataDrivenMarkdownOptions } from '../rendering.types';
import { RichTextEntry, DataDrivenMarkdownEntry } from '../shared.types';

export type SubscriptEntry = {
  sub: RichTextEntry;
  html?: boolean;
} &
  DataDrivenMarkdownEntry &
  RichTextEntry;

export const subRenderer = (
  entry: SubscriptEntry,
  options: DataDrivenMarkdownOptions
) => {
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
