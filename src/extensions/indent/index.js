import { Node, mergeAttributes } from '@tiptap/core';

export default Node.create({
  name: 'indent',

  group: 'inline',

  inline: true,

  selectable: false,

  atom: true,

  parseHTML() {
    return [
      {
        tag: `span[data-type="${this.name}"]`,
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    const tab = document.createElement('span');
    tab.innerHTML = '&emsp;';
    return ['span', mergeAttributes({ 'data-type': this.name }, HTMLAttributes), tab];
  },

  addCommands() {
    return {
      indent: () => ({ commands }) => (
        commands.insertContent({ type: this.name })
      ),
    };
  },

  addKeyboardShortcuts() {
    return {
      Tab: () => this.editor.commands.indent(),
    };
  },
});
