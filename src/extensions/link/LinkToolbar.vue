<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    add-link(
      v-model="url"
      @save="$emit('link:save', url)"
      @close="$emit('link:close')"
    )
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
  data() {
    return {
      url: this.editor.getAttributes('link').href || '',
    };
  },
};
</script>
