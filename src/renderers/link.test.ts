import { tsMarkdown } from '../rendering';
import { LinkEntry } from './link';

describe('given a link entry', () => {
  describe('with no text', () => {
    const linkEntry: LinkEntry = {
      link: { href: 'https://www.google.com' },
    };

    test('renders an auto-link', () => {
      expect(tsMarkdown([linkEntry])).toBe(`<${linkEntry.link.href}>`);
    });
  });

  describe('with source and text', () => {
    const linkEntry: LinkEntry = {
      link: { href: 'https://www.google.com', text: 'Google' },
    };

    test('renders a link line with specified text and source', () => {
      expect(tsMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.href})`
      );
    });
  });

  describe('with source, text, and title', () => {
    const linkEntry: LinkEntry = {
      link: {
        href: 'https://www.google.com',
        text: 'Google',
        title: 'Let Me Google That For You...',
      },
    };

    test('renders a link line with specified text and source', () => {
      expect(tsMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.href} "${linkEntry.link.title}")`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('with source that has spaces', () => {
    const linkEntry: LinkEntry = {
      link: {
        href: 'https://www.google.com/this is my cool link',
      },
    };

    test('renders an auto-link with spaces URL-encoded', () => {
      expect(tsMarkdown([linkEntry])).toBe(
        `<${linkEntry.link.href.replace(/\s/g, '%20')}>`
      );
    });
  });

  /**
   * Based on this recommendation: https://www.markdownguide.org/basic-syntax/#link-best-practices
   */
  describe('with source that has spaces and text', () => {
    const linkEntry: LinkEntry = {
      link: {
        href: 'https://www.google.com/this is my cool link',
        text: 'Not a cool link',
      },
    };

    test('renders a link line with spaces URL-encoded on the source', () => {
      expect(tsMarkdown([linkEntry])).toBe(
        `[${linkEntry.link.text}](${linkEntry.link.href.replace(/\s/g, '%20')})`
      );
    });
  });
});
