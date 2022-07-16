import { renderMarkdown } from "../rendering";

describe('given a header 1 entry', () => {
  describe('with a string value', () => {
    const data: DataDrivenMarkdownEntry[] = [
      {
        h1: 'Hello, world!',
      },
    ];

    test('renders an h1 markdown line with the specified string as text', () => {
      expect(renderMarkdown(data)).toBe(`# ${data[0]['h1']}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H1Entry = {
      h1: 'Test',
      id: 'test-id',
    };

    test('renders an h1 with the specified text and id', () => {
      expect(renderMarkdown([headerEntry])).toBe(
        `# ${headerEntry.h1} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const h1Entry: H1Entry = {
      h1: {
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

    test('renders h1 with rich text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# ==Totally== ***awesome*** ~~d00d~~'
      );
    });
  });

  describe('with rich text', () => {
    const h1Entry: H1Entry = {
      h1: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h1 with rich text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# ***==PER MY PREVIOUS EMAIL==***'
      );
    });
  });

  describe('with link and image', () => {
    const h1Entry: H1Entry = {
      h1: {
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

    test('renders h1 with link and image', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        '# The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with underline set to true locally', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry])).toBe(
        `This is my totally cool header
==============================`
      );
    });
  });

  describe('with underline set to true at document-level', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry], { useH1Underlining: true })).toBe(
        `This is my totally cool header
==============================`
      );
    });
  });

  describe('with underline set to true at local-level and false at the document level', () => {
    const h1Entry: H1Entry = {
      h1: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(renderMarkdown([h1Entry], { useH1Underlining: false })).toBe(
        `This is my totally cool header
==============================`
      );
    });
  });
});
