import { renderMarkdown } from '../rendering';

describe('given a task list entry', () => {
  describe('with every type of modeled task and some rich text', () => {
    const taskListEntry: TaskListEntry = {
      tasks: [
        'Test 1',
        { task: 'Test 2' },
        { task: 'Test 3', completed: false },
        { task: 'Test 4', completed: true },
        { bold: { italic: 'Get it done' } },
        { task: { bold: { italic: 'Got it done' } }, completed: true },
      ],
    };

    test('renders a correctly configured task list', () => {
      expect(renderMarkdown([taskListEntry])).toBe(
        `- [ ] Test 1
- [ ] Test 2
- [ ] Test 3
- [x] Test 4
- [ ] ***Get it done***
- [x] ***Got it done***`
      );
    });
  });
});
