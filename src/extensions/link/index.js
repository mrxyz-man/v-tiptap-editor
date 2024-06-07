import Vue from 'vue';
import { Link as LinkNative } from '@tiptap/extension-link';
import renders from '@/renders';

import vuetify from '@/plugins/vuetify';
import LinkToolbar from './LinkToolbar.vue';

const BubbleMenuKey = 'link';

export default LinkNative.extend({
  onCreate({ editor }) {
    const createComponent = () => (
      new Vue({
        vuetify,
        render: (h) => h(LinkToolbar, {
          props: {
            editor,
          },
        }),
      }).$mount()
    );

    let component = createComponent();

    editor.commands.createBubbleMenu({
      key: BubbleMenuKey,
      shouldShow: () => editor.isActive('link'),
      tippyOptions: {
        content: component.$el,
        onShow() {
          component = createComponent();
        },
        onHide() {
          editor.commands.unsetHighlight();
          component.$destroy();
        },
      },
    });
  },
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
              click: () => {
                editor.commands.showBubbleMenu({ key: 'link' });
                editor.commands.setHighlight();
              },
            },
          },
        });
      },
    };
  },
});
