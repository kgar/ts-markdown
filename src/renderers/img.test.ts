import { tsMarkdown } from '../rendering';
import { ImageEntry } from './img';

describe('given an image entry', () => {
  describe('with an href', () => {
    const imgEntry: ImageEntry = {
      img: {
        href: 'image.png',
      },
    };

    test('renders an image line with the specified href', () => {
      expect(tsMarkdown([imgEntry])).toBe(`![](${imgEntry.img.href})`);
    });
  });

  describe('with an href and alt text', () => {
    const imgEntry: ImageEntry = {
      img: {
        href: 'image.png',
        alt: 'Alt text here',
      },
    };

    test('renders an image line with the specified href and alt text', () => {
      expect(tsMarkdown([imgEntry])).toBe(
        `![${imgEntry.img.alt}](${imgEntry.img.href})`
      );
    });
  });

  describe('with an href, title, and alt text', () => {
    const imgEntry: ImageEntry = {
      img: {
        href: 'image.png',
        alt: 'Alt text here',
        title: 'Title here',
      },
    };

    test('renders an image line with the specified href and alt text', () => {
      expect(tsMarkdown([imgEntry])).toBe(
        `![${imgEntry.img.alt}](${imgEntry.img.href} "${imgEntry.img.title}")`
      );
    });
  });
});
