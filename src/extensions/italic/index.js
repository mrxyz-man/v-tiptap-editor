import { Italic as ItalicNative } from '@tiptap/extension-italic';
import { btn } from '@/renders';

export default ItalicNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'formating',

      item: {
        id: 'italic',
        icon: 'mdi-format-italic',
        command: 'toggleItalic',

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
            ...args,
          });
        },
      },

      groupSerializer: (ext) => ext.options.item,
    };
  },
});
