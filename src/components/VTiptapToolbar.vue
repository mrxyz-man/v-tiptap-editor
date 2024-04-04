<script>
import VToolbar from 'vuetify/lib/components/VToolbar/VToolbar';

import { genFormatings } from '../extensions/formatings';
import { genHeadings } from '../extensions/headings';

export default {
  name: 'v-tiptap-toolbar',
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    genToolbarSections() {
      const { editor, $createElement } = this;

      const formatings = genFormatings({ editor, $createElement });
      const headings = genHeadings({ editor, $createElement });

      return [
        formatings,
        headings,
      ];
    },
    genContent() {
      return this.$createElement(VToolbar, {
        props: {
          flat: true,
          dense: true,
          rounded: true,
          height: 'auto',
          backgroundColor: 'transparent',
        },
      }, [...this.genToolbarSections()]);
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'v-tiptap-toolbar',
      on: {
        mousedown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
      },
    }, [this.genContent()]);
  },
};
</script>
