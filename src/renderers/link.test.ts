import { renderMarkdown } from '../rendering';
import { LinkEntry } from './link';

describe('given a link entry', () => {
  describe('with no text', () => {
    const linkEntry: LinkEntry = {
      link: { source: 'https://www.google.com' },
    };

    test('renders an auto-link', () => {
      expect(renderMarkdown([linkEntry])).toBe(`<${linkEntry.link.source}>`);
    });
  });

  describe('with source and text', () => {
    const linkEntry: LinkEntry = {
      link: { source: 'https://www.google.com', text: 'Google' },
    };

    test('renders a link line with specified text and source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source})`
      );
    });
  });

  describe('with source, text, and title', () => {
    const linkEntry: LinkEntry = {
      link: {
        source: 'https://www.google.com',
        text: 'Google',
        title: 'Let Me Google That For You...',
      },
    };

    test('renders a link line with specified text and source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source} "${linkEntry.link.title}")`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('with source that has spaces', () => {
    const linkEntry: LinkEntry = {
      link: {
        source: 'https://www.google.com/this is my cool link',
      },
    };

    test('renders an auto-link with spaces URL-encoded', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `<${linkEntry.link.source.replace(/\s/g, '%20')}>`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('with source that has spaces and text', () => {
    const linkEntry: LinkEntry = {
      link: {
        source: 'https://www.google.com/this is my cool link',
        text: 'Not a cool link',
      },
    };

    test('renders a link line with spaces URL-encoded on the source', () => {
      expect(renderMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.source.replace(
          /\s/g,
          '%20'
        )})`
      );
    });
  });
});
