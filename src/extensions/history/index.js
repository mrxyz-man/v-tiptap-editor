import { History as HistoryNative } from '@tiptap/extension-history';
import { btn } from '@/renders';

export default HistoryNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-history',

      groupSerializer: (ext) => ext.options.items,

      items: [
        {
          id: 'undo',
          icon: 'mdi-undo',
          command: 'undo',

          get value() {
            return [this.id];
          },

          callCommand(editor) {
            const { command } = this;

            editor
              .chain()
              ?.[command]()
              .focus()
              .run();
          },

          render(args) {
            return btn({
              item: this,
              props: {
                minWidth: 'auto',
                disabled: !args.editor.can()[this.command](),
              },
              options: {
                class: 'align-self-center',
              },
              ...args,
            });
          },
        },
        {
          id: 'redo',
          icon: 'mdi-redo',
          command: 'redo',

          get value() {
            return [this.id];
          },

          callCommand(editor) {
            const { command } = this;

            editor
              .chain()
              ?.[command]()
              .focus()
              .run();
          },

          render(args) {
            return btn({
              item: this,
              props: {
                minWidth: 'auto',
                disabled: !args.editor.can()[this.command](),
              },
              options: {
                class: 'align-self-center',
              },
              ...args,
            });
          },
        },
      ],
    };
  },
});
