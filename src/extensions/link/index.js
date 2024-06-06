import { Link as LinkNative } from '@tiptap/extension-link';
import VTiptapToolbar from '@/components/VTiptapToolbar.vue';
import renders from '@/renders';

import AddLink from './AddLink.vue';

export default LinkNative.extend({
  onCreate({ editor }) {
    const { $createElement } = editor.options;

    editor.commands.setBubbleMenu({
      key: 'Link',
      content: () => $createElement(VTiptapToolbar, {
        props: {
          editor,
          content: $createElement(AddLink),
        },
      }),
      props: {
        shouldShow: () => {
          const { id } = editor.options.element;
          return editor.storage.bubbleMenu.menus[id]['Link'].state;
        },
      },
    });
  },
  onSelectionUpdate() {
    // this.editor.options.toggleBubbleState(false);
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

      // testHook({
      //   editor,
      //   headPosition,
      //   $createElement,
      // }) {
      //   if (editor.isActive('link')) {
      //     // editor.commands.setHighlight();

      //     balloon.set({
      //       id: editor.getAttributes('link').href,
      //       ...balloon.props,
      //       props: {
      //         positionY: headPosition.top,
      //         positionX: headPosition.left,
      //         value: true,
      //       },
      //       editor,
      //       content: genToolbar({
      //         props: {
      //           editor,
      //           content: $createElement(AddLink, {
      //             attrs: {
      //               value: editor.getAttributes('link').href,
      //             },
      //             on: {
      //               close: () => {
      //                 balloon.reset();
      //                 editor.commands.focus();
      //                 editor.commands.unsetHighlight();
      //               },
      //               save: (url) => {
      //                 balloon.reset();
      //                 editor.commands.focus();
      //                 editor.commands.unsetHighlight();
      //                 editor.commands.setLink({ href: url });
      //               },
      //             },
      //           }),
      //         },
      //       }),
      //     });
      //   }
      // },

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
                editor.commands.showBubbleMenu({ key: 'Link' });
                // editor.commands.setHighlight();
                // balloon.set({
                //   id: '2',
                //   ...balloon.props,
                //   editor,
                //   content: genToolbar({
                //     props: {
                //       editor,
                //       content: $createElement(AddLink, {
                //         on: {
                //           close: () => {
                //             balloon.reset();
                //             editor.commands.focus();
                //             editor.commands.unsetHighlight();
                //           },
                //           save: (url) => {
                //             balloon.reset();
                //             editor.commands.focus();
                //             editor.commands.unsetHighlight();
                //             editor.commands.setLink({ href: url });
                //           },
                //         },
                //       }),
                //     },
                //   }),
                // });
              },
            },
          },
        });
      },
    };
  },
});
