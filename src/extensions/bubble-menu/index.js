import { Extension } from '@tiptap/core';

export default Extension.create({
  name: 'bubbleMenu',

  addStorage() {
    return {
      editors: {},
    };
  },

  addCommands() {
    return {
      createBubbleMenu: ({ key, shouldShow, content }) => ({ editor }) => {
        const { element } = editor.options;
        const { id } = element;
        const { storage } = this;

        if (!storage.editors[id]) {
          storage.editors[id] = {};
        }

        storage.editors[id][key] = {
          content,
          state: false,
          show() {
            this.state = true;
          },
          hide() {
            this.state = false;
          },
        };

        editor.on('selectionUpdate', () => {
          const menu = storage.editors[id][key];

          if (shouldShow?.({ editor })) menu.show();
        });
      },
      updateBubbleMenu: ({ key, state }) => ({ editor }) => {
        const { element } = editor.options;
        const { id } = element;

        this.storage.editors[id][key] = {
          ...this.storage.editors[id][key],
          state,
        };
      },
      showBubbleMenu: ({ key }) => ({ editor }) => {
        editor.commands.updateBubbleMenu({ key, state: true });
      },
      hideBubbleMenu: ({ key }) => ({ editor }) => {
        editor.commands.updateBubbleMenu({ key, state: false });
      },
    };
  },
});
