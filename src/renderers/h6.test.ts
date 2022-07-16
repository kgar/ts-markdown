import { renderMarkdown } from '../rendering';

describe('given a header 6 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h6: 'Hello, world!',
      },
    ];

    test('renders an h6 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`###### ${data[0]['h6']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H6Entry = {
      h6: 'Test',
      id: 'test-id',
    };

    test('renders an h6 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `###### ${headerEntry.h6} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h6Entry: H6Entry = {
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
      expect(renderMarkdown([h6Entry])).toBe(
        '###### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h6Entry: H6Entry = {
      h6: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h6 with rich text', () => {
      expect(renderMarkdown([h6Entry])).toBe(
        '###### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h6Entry: H6Entry = {
      h6: {
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

    test('renders h6 with link and image', () => {
      expect(renderMarkdown([h6Entry])).toBe(
        '###### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });
});
