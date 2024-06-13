import { History as HistoryNative } from '@tiptap/extension-history';
import renders from '@/renders';

export default HistoryNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-history',
      group: 'history',

      groupSerializer: (ext) => ext.options.items,

      items: [
        {
          icon: 'mdi-undo',
          command: 'undo',
          value: 'undo',
          editorValue: ['undo'],

          callCommand(editor) {
            const { command } = this;

            editor
              .chain()
              ?.[command]()
              .focus()
              .run();
          },

          render(args) {
            return renders.toggle({
              item: this,
              props: {
                height: 'auto',
                minWidth: 'auto',
                disabled: !args.editor.can()[this.command](),
              },
              ...args,
            });
          },
        },
        {
          icon: 'mdi-redo',
          command: 'redo',
          value: 'redo',
          editorValue: ['redo'],

          callCommand(editor) {
            const { command } = this;

            editor
              .chain()
              ?.[command]()
              .focus()
              .run();
          },

          render(args) {
            return renders.toggle({
              item: this,
              props: {
                height: 'auto',
                minWidth: 'auto',
                disabled: !args.editor.can()[this.command](),
              },
              ...args,
            });
          },
        },
      ],
    };
  },
});
