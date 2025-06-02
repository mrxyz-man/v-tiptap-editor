import { TaskList as TaskListNative } from '@tiptap/extension-task-list';
import { btn } from '@/renders';

export default TaskListNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'taskList',
        command: 'toggleTaskList',

        get value() {
          return [this.id];
        },

        callCommand(editor) {
          const { command } = this;

          editor
            .chain()
            ?.[command]()
            .run();
        },

        render(args) {
          return btn({
            item: this,
            ...args,
          });
        },
      },

      groupSerializer: (ext) => ext.options.item,
    };
  },
});
