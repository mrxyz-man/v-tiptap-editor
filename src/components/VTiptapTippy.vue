<script>
import tippy from 'tippy.js';

export default {
  props: {
    editor: {
      type: Object,
      required: true,
    },
    state: {
      type: Boolean,
      default: false,
    },
    content: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      tippy: null,
    };
  },
  mounted() {
    const { editor } = this;

    this.tippy = tippy(
      this.$parent.$refs.input.$el,
      {
        content: this.$el,
        allowHTML: true,
        interactive: true,
        trigger: 'manual',
        appendTo: this.$el.closest('.v-tiptap-editor'),
        onHide: this.onHide,

        onClickOutside: () => {
          this.editor.chain().focus().blur().run();
        },
      },
    );

    editor.on('transaction', ({ editor: e }) => {
      if (this.state) {
        const headPosition = e.view.coordsAtPos(e.view.state.selection.$head.pos);

        this.tippy.setProps({
          getReferenceClientRect: () => ({
            top: headPosition.top,
            left: headPosition.left - (this.$el.clientWidth / 2),
            width: this.$el.clientWidth,
          }),
        });
      }
    });
  },
  watch: {
    state(val) {
      this.$nextTick(() => {
        if (val) this.tippy.show();
        else this.tippy.hide();
      });
    },
  },
  methods: {
    onHide() {
      this.$emit('update:state', false);
    },
  },
  render(h) {
    const { editor, content, state } = this;

    if (state) {
      return h('div', {
        props: {
          editor,
        },
        on: {
          focusin: () => {
            this.editor
              .chain()
              .setMeta('addToHistory', false)
              .toggleHighlight()
              .run();
          },
          focusout: () => {
            if (this.editor.isActive('highlight')) {
              this.editor
                .chain()
                .setMeta('addToHistory', false)
                .unsetHighlight()
                .run();
            }
          },
        },
      }, [content]);
    }

    return h('div');
  },
};
</script>
