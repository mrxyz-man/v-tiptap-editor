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

          onMount(instance) {
            const headPosition = editor.view.coordsAtPos(editor.view.state.selection.$head.pos);

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
