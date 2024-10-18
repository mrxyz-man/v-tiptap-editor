import { VueNodeViewRenderer } from '@tiptap/vue-2';
import Mention from '@tiptap/extension-mention';
import VTiptapMention from './VTiptapMention.vue';
import MentionToolbar from './MentionToolbar.vue';

const BubbleMenuKey = 'mention';

export default Mention.extend({
  selectable: true,

  addOptions() {
    return {
      ...this.parent?.(),

      suggestion: {
        ...this.parent?.().suggestion,

        itemValue: 'id',
        itemText: 'label',

        render() {
          return {
            onStart: ({ editor }) => {
              editor.chain().showBubbleMenu({ key: BubbleMenuKey });
            },
            onExit({ editor }) {
              editor.commands.hideBubbleMenu({ key: BubbleMenuKey });
            },
          };
        },
      },
    };
  },

  onCreate({ editor }) {
    const { options } = this;
    const Toolbar = editor.options.$createElement(MentionToolbar, {
      props: {
        editor,
        items: options.suggestion.items(),
        itemText: options.suggestion.itemText,
        itemValue: options.suggestion.itemValue,
        command: (item) => {
          const { from, to } = editor.view.state.selection;
          const { length } = options.suggestion.char;
          const range = {
            to,
            from: from === to ? (from - length) : from,
          };
          options.suggestion.command({
            editor, range, props: item,
          });
          editor.commands.hideBubbleMenu({ key: BubbleMenuKey });
        },
      },
    });

    editor.commands.createBubbleMenu({
      key: BubbleMenuKey,
      content: () => Toolbar,
      options: { placement: 'bottom' },
      shouldShow: () => editor.isActive('mention'),
    });
  },

  addNodeView() {
    return VueNodeViewRenderer(VTiptapMention);
  },
});
