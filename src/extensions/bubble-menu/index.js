import tippy from 'tippy.js';
import { Extension } from '@tiptap/core';

export default Extension.create({
  addStorage() {
    return {
      editors: {},
    };
  },

  addCommands() {
    return {
      createBubbleMenu: ({ key, shouldShow, tippyOptions }) => ({ editor }) => {
        const editorElm = editor.options.element;
        const { id } = editorElm;
        const { storage } = this;

        if (!storage.editors[id]) {
          storage.editors[id] = {};
        }

        storage.editors[id][key] = tippy(editorElm, {
          ...tippyOptions,
          allowHTML: true,
          interactive: true,
          trigger: 'manual',
          appendTo: editorElm.closest('.v-tiptap-editor'),

          onClickOutside() {
            editor.chain().focus().blur().run();
          },

          onMount(instance) {
            const headPosition = editor.view.coordsAtPos(editor.view.state.selection.$head.pos);

            // if (shouldShow?.({ editor })) {
            //   const { node } = editor.view.domAtPos(editor.view.state.selection.$head.pos);
            //   const { posAtStart, posAtEnd } = node.parentNode.pmViewDesc;
            //   const activePosition = editor.view.coordsAtPos(
            //     posAtStart + (posAtEnd - posAtStart),
            //   );

            //   instance.setProps({
            //     getReferenceClientRect: () => ({
            //       top: activePosition.top,
            //       left: activePosition.left - (this.content.clientWidth / 2),
            //       width: this.content.clientWidth,
            //     }),
            //   });
            //   return;
            // }

            instance.setProps({
              getReferenceClientRect: () => ({
                top: headPosition.top,
                left: headPosition.left - (this.content.clientWidth / 2),
                width: this.content.clientWidth,
              }),
            });
          },
        });

        editor.on('selectionUpdate', () => {
          if (shouldShow?.({ editor })) {
            storage.editors[id][key].show();
          }
        });
      },
      showBubbleMenu: ({ key }) => ({ editor }) => {
        const editorElm = editor.options.element;
        const { id } = editorElm;

        this.storage.editors[id][key].show();
      },
      hideBubbleMenu: ({ key }) => ({ editor }) => {
        const editorElm = editor.options.element;
        const { id } = editorElm;

        this.storage.editors[id][key].hide();
      },
    };
  },
});
