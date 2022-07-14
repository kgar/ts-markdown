import { renderMarkdown } from '../renderMarkdown';

describe('given an ordered list entry', () => {
  describe('with a string value', () => {
    const olEntry: OrderedListEntry = {
      ol: ['Hello, world!'],
    };

    test('renders an ordered list line with the specified string as text', () => {
      expect(renderMarkdown([olEntry])).toBe(`1. ${olEntry.ol[0]}`);
    });
  });
});
