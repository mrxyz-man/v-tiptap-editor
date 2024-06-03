import { Underline as UnderlineNative } from '@tiptap/extension-underline';
import renders from '@/renders';

export default UnderlineNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-underline',
      command: 'toggleUnderline',
      value: 'underline',
      group: 'formating',
      editorValue: ['underline'],

      groupSerializer: (ext) => ext.options,

      callCommand(editor) {
        const { command } = this;

        editor
          .chain()
          ?.[command]()
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
