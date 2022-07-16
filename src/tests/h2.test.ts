import { renderMarkdown } from '../rendering';

describe('given a header 2 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h2: 'Hello, world!',
      },
    ];

    test('renders an h2 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`## ${data[0]['h2']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H2Entry = {
      h2: 'Test',
      id: 'test-id',
    };

    test('renders an h2 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `## ${headerEntry.h2} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h2Entry: H2Entry = {
      h2: {
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

    test('renders h2 with rich text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h2Entry: H2Entry = {
      h2: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h2 with rich text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h2Entry: H2Entry = {
      h2: {
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

    test('renders h2 with link and image', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        '## The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with underline set to true', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with hyphen underline character length of header text', () => {
      expect(renderMarkdown([h2Entry])).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at document-level', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h2Entry], { useH2Underlining: true })).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at local-level and false at the document level', () => {
    const h2Entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h2Entry], { useH2Underlining: false })).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });
});
