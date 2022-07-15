import { renderMarkdown } from '../renderMarkdown';

describe('given a header 5 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h5: 'Hello, world!',
      },
    ];

    test('renders an h5 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`##### ${data[0]['h5']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H5Entry = {
      h5: 'Test',
      id: 'test-id',
    };

    test('renders an h5 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `##### ${headerEntry.h5} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h5Entry: H5Entry = {
      h5: {
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

    test('renders h5 with rich text', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h5Entry: H5Entry = {
      h5: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h5 with rich text', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h5Entry: H5Entry = {
      h5: {
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

    test('renders h5 with link and image', () => {
      expect(renderMarkdown([h5Entry])).toBe(
        '##### The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });
});
