import { RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

export type HorizontalRuleEntry = {
  hr: any;
  indicator?: '*' | '-' | '_';
  append?: string;
} & MarkdownEntry;

export const hrRenderer = (
  entry: HorizontalRuleEntry,
  options: RenderOptions
) => {
  if ('hr' in entry) {
    let indicator = entry.indicator ?? '-';
    return `${indicator}${indicator}${indicator}`;
  }

  throw new Error('Entry is not an hr entry. Unable to render.');
};
