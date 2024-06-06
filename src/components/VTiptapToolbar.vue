<script>
import VToolbar from 'vuetify/lib/components/VToolbar/VToolbar';

export default {
  name: 'v-tiptap-toolbar',
  props: {
    content: {
      type: [Object, Function],
      default: () => ({}),
    },
    editor: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  methods: {
    genContent() {
      return this.$createElement(VToolbar, {
        props: {
          flat: true,
          dense: true,
          rounded: true,
          height: 'auto',
          backgroundColor: 'transparent',
        },
      }, [this.content]);
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'v-tiptap-toolbar',
    }, [this.genContent()]);
  },
};
</script>
