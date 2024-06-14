import { Heading as HeadingNative } from '@tiptap/extension-heading';

export default HeadingNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-header-pound',
      group: 'heading',

      items: [
        ...[...this.parent?.()?.levels || []].map((level) => ({
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
        })),
      ],

      groupSerializer: (ext) => ext.options.items,
    };
  },
});
