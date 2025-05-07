import { Link as LinkNative } from '@tiptap/extension-link';
import { btn } from '@/renders';

import LinkToolbar from './LinkToolbar.vue';

const BubbleMenuKey = 'link';

export default LinkNative.extend({
  onCreate({ editor }) {
    const {
      check,
      close,
      linkOff,
      linkEdit,
    } = editor.options.iconPack;

    const linkToolbar = editor.options.$createElement(LinkToolbar, {
      props: {
        editor,
        nodeName: this.name,
        attrKey: 'href',
        saveIcon: check,
        closeIcon: close,
        editIcon: linkEdit,
        resetIcon: linkOff,
      },
      on: {
        'link:close': () => {
          editor
            .chain()
            .hideBubbleMenu({ key: BubbleMenuKey })
            .focus()
            .run();
        },
        'link:save': (val) => {
          editor
            .chain()
            .extendMarkRange('link')
            .setLink({ href: val })
            .focus()
            .run();
        },
        'link:reset': () => {
          editor
            .chain()
            .extendMarkRange('link')
            .unsetLink()
            .hideBubbleMenu({ key: BubbleMenuKey })
            .focus()
            .run();
        },
      },
    });

    editor.commands.createBubbleMenu({
      key: BubbleMenuKey,
      content: () => linkToolbar,
      shouldShow: () => editor.isActive('link'),
    });
  },
  addOptions() {
    return {
      ...this.parent?.(),
      openOnClick: false,

      item: {
        id: 'link',
        name: 'Ссылка',
        command: 'toggleLink',

        get value() {
          return [this.id];
        },

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
          return btn({
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
      },

      groupSerializer: (ext) => ext.options.item,
    };
  },
});
