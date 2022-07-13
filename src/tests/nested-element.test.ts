import { renderMarkdown } from '../renderMarkdown';

describe('nested element tests', () => {
  describe('given bolded, highlighted text', () => {
    const textEntry: TextEntry = {
      text: [{ bold: { highlight: 'Hello, world!' } }],
    };

    test('renders bolded, highlighted line of specified text', () => {
      expect(renderMarkdown([textEntry])).toBe('**==Hello, world!==**');
    });
  });

  // TODO: Test headers with rich text
});
