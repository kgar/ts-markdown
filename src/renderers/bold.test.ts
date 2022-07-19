import { renderMarkdown } from '../rendering';

describe('given a bold entry', () => {
  describe('with a string value', () => {
    const boldEntry: BoldEntry = {
      bold: 'Hello, world!',
    };

    test('renders a bolded markdown line with the specified string as text', () => {
      expect(renderMarkdown([boldEntry])).toBe(`**${boldEntry.bold}**`);
    });
  });

  describe('with an underscore indicator', () => {
    const boldEntry: BoldEntry = {
      bold: 'test',
      indicator: '_',
    };

    test('renders a bolded markdown line indicated with an underscore', () => {
      expect(renderMarkdown([boldEntry])).toBe(`__test__`);
    });
  });
});
