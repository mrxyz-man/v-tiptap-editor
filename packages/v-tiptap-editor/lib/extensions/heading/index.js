import { mergeAttributes } from '@tiptap/core';
import { Heading as HeadingNative } from '@tiptap/extension-heading';

export default HeadingNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-header-pound',

      items: {
        ...[...this.parent?.()?.levels || []].reduce((acc, level) => ({
          ...acc,
          [`h${level}`]: {
            id: `heading-${level}`,
            name: `Заголовок ${level}`,
            icon: `mdi-format-header-${level}`,
            command: 'toggleHeading',

            get value() {
              return ['heading', { level }];
            },

            callCommand(editor) {
              const { command } = this;

              editor
                .chain()
                ?.[command]({ level })
                .focus()
                .run();
            },
          },
        }), {}),
      },

      groupSerializer: (ext) => Object.values(ext.options.items),
    };
  },

  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel
      ? node.attrs.level
      : this.options.levels[0];

    return [
      `h${level}`,
      mergeAttributes(
        {
          class: `text-h${level}`,
          style: 'padding-top: .4em; margin-bottom: .4em',
        },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      0,
    ];
  },
});
