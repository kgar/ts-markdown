import { blockquoteRenderer } from './renderers/blockquote';
import { boldRenderer } from './renderers/bold';
import { codeRenderer } from './renderers/code';
import { codeblockRenderer } from './renderers/codeblock';
import { dlRenderer } from './renderers/dl';
import { emojiRenderer } from './renderers/emoji';
import { footnoteRenderer } from './renderers/footnote';
import { frontmatter, frontmatterRenderer } from './renderers/frontmatter';
import { h1Renderer } from './renderers/h1';
import { h2Renderer } from './renderers/h2';
import { h3Renderer } from './renderers/h3';
import { h4Renderer } from './renderers/h4';
import { h5Renderer } from './renderers/h5';
import { h6Renderer } from './renderers/h6';
import { highlightRenderer } from './renderers/highlight';
import { hrRenderer } from './renderers/hr';
import { imgRenderer } from './renderers/img';
import { italicRenderer } from './renderers/italic';
import { linkRenderer } from './renderers/link';
import { olRenderer } from './renderers/ol';
import { pRenderer } from './renderers/p';
import {
  bigintRenderer,
  booleanRenderer,
  dateRenderer,
  nullRenderer,
  numberRenderer,
  stringRenderer,
  undefinedRenderer,
} from './renderers/primitives';
import { strikethroughRenderer } from './renderers/strikethrough';
import { subRenderer } from './renderers/sub';
import { supRenderer } from './renderers/sup';
import { tableRenderer } from './renderers/table';
import { tasksRenderer } from './renderers/tasks';
import { textRenderer } from './renderers/text';
import { ulRenderer } from './renderers/ul';
import { Renderers } from './rendering.types';

/**
 * Provides default, custom, and overridden renderers for markdown rendering.
 * This is often invoked when the caller wishes to provide custom renderers when rendering a markdown document.
 *
 * @param customRenderers Any renderers which should be used in addition to or in place of existing default renderers.
 * @returns An object map of renderers where the key is the identifying property of the particular markdown entry type.
 */
export function getRenderers(customRenderers: Renderers = {}): Renderers {
  return {
    string: stringRenderer,
    null: nullRenderer,
    undefined: undefinedRenderer,
    boolean: booleanRenderer,
    number: numberRenderer,
    bigint: bigintRenderer,
    date: dateRenderer,
    h1: h1Renderer,
    h2: h2Renderer,
    h3: h3Renderer,
    h4: h4Renderer,
    h5: h5Renderer,
    h6: h6Renderer,
    blockquote: blockquoteRenderer,
    bold: boldRenderer,
    code: codeRenderer,
    codeblock: codeblockRenderer,
    dl: dlRenderer,
    emoji: emojiRenderer,
    footnote: footnoteRenderer,
    highlight: highlightRenderer,
    hr: hrRenderer,
    img: imgRenderer,
    italic: italicRenderer,
    link: linkRenderer,
    ol: olRenderer,
    p: pRenderer,
    strikethrough: strikethroughRenderer,
    sub: subRenderer,
    sup: supRenderer,
    table: tableRenderer,
    tasks: tasksRenderer,
    text: textRenderer,
    ul: ulRenderer,
    frontmatter: frontmatterRenderer,
    ...customRenderers,
  };
}
