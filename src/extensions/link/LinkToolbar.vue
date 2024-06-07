<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    add-link(:value="editor.getAttributes('link').href")
</template>

<script>
import VTiptapToolbar from '@/components/VTiptapToolbar.vue';
import AddLink from './AddLink.vue';

export default {
  components: {
    VTiptapToolbar,
    AddLink,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
};
</script>
