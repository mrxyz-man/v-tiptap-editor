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
          on: {
            'link:close': () => {
              editor
                .chain()
                .focus()
                .hideBubbleMenu({ key: BubbleMenuKey })
                .run();
            },
            'link:save': (val) => {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href: val })
                .run();
            },
            'link:reset': () => {
              editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .unsetLink()
                .hideBubbleMenu({ key: BubbleMenuKey })
                .run();
            },
          },
        }),
      }).$mount()
    );

    let component = createComponent();

    editor.commands.createBubbleMenu({
      key: BubbleMenuKey,
      shouldShow: () => editor.isActive('link'),
      tippyOptions: {
        onShow(instance) {
          component = createComponent();
          instance.setContent(component.$el);
          // editor.chain().setHighlight().run();
        },
        onHide(instance) {
          component.$destroy();
          instance.setContent('');
          // editor.chain().unsetHighlight().run();
        },
      },
    });
  },
  addOptions() {
    return {
      ...this.parent?.(),
      group: 'media',

      icon: 'mdi-link-variant',
      name: 'Ссылка',
      value: 'link',
      command: 'toggleLink',
      editorValue: ['link'],
      openOnClick: false,

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
            props: {
              text: true,
              height: 'auto',
              minWidth: 'auto',
              inputValue: editor.isActive('link'),
              disabled: editor.state.selection.empty,
            },
            on: {
              click: () => {
                editor
                  .chain()
                  .focus()
                  .showBubbleMenu({ key: BubbleMenuKey })
                  .run();
              },
            },
          },
        });
      },
    };
  },
});
