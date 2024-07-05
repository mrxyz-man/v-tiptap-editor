<template lang="pug">
    v-tiptap-node-view-wrapper(
      v-bind="$props"
    )
      v-img.mb-2(
        :src="node.attrs.src"
        :alt="node.attrs.alt"
        data-drag-handle
      )
</template>

<script>
import VImg from 'vuetify/lib/components/VImg/VImg';
import VTiptapNodeViewWrapper from '@/components/VTiptapNodeViewWrapper.vue';
import { nodeViewProps } from '@tiptap/vue-2';

export default {
  components: {
    VTiptapNodeViewWrapper,
    VImg,
  },
  props: nodeViewProps,
};
</script>
