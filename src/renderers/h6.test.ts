import { tsMarkdown } from '../rendering';
import { h6, H6Entry } from './h6';

describe('given a header 6 entry', () => {
  describe('with a string value', () => {
    const entry: H6Entry = {
      h6: 'Hello, world!',
    };

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(`###### ${entry.h6}`);
    });
  });

  describe('using a helper with a string value', () => {
    const entry = h6('Hello, world!');

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(`###### ${entry.h6}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H6Entry = {
      h6: 'Test',
      id: 'test-id',
    };

    test('renders an h6 with the specified text and id', () => {
      expect(tsMarkdown([headerEntry])).toBe(
        `###### ${headerEntry.h6} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const entry: H6Entry = {
      h6: {
        text: [
          {
            highlight: 'Totally',
          },
          ' ',
          {
            bold: { italic: 'awesome' },
          },
          ' ',
          {
            strikethrough: 'd00d',
          },
        ],
      },
    };

    test('renders h6 with rich text', () => {
      expect(tsMarkdown([entry])).toBe(
        '###### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const entry: H6Entry = {
      h6: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h6 with rich text', () => {
      expect(tsMarkdown([entry])).toBe(
        '###### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const entry: H6Entry = {
      h6: {
        text: [
          'The magnificent power of ',
          {
            link: {
              href: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              source: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h6 with link and image', () => {
      expect(tsMarkdown([entry])).toBe(
        '###### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with a string value and appended with an Obsidianesque identifier', () => {
    const entry: H6Entry = {
      h6: 'Hello, world!',
      append: '^la-dee-da',
    };

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(
        `###### ${entry.h6}
^la-dee-da`
      );
    });
  });
});
