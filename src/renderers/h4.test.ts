import { renderMarkdown } from '../rendering';
import { MarkdownEntry } from '../shared.types';
import { H4Entry } from './h4';

describe('given a header 4 entry', () => {
  describe('with a string value', () => {
    const data: MarkdownEntry[] = [
      {
        h4: 'Hello, world!',
      },
    ];

    test('renders an h4 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`#### ${data[0]['h4']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H4Entry = {
      h4: 'Test',
      id: 'test-id',
    };

    test('renders an h4 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `#### ${headerEntry.h4} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h4Entry: H4Entry = {
      h4: {
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

    test('renders h4 with rich text', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h4Entry: H4Entry = {
      h4: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h4 with rich text', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h4Entry: H4Entry = {
      h4: {
        text: [
          'The magnificent power of ',
          {
            link: {
              source: 'https://www.google.com',
              text: 'Googling Placeholders',
            },
          },
          ' like ',
          {
            img: {
              href: 'https://via.placeholder.com/25',
              alt: 'A 25x25 placeholder image',
              title: 'Here is a handy placeholder image',
            },
          },
        ],
      },
    };

    test('renders h4 with link and image', () => {
      expect(renderMarkdown([h4Entry])).toBe(
        '#### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with a string value and appended with an Obsidianesque identifier', () => {
    const entry: H4Entry = {
      h4: 'Hello, world!',
      append: '^la-dee-da',
    };

    test('renders an h4 markdown line with the specified string as text', () => {
      expect(renderMarkdown([entry])).toBe(
        `#### ${entry.h4}
^la-dee-da`
      );
    });
  });
});
