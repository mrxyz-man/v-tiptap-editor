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
    const Toolbar = editor.options.$createElement(MentionToolbar, {
      props: {
        editor,
        nodeName: this.name,
        attrKey: 'data-id',
        items: this.options.suggestion.items(),
        command: (props) => {
          const { from, to } = editor.view.state.selection;
          const { length } = this.options.suggestion.char;
          const range = {
            to,
            from: from === to ? (from - length) : from,
          };
          this.options.suggestion.command({
            editor, range, props,
          });
          editor.commands.hideBubbleMenu({ key: BubbleMenuKey });
        },
      },
    });

    editor.commands.createBubbleMenu({
      key: BubbleMenuKey,
      content: Toolbar,
      options: { placement: 'bottom' },
      shouldShow: () => editor.isActive('mention'),
    });
  },

  addNodeView() {
    return VueNodeViewRenderer(VTiptapMention);
  },

});
