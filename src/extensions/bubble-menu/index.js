import { set } from 'vue';
import { Extension } from '@tiptap/core';

export default Extension.create({
  name: 'bubbleMenu',

  addCommands() {
    return {
      createBubbleMenu: ({
        key,
        shouldShow,
        content,
        options,
      }) => ({ editor }) => {
        editor.setOptions({
          bubbleMenus: {
            ...editor.options.bubbleMenus,
            [key]: {
              options,
              content,
              positions: {},
              bufferState: false,
              bufferPriority: null,

              get priority() {
                return this.bufferPriority;
              },
              set priority(val) {
                this.bufferPriority = val;
              },

              get state() {
                return this.bufferState;
              },
              set state(val) {
                this.bufferState = val;
              },
            },
          },
        });

        editor.on('selectionUpdate', ({ editor: e }) => {
          const { from, to } = e.state.selection;

          if (shouldShow?.({ editor: e })) {
            editor.commands.updateBubbleMenu({
              key,
              state: true,
              positions: {
                from, to,
              },
            });
            return;
          }

          editor.commands.hideBubbleMenu({ key });
        });
      },
      updateBubbleMenu: ({ key, state, positions }) => ({ editor }) => {
        const bubbleMenus = { ...editor.options.bubbleMenus };
        const activeMenus = Object.values(bubbleMenus).filter((i) => i.state);
        const priority = state && activeMenus.length ? activeMenus.length : null;

        set(bubbleMenus, key, {
          ...bubbleMenus[key],
          positions,
          priority,
          state,
        });

        editor.setOptions({ bubbleMenus });
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
