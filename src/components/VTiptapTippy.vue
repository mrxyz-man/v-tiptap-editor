<script>
import tippy from 'tippy.js';

export default {
  name: 'v-tiptap-tippy',
  props: {
    element: {
      type: [Object, String],
      required: true,
    },
  },
  data() {
    return {
      tippy: null,
    };
  },
  mounted() {
    [this.tippy] = tippy(this.element, {
      content: this.$el.innerHTML,
      interactive: true,
      allowHTML: true,
      trigger: 'manual',
    });
  },
  methods: {
    show() {
      this.tippy.show();
    },
  },
  render(h) {
    return h('div', {}, this.$slots.default);
  },
};
</script>
