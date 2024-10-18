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
      type: Function,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    positions: {
      type: Object,
      default: () => ({}),
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
        maxWidth: 'none',
        ...this.options,
        content: this.$el,
        allowHTML: true,
        interactive: true,
        trigger: 'manual',
        appendTo: this.$el.closest('.v-tiptap-editor'),
        hideOnClick: false,
        popperOptions: {
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                boundary: this.$parent.$refs.input.$el,
              },
            },
          ],
        },
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
    positions: {
      handler({ from, to }) {
        const { view } = this.editor;
        this.tippy.setProps({
          getReferenceClientRect: this.tippy.getReferenceClientRect || (() => (
            posToDOMRect(view, from, to)
          )),
        });
      },
      deep: true,
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
      }, [content()]);
    }

    return h('div');
  },
};
</script>
