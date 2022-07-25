import { tsMarkdown } from '../rendering';
import { H2Entry } from './h2';

describe('given a header 2 entry', () => {
  describe('with a string value', () => {
    const entry = {
      h2: 'Hello, world!',
    };

    test('renders an h2 markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(`## ${entry.h2}`);
    });
  });

  describe('with an id', () => {
    const headerEntry: H2Entry = {
      h2: 'Test',
      id: 'test-id',
    };

    test('renders an h2 with the specified text and id', () => {
      expect(tsMarkdown([headerEntry])).toBe(
        `## ${headerEntry.h2} {#${headerEntry.id}}`
      );
    });
  });

  describe('with a text entry containing rich text', () => {
    const entry: H2Entry = {
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
      expect(tsMarkdown([entry])).toBe('## ==Totally== ***awesome*** ~~d00d~~');
    });
  });

  describe('with rich text', () => {
    const entry: H2Entry = {
      h2: { bold: { italic: { highlight: 'PER MY PREVIOUS EMAIL' } } },
    };

    test('renders h2 with rich text', () => {
      expect(tsMarkdown([entry])).toBe('## ***==PER MY PREVIOUS EMAIL==***');
    });
  });

  describe('with link and image', () => {
    const entry: H2Entry = {
      h2: {
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

    test('renders h2 with link and image', () => {
      expect(tsMarkdown([entry])).toBe(
        '## The magnificent power of [Googling Placeholders](https://www.google.com) like ![A 25x25 placeholder image](https://via.placeholder.com/25 "Here is a handy placeholder image")'
      );
    });
  });

  describe('with underline set to true', () => {
    const entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with hyphen underline character length of header text', () => {
      expect(tsMarkdown([entry])).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at document-level', () => {
    const entry: H2Entry = {
      h2: 'This is my totally cool header',
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(tsMarkdown([entry], { useH2Underlining: true })).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with underline set to true at local-level and false at the document level', () => {
    const entry: H2Entry = {
      h2: 'This is my totally cool header',
      underline: true,
    };

    test('renders header without prefixed hashtag and with equal-sign underline character length of header text', () => {
      expect(tsMarkdown([entry], { useH2Underlining: false })).toBe(
        `This is my totally cool header
------------------------------`
      );
    });
  });

  describe('with a string value and appended with an Obsidianesque identifier', () => {
    const entry: H2Entry = {
      h2: 'Hello, world!',
      append: '^la-dee-da',
    };

    test('renders an h2 markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(
        `## ${entry.h2}
^la-dee-da`
      );
    });
  });
});
