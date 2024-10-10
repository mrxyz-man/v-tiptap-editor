<template lang="pug">
  tiptap-node-view-wrapper(
    v-bind="$props"
  )
    v-img.mb-2(
      v-bind="node.attrs"
      data-drag-handle
    )
</template>

<script>
import TiptapNodeViewWrapper from '@/components/TiptapNodeViewWrapper.vue';
import { nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    TiptapNodeViewWrapper,
  },
  props: nodeViewProps,
};
</script>
