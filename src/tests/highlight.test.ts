import { renderMarkdown } from "../rendering";

describe('given a highlight entry', () => {
  describe('with a string value', () => {
    const highlightEntry: HighlightEntry = {
      highlight: 'Hello, world!',
    };

    test('renders a highlight line with the specified text', () => {
      expect(renderMarkdown([highlightEntry])).toBe(`==${highlightEntry.highlight}==`);
    });
  });
})