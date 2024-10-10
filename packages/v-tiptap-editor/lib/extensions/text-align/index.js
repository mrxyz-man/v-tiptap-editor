import { TextAlign as TextAlignNative } from '@tiptap/extension-text-align';
import { btn } from '@/renders';

export default TextAlignNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      types: ['heading', 'paragraph'],

      items: {
        ...[...this.parent?.()?.alignments || []].reduce((acc, pos) => ({
          ...acc,
          [pos]: {
            id: `text-align-${pos}`,
            icon: `mdi-format-align-${pos}`,

            get value() {
              return [{ textAlign: pos }];
            },

            command(ctx, editor) {
              const { value } = ctx;
              const isActive = editor.isActive(...value);

              return isActive ? 'unsetTextAlign' : 'setTextAlign';
            },

            callCommand(editor) {
              const { command } = this;

              editor
                .chain()
                .focus()
                ?.[command(this, editor)](pos)
                .run();
            },

            render(args) {
              return btn({
                item: this,
                props: {
                  minWidth: 'auto',
                },
                options: {
                  class: 'align-self-center',
                },
                ...args,
              });
            },
          },
        }), {}),
      },

      groupSerializer: (ext) => Object.values(ext.options.items),
    };
  },
});
