import { Extension } from '@tiptap/core';

const BubbleMenuProps = {
  shouldShow: null,
};

export default Extension.create({
  name: 'bubbleMenu',

  addStorage() {
    return {
      menus: {},
    };
  },

  addCommands() {
    return {
      setBubbleMenu: ({ key, content, props }) => ({ editor }) => {
        const { id } = editor.options.element;
        const extraProps = {
          ...BubbleMenuProps,
          ...props,
        };

        if (!this.storage.menus[id]) {
          this.storage.menus[id] = {};
        }

        this.storage.menus[id][key] = {
          state: false,
          content,
          props: {
            ...extraProps,
            editor,
            pluginKey: `bubbleMenu${key}`,
          },
        };
      },

      showBubbleMenu: ({ key }) => ({ editor }) => {
        const { id } = editor.options.element;

        this.storage.menus[id][key] = {
          ...this.storage.menus[id][key],
          state: true,
        };
      },
    };
  },
});
