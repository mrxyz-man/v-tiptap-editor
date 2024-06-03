import ExtensionItalic from '@tiptap/extension-italic';
import renders from '@/renders';

export default {
  module: ExtensionItalic,
  icon: 'mdi-format-italic',
  command: 'toggleItalic',
  get value() {
    return 'italic';
  },
  render(args) {
    return renders.toggle({
      item: this,
      ...args,
    });
  },
};
