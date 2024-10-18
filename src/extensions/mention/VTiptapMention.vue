<template lang="pug">
  node-view-wrapper.d-inline(
    v-bind="$props"
  )
    v-chip(
      v-bind="attrs"
    ) {{ extension.options.renderText({ options: extension.options, node }) }}
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
      return {
        ...this.node.attrs,
        ...this.extension.options.HTMLAttributes,
      };
    },
  },
};
</script>
