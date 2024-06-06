import { Link as LinkNative } from '@tiptap/extension-link';
import renders from '@/renders';

// import AddLink from './AddLink.vue';

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
        $createElement,
      }) {
        return renders.toggle({
          editor,
          item: this,
          $createElement,
          options: {
            on: {
            },
          },
        });
      },
    };
  },
});
