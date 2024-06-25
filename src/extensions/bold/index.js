import { Bold as BoldNative } from '@tiptap/extension-bold';
import { btn } from '@/renders';

export default BoldNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'bold',
        icon: 'mdi-format-bold',
        command: 'toggleBold',

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
