import { Italic as ItalicNative } from '@tiptap/extension-italic';
import renders from '@/renders';

export default ItalicNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-italic',
      command: 'toggleItalic',
      value: 'italic',
      group: 'formating',
      editorValue: ['italic'],

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
