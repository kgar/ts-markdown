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

  
});
