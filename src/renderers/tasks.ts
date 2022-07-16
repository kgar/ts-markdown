import { getMarkdownString } from '../renderMarkdown';

export const tasksRenderer = (
  entry: TaskListEntry,
  options: DataDrivenMarkdownOptions
) => {
  if ('tasks' in entry) {
    return entry.tasks
      .map((taskEntry) => {
        let completed = false;
        let taskText = '';

        if (typeof taskEntry === 'string') {
          taskText = taskEntry;
        } else if ('task' in taskEntry) {
          completed = taskEntry.completed === true;
          let result = getMarkdownString(taskEntry.task, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        } else {
          let result = getMarkdownString(taskEntry, options);
          if (typeof result === 'string') {
            taskText = result;
          } else {
            throw new Error(
              'Unexpected rendering scenario encountered. A task list item cannot have multi-line content.'
            );
          }
        }

        return `- [${completed ? 'x' : ' '}] ${taskText}`;
      })
      .join('\n');
  }

  throw new Error('Entry is not a tasks entry. Unable to render.');
};
