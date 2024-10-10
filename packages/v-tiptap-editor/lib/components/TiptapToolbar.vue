<script>
import VToolbar from 'vuetify/lib/components/VToolbar/VToolbar';

export default {
  name: 'TiptapToolbar',
  props: {
    editor: {
      type: Object,
      required: true,
    },
    flat: {
      type: Boolean,
      default: false,
    },
    focusable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      preventHide: false,
    };
  },
  mounted() {
    this.$el.addEventListener('mousedown', this.onMouseDown, { capture: true });
    this.editor.on('blur', this.onBlur);
  },
  destroyed() {
    this.$el.removeEventListener('mousedown', this.onMouseDown, { capture: true });
    this.editor.off('blur', this.onBlur);
  },
  methods: {
    genContent() {
      return this.$createElement(VToolbar, {
        props: {
          flat: this.flat,
          dense: true,
          rounded: true,
          height: 'auto',
          backgroundColor: 'transparent',
        },
      }, [this.$slots.default]);
    },
    onMouseDown() {
      this.preventHide = true;
    },
    onBlur({ event: e, editor }) {
      if (e?.relatedTarget && this.$el.contains(e?.relatedTarget)) {
        if (!this.focusable) editor.commands.focus();
      }
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'v-tiptap-toolbar',
      style: 'user-select: none;',
    }, [this.genContent()]);
  },
};
</script>
