<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    v-btn(
      icon
      depressed
    )
      v-icon mdi-format-wrap-inline
</template>

<script>
import VTiptapToolbar from '@/components/VTiptapToolbar.vue';
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VBtn from 'vuetify/lib/components/VBtn/VBtn';

export default {
  components: {
    VBtn,
    VIcon,
    VTiptapToolbar,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
};
</script>
