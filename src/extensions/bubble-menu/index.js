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

          onHide(...args) {
            tippyOptions?.onHide?.(...args);
            editor.commands.focus();
          },
        });

        editor.on('selectionUpdate', () => {
          if (shouldShow) {
            if (shouldShow({ editor })) {
              storage.editors[id][key].show();
            }
          }
        });
      },
      showBubbleMenu: ({ key }) => ({ editor }) => {
        const editorElm = editor.options.element;
        const { id } = editorElm;

        const headPosition = editor.view.coordsAtPos(editor.view.state.selection.$head.pos);

        this.storage.editors[id][key].setProps({
          getReferenceClientRect: () => ({
            top: headPosition.top,
            left: headPosition.left,
            width: this.storage.editors[id][key].props.content.clientWidth,
          }),
        });

        this.storage.editors[id][key].show();
      },
    };
  },
});
