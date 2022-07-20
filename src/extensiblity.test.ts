import {
  getBlockLevelEntries as getBlockLevelEntries,
  getRenderers,
} from './defaults';
import { BlockquoteEntry } from './renderers/blockquote';
import { H1Entry } from './renderers/h1';
import { H2Entry } from './renderers/h2';
import { ParagraphEntry, pRenderer } from './renderers/p';
import { TextEntry } from './renderers/text';
import { renderEntries, renderMarkdown } from './rendering';
import { MarkdownRenderer, DataDrivenMarkdownOptions } from './rendering.types';
import { DataDrivenMarkdownEntry } from './shared.types';

describe('given entries to render', () => {
  describe('with custom Obsidian renderers', () => {
    type TransclusionEntry = {
      transclusion: { path: string };
      html?: boolean;
    } & DataDrivenMarkdownEntry;
    const transclusionRenderer: MarkdownRenderer = (
      entry: TransclusionEntry
    ) => {
      if (entry.html) {
        return `<span alt="${entry.transclusion.path}" src="${entry.transclusion.path}" class="internal-embed"></span>`;
      }

      return `![[${entry.transclusion.path}]]`;
    };

    type ObsidianInternalLinkEntry = {
      internalLink: {
        path: string;
        title?: string;
      };
      html?: boolean;
    } & DataDrivenMarkdownEntry;

    const internalLinkRenderer: MarkdownRenderer = (
      entry: ObsidianInternalLinkEntry
    ) => {
      if (entry.html) {
        let title = entry.internalLink.title ?? entry.internalLink.path;
        return `<a href="${entry.internalLink.path}" class="internal-link">${title}</a>`;
      }

      let titleSuffix = entry.internalLink.title
        ? ` \\| "${entry.internalLink.title}"`
        : '';

      return `[[${entry.internalLink.path}${titleSuffix}]]`;
    };

    type ObsidianCalloutEntry = {
      callout: {
        type: string;
        title?: string;
        content: DataDrivenMarkdownEntry | DataDrivenMarkdownEntry[];
      };
    };

    const calloutRenderer: MarkdownRenderer = (
      entry: ObsidianCalloutEntry,
      options: DataDrivenMarkdownOptions
    ) => {
      let titleText = entry.callout.title ? ` ${entry.callout.title}` : '';

      let content = Array.isArray(entry.callout.content)
        ? entry.callout.content
        : [entry.callout.content];

      const blockquote: BlockquoteEntry = {
        blockquote: [
          <ParagraphEntry>{ p: `[!${entry.callout.type}]${titleText}` },
          ...content,
        ],
      };

      return renderEntries([blockquote], options);
    };

    const renderers: Map<string, MarkdownRenderer> = getRenderers([
      ['transclusion', transclusionRenderer],
      ['internalLink', internalLinkRenderer],
      ['callout', calloutRenderer],
    ]);

    const blockLevelEntries = getBlockLevelEntries(['transclusion', 'callout']);

    describe('with a custom Obsidian transclusion entry', () => {
      const entries: DataDrivenMarkdownEntry[] = [
        { h1: 'Hello, world!' },
        {
          blockquote:
            'This is a document which contains cool stuff such as the following:',
        },
        <TransclusionEntry>{
          transclusion: {
            path: 'Path/To/My/Transcluded/Content',
          },
        },
        {
          text: 'Oh hai block-level transclusion 👆',
        },
      ];

      const options: DataDrivenMarkdownOptions = {
        renderers: renderers,
        blockLevelEntries,
      };

      test('renders transclusion markdown as configured', () => {
        expect(renderMarkdown(entries, options)).toBe(
          `# Hello, world!

> This is a document which contains cool stuff such as the following:

![[Path/To/My/Transcluded/Content]]

Oh hai block-level transclusion 👆`
        );
      });
    });

    describe('with a custom Obsidian transclusion entry as HTML', () => {
      const entries: DataDrivenMarkdownEntry[] = [
        <H1Entry>{ h1: 'Hello, world!' },
        <BlockquoteEntry>{
          blockquote:
            'This is a document which contains cool stuff such as the following:',
        },
        <TransclusionEntry>{
          transclusion: {
            path: 'Path/To/My/Transcluded/Content',
          },
          html: true,
        },
        <TextEntry>{
          text: 'Oh hai block-level transclusion 👆',
        },
      ];

      const options: DataDrivenMarkdownOptions = {
        renderers: renderers,
        blockLevelEntries,
      };

      test('renders transclusion markdown as configured', () => {
        expect(renderMarkdown(entries, options)).toBe(
          `# Hello, world!

> This is a document which contains cool stuff such as the following:

<span alt="Path/To/My/Transcluded/Content" src="Path/To/My/Transcluded/Content" class="internal-embed"></span>

Oh hai block-level transclusion 👆`
        );
      });
    });

    describe('with an Obsidian callout as a block-level element in a simple document', () => {
      const entries: DataDrivenMarkdownEntry[] = [
        <H1Entry>{
          h1: 'Callout Test',
        },
        <ObsidianCalloutEntry>{
          callout: {
            type: 'tip',
            title: 'Welcome, Friends',
            content: [
              <H2Entry>{
                h2: 'Content Creation',
              },
              <ParagraphEntry>{
                p: 'Obsidian allows you to create content quickly and easily, while rendering a view of your content that is satisfying to behold.',
              },
            ],
          },
        },
        <BlockquoteEntry>{
          blockquote: 'Note that Callouts are fancy blockquotes. So fancy!',
        },
      ];

      test('renders simple document with correctly-formatted Obsidian callout', () => {
        expect(
          renderMarkdown(entries, {
            renderers,
            blockLevelEntries,
          })
        ).toBe(
          `# Callout Test

> [!tip] Welcome, Friends
> 
> ## Content Creation
> 
> Obsidian allows you to create content quickly and easily, while rendering a view of your content that is satisfying to behold.

> Note that Callouts are fancy blockquotes. So fancy!`
        );
      });
    });

    describe('with an Obsidian internal link as an inline element in a simple document', () => {
      const entries: DataDrivenMarkdownEntry[] = [
        <H1Entry>{
          h1: 'Testing',
        },
        <ParagraphEntry>{
          p: {
            text: [
              'This is a test of Obsidian Internal Linking',
              {
                emoji: 'tm',
              },
              ", so let's look for ",
              <ObsidianInternalLinkEntry>{
                internalLink: {
                  path: 'Path/To/The/Jams',
                  title: 'The Jams!',
                },
              },
            ],
          },
        },
        <ParagraphEntry>{
          p: "It's as easy as that.",
        },
      ];
      test('renders the content with the internal link contained alongside other inline content', () => {
        expect(
          renderMarkdown(entries, {
            renderers,
            blockLevelEntries,
          })
        ).toBe(
          `# Testing

This is a test of Obsidian Internal Linking:tm:, so let's look for [[Path/To/The/Jams \\| "The Jams!"]]

It's as easy as that.`
        );
      });
    });
  });

  describe('with paragraphs overridden to be bolded', () => {
    const originalParagraphRenderer = pRenderer;

    const alternateParagraphRenderer: MarkdownRenderer = (
      entry: ParagraphEntry,
      options
    ) => {
      return `**${originalParagraphRenderer(entry, options)}**`;
    };

    const renderers = getRenderers([['p', alternateParagraphRenderer]]);

    const entries: DataDrivenMarkdownEntry[] = [
      <H1Entry>{
        h1: 'Testing',
      },
      <ParagraphEntry>{
        p: {
          text: ['You got to ', { highlight: 'test your code!' }],
        },
      },
      <ParagraphEntry>{
        p: 'Please.',
      },
    ];

    test('renders a bolded paragraph', () => {
      expect(renderMarkdown(entries, { renderers })).toBe(
        `# Testing

**You got to ==test your code!==**

**Please.**`
      );
    });
  });
});
