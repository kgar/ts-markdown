import { renderMarkdown } from '../renderMarkdown';

describe('given a horizontal rule entry', () => {
  describe('with any value', () => {
    const hrEntry: HorizontalRuleEntry = {
      hr: '',
    };

    test('renders a horizontal rule', () => {
      expect(renderMarkdown([hrEntry])).toBe(`---`);
    });
  });
});
