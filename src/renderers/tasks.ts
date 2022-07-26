import { getMarkdownString } from '../rendering';
import { MarkdownRenderer, RenderOptions } from '../rendering.types';
import { InlineTypes, MarkdownEntry } from '../shared.types';

/**
 * A markdown entry for generating task lists.
 */
export interface TaskListEntry extends MarkdownEntry {
  /**
   * The task list entries and identifying property for the renderer.
   */
  tasks: (InlineTypes | TaskEntry)[];

  /**
   * Option which will arbitrarily append a string immediately below the task list, ignoring block-level settings.
   */
  append?: string;
}

/**
 * A task in the task list.
 */
export type TaskEntry = {
  /**
   * Inline content for the current task.
   */
  task: InlineTypes;

  /**
   * Indicator of whether the task has been completed or not.
   * Default: false
   */
  completed?: boolean;
};

/**
 * The renderer for task list entries.
 *
 * @param entry The task list entry.
 * @param options Document-level render options.
 * @returns Block-level task list markdown content.
 */
export const tasksRenderer: MarkdownRenderer = (
  entry: TaskListEntry,
  options: RenderOptions
) => {
  if ('tasks' in entry) {
    return {
      markdown: getTasksMarkdown(entry, options),
      blockLevel: true,
    };
  }

  throw new Error('Entry is not a tasks entry. Unable to render.');
};

function getTasksMarkdown(entry: TaskListEntry, options: RenderOptions) {
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

/**
 * Helper which creates a task list entry.
 *
 * @param options Entry-level options for this element.
 * @returns a task list entry
 */
export function tasks(
  content: TaskListEntry['tasks'],
  options?: Omit<TaskListEntry, 'tasks'>
): TaskListEntry {
  return {
    tasks: content,
    ...options,
  };
}
