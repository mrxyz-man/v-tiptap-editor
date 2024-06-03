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
      on: {
        focusin: (e) => {
          if (!this.isFocused) {
            this.isFocused = true;
            this.$emit('focus', e);
          }
        },
        mousedown: (e) => {
          e.preventDefault();
          e.stopPropagation();
        },
        click: (e) => {
          this.editor.commands.focus();
          e.preventDefault();
          e.stopPropagation();
        },
      },
      directives: [
        ...this.isFocused ? [{
          name: 'click-outside',
          value: {
            handler: (e) => {
              if (!this.$el.contains(e.target)) {
                this.isFocused = false;
                this.$emit('blur', e);
              }
            },
            include: () => {
              const allIncluded = document.querySelectorAll('.editor-included');
              return Array.prototype.slice.call(allIncluded);
            },
          },
        }] : [],
      ],
    }, [this.genContent()]);
  },
};
</script>
