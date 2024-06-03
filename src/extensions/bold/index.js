import { Bold as BoldNative } from '@tiptap/extension-bold';
import renders from '@/renders';

export default BoldNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-bold',
      command: 'toggleBold',
      value: 'bold',
      group: 'formating',
      editorValue: ['bold'],

      groupSerializer: (ext) => ext.options,

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
          ...args,
        });
      },
    };
  },
});
