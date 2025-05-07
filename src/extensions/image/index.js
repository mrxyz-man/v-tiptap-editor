// import { Plugin, PluginKey } from '@tiptap/pm/state';
import { Image as ImageNative } from '@tiptap/extension-image';
import { VueNodeViewRenderer } from '@tiptap/vue-2';

import LinkToolbar from '../link/LinkToolbar.vue';
import ContextMenu from './ContextMenu.vue';
import VTiptapImage from './VTiptapImage.vue';
import ImageToolbar from './ImageToolbar.vue';

const ImageBubbleMenuKey = 'image';
const AddURLBubbleMenuKey = 'image-add-url';

export default ImageNative.extend({
  onCreate({ editor }) {
    const linkToolbar = editor.options.$createElement(LinkToolbar, {
      props: {
        editor,
        nodeName: this.name,
        attrKey: 'src',
      },
      on: {
        'link:close': () => {
          editor
            .chain()
            .hideBubbleMenu({ key: AddURLBubbleMenuKey })
            .focus()
            .run();
        },
        'link:save': (val) => {
          editor
            .chain()
            .setImage({ src: val })
            .hideBubbleMenu({ key: AddURLBubbleMenuKey })
            .focus()
            .run();
        },
      },
    });

    const imageToolbar = editor.options.$createElement(ImageToolbar, {
      props: {
        editor,
      },
    });

    editor.commands.createBubbleMenu({
      key: AddURLBubbleMenuKey,
      content: () => linkToolbar,
      shouldShow: () => false,
    });

    editor.commands.createBubbleMenu({
      key: ImageBubbleMenuKey,
      content: () => imageToolbar,
      shouldShow: () => (
        editor.isActive('image')
        && editor.isFocused
      ),
    });
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      contain: false,
    };
  },

  addOptions() {
    return {
      ...this.parent?.(),

      item: {
        id: 'image',
        aliasIcon: 'imageAdd',
        command: 'setImage',

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

        render({ $createElement, editor }) {
          const { imageAdd } = editor.options.iconPack;

          return $createElement(ContextMenu, {
            props: {
              editor,
              iconOptions: {
                content: imageAdd,
              },
            },
            on: {
              'click:add-link': () => {
                editor
                  .chain()
                  .focus()
                  .showBubbleMenu({ key: AddURLBubbleMenuKey })
                  .run();
              },
            },
          });
        },
      },

      groupSerializer: (ext) => ext.options.item,
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),

      toggleImageContain: () => ({ editor, tr }) => {
        const { state } = editor;
        const { selection } = state;
        const { from } = selection;
        const node = state.doc.nodeAt(from);

        tr.setNodeMarkup(from, undefined, {
          ...node.attrs,
          contain: !node.attrs.contain,
        });

        return true;
      },
    };
  },

  // addProseMirrorPlugins() {
  //   return [
  //     new Plugin({
  //       key: new PluginKey('image'),
  //       props: {
  //         decorations: ({ doc, selection }) => {
  //           doc.descendants((node, pos) => {
  //             if (node.type.name === this.name) {
  //               const desc = this.editor.view.docView.descAt(pos);

  //               if (
  //                 selection.from <= pos
  //                 && selection.to >= pos
  //                 && !selection.empty
  //                 && desc
  //               ) {
  //                 desc.selectNode();
  //                 return;
  //               }

  //               if (desc) desc.deselectNode();
  //             }
  //           });
  //         },
  //       },
  //     }),
  //   ];
  // },

  addNodeView() {
    return VueNodeViewRenderer(VTiptapImage);
  },
});
