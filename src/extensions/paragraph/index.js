import { mergeAttributes } from '@tiptap/core';
import { Paragraph as ParagraphNative } from '@tiptap/extension-paragraph';

export default ParagraphNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

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

  renderHTML({ HTMLAttributes }) {
    return [
      'p',
      mergeAttributes(
        {
          style: 'padding-top: .2em; margin-bottom: .8em',
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      0,
    ];
  },
});
