<script>
import VToolbar from 'vuetify/lib/components/VToolbar/VToolbar';

export default {
  name: 'v-tiptap-toolbar',
  props: {
    editor: {
      type: Object,
      required: true,
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
          flat: true,
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
    onBlur({ event }) {
      if (this.preventHide) {
        // this.editor.commands.focus();
        this.preventHide = false;
        return;
      }

      if (event?.relatedTarget && this.$el.parentNode?.contains(event.relatedTarget)) {
        // this.editor.commands.focus();
        return;
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
