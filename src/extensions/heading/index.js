import { Heading as HeadingNative } from '@tiptap/extension-heading';
// import renders from '@/renders';

export default HeadingNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      icon: 'mdi-format-header-pound',
      group: 'heading',

      groupSerializer: (ext) => ext.options.items,

      items: [
        ...[...this.parent?.()?.levels || []].map((level) => ({
          icon: `mdi-format-header-${level}`,
          name: `Заголовок ${level}`,
          value: `heading-${level}`,
          command: 'toggleHeading',
          editorValue: ['heading', { level }],

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

      // render(args) {
      // },
    };
  },
});
