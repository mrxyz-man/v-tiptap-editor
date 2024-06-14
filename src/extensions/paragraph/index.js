import { Paragraph as ParagraphNative } from '@tiptap/extension-paragraph';

export default ParagraphNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'heading',

      item: {
        id: 'paragraph',
        icon: 'mdi-format-paragraph',
        name: 'Обычный',
        command: 'setParagraph',

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
      },

      groupSerializer: (ext) => ext.options.item,
    };
  },
});
