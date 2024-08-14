<template lang="pug">
    v-tiptap-node-view-wrapper(
      v-bind="$props"
    )
      v-img.mb-2(
        v-bind="node.attrs"
        data-drag-handle
      )
</template>

<script>
import VTiptapNodeViewWrapper from '@/components/VTiptapNodeViewWrapper.vue';
import { nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    VTiptapNodeViewWrapper,
  },
  props: nodeViewProps,
};
</script>
