import { Underline as UnderlineNative } from '@tiptap/extension-underline';
import { btn } from '@/renders';

export default UnderlineNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'underline',
        command: 'toggleUnderline',

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
