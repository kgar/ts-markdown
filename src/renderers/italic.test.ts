import { tsMarkdown } from '../rendering';
import { ItalicEntry } from './italic';

describe('given an italic entry', () => {
  describe('with a string value', () => {
    const entry: ItalicEntry = {
      italic: 'Hello, world!',
    };

    test('renders a italicized markdown line with the specified string as text', () => {
      expect(tsMarkdown([entry])).toBe(`*${entry.italic}*`);
    });
  });

  describe('with an underscore indicator', () => {
    const italicEntry: ItalicEntry = {
      italic: 'test',
      indicator: '_',
    };

    test('renders an italic markdown line indicated with an underscore', () => {
      expect(tsMarkdown([italicEntry])).toBe(`_test_`);
    });
  });

  describe('with a document-level underscore indicator', () => {
    const italicEntry: ItalicEntry = {
      italic: 'test',
    };

    test('renders a bolded markdown line indicated with an underscore', () => {
      expect(tsMarkdown([italicEntry], { italicIndicator: '_' })).toBe(
        `_test_`
      );
    });
  });

  describe('with a document-level underscore indicator and local asterisk indicator', () => {
    const italicEntry: ItalicEntry = {
      italic: 'test',
      indicator: '*',
    };

    test('favors local indicator', () => {
      expect(tsMarkdown([italicEntry], { italicIndicator: '_' })).toBe(
        `*test*`
      );
    });
  });
});
