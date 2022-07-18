import { blockquoteRenderer } from './renderers/blockquote';
import { boldRenderer } from './renderers/bold';
import { codeRenderer } from './renderers/code';
import { codeblockRenderer } from './renderers/codeblock';
import { dlRenderer } from './renderers/dl';
import { emojiRenderer } from './renderers/emoji';
import { footnoteRenderer } from './renderers/footnote';
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
import { strikethroughRenderer } from './renderers/strikethrough';
import { stringRenderer } from './renderers/string';
import { subRenderer } from './renderers/sub';
import { supRenderer } from './renderers/sup';
import { tableRenderer } from './renderers/table';
import { tasksRenderer } from './renderers/tasks';
import { textRenderer } from './renderers/text';
import { ulRenderer } from './renderers/ul';

export function getRenderers(
  customRenderers: [string, MarkdownRenderer][] = []
): Map<string, MarkdownRenderer> {
  return new Map<string, MarkdownRenderer>([
    ['string', stringRenderer],
    ['h1', h1Renderer],
    ['h2', h2Renderer],
    ['h3', h3Renderer],
    ['h4', h4Renderer],
    ['h5', h5Renderer],
    ['h6', h6Renderer],
    ['blockquote', blockquoteRenderer],
    ['bold', boldRenderer],
    ['code', codeRenderer],
    ['codeblock', codeblockRenderer],
    ['dl', dlRenderer],
    ['emoji', emojiRenderer],
    ['footnote', footnoteRenderer],
    ['highlight', highlightRenderer],
    ['hr', hrRenderer],
    ['img', imgRenderer],
    ['italic', italicRenderer],
    ['link', linkRenderer],
    ['ol', olRenderer],
    ['p', pRenderer],
    ['strikethrough', strikethroughRenderer],
    ['sub', subRenderer],
    ['sup', supRenderer],
    ['table', tableRenderer],
    ['tasks', tasksRenderer],
    ['text', textRenderer],
    ['ul', ulRenderer],
    ...customRenderers,
  ]);
}

export function getDefaultEntriesToSurroundWithTwoNewlines(): Set<string> {
  return new Set<string>([
    'p',
    'blockquote',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'hr',
    'table',
    'ul',
    'ol',
    'dl',
  ]);
}
