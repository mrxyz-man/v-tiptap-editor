<script>
import tippy from 'tippy.js';
import { posToDOMRect } from '@tiptap/core';

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
    this.tippy = tippy(
      this.$parent.$refs.input.$el,
      {
        content: this.$el,
        allowHTML: true,
        interactive: true,
        trigger: 'manual',
        appendTo: this.$el.closest('.v-tiptap-editor'),
        onHide: this.onHide,
        onShow: this.onShow,

        onClickOutside: () => {
          this.editor.chain().focus().blur().run();
        },
      },
    );
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
    onShow(instance) {
      this.$nextTick(() => {
        const { view } = this.editor;
        const { selection } = view.state;
        const { from, to } = selection;

        if (this.state) {
          instance.setProps({
            getReferenceClientRect: instance.getReferenceClientRect || (() => (
              posToDOMRect(view, from, to)
            )),
          });
        }
      });
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
