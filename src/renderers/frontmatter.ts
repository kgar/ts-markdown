import { stringify } from 'yaml';
import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { MarkdownEntry } from '../shared.types';

/**
 * Markdown entry for generating frontmatter elements
 */
export interface FrontmatterEntry extends MarkdownEntry {
  frontmatter: Object;
}

/**
 * Renderer for frontmatter entries
 *
 * @param entry the frontmatter object entry
 * @param options
 * @returns
 */
export const frontmatterRenderer: MarkdownRenderer = (
  entry: FrontmatterEntry
) => {
  if ('frontmatter' in entry) {
    const frontmatterText = stringify(entry.frontmatter);
    return {
      markdown: `---\n${frontmatterText}---`,
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a frontmatter object. Unable to render');
};

export function frontmatter(
  content: FrontmatterEntry['frontmatter']
): FrontmatterEntry {
  return {
    frontmatter: content,
  };
}
