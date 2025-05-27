import { BulletList as BulletListNative } from '@tiptap/extension-bullet-list';
import { btn } from '@/renders';

export default BulletListNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'bulletList',
        command: 'toggleBulletList',

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
