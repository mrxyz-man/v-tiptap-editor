import { Paragraph as ParagraphNative } from '@tiptap/extension-paragraph';

export default ParagraphNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'heading',

      icon: 'mdi-format-paragraph',
      name: 'Обычный',
      value: 'paragraph',
      command: 'setParagraph',
      editorValue: ['paragraph'],

      groupSerializer: (ext) => ext.options,

      callCommand(editor) {
        const { command } = this;

        editor
          .chain()
          ?.[command]()
          .run();
      },

      // render(args) {
      // },
    };
  },
});
