import { Placeholder as PlaceholderNative } from '@tiptap/extension-placeholder';

export default PlaceholderNative.extend({
  addOptions() {
    return {
      ...this.parent?.(),

      placeholder: '',
    };
  },

  addCommands() {
    return {
      ...this.parent?.(),

      setPlaceholder: (val) => () => {
        if (typeof val !== 'string') {
          this.options.placeholder = '';
          return;
        }

        this.options.placeholder = val;
      },
    };
  },
});
