<template lang="pug">
  node-view-wrapper.d-inline(
    v-bind="$props"
  )
    v-chip(
      v-bind="attrs"
    ) {{ extension.options.suggestion.char }}{{ node.attrs.id || node.attrs.label }}
</template>

<script>
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-2';

export default {
  components: {
    NodeViewWrapper,
  },
  props: nodeViewProps,
  computed: {
    attrs() {
      console.log(this.$props);
      return {
        ...this.node.attrs,
        ...this.extension.options.HTMLAttributes,
      }
    },
  },
};
</script>
