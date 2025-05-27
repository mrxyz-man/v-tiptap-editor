import { OrderedList as OrderedListNative } from '@tiptap/extension-ordered-list';
import { btn } from '@/renders';

export default OrderedListNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'orderedList',
        command: 'toggleOrderedList',

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
