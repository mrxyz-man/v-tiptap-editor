import { Link as LinkNative } from '@tiptap/extension-link';
import renders from '@/renders';

import AddLink from './AddLink.vue';

export default LinkNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'formating',

      icon: 'mdi-link-variant',
      name: 'Ссылка',
      value: 'link',
      command: 'toggleLink',
      editorValue: ['link'],

      groupSerializer: (ext) => ext.options,

      callCommand(editor) {
        const { command } = this;

        editor
          .chain()
          ?.[command]()
          .focus()
          .run();
      },

      render({
        editor,
        balloon,
        genToolbar,
        $createElement,
      }) {
        return renders.toggle({
          editor,
          item: this,
          $createElement,
          options: {
            on: {
              click: () => {
                balloon.set({
                  id: '2',
                  ...balloon.props,
                  editor,
                  content: genToolbar({
                    props: {
                      editor,
                      content: $createElement(AddLink, {
                        on: {
                          close: () => {
                            balloon.reset();
                            editor.commands.focus();
                          },
                        },
                      }),
                    },
                  }),
                });
              },
            },
          },
        });
      },
    };
  },
});
