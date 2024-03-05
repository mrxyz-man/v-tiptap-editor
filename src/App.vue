<template lang="pug">
  v-app
    v-main
      v-container
        v-row
          v-col(cols="12")
            v-tiptap-editor(
              v-model="tiptapVal1"
              filled
              label="Filled"
            )
            v-tiptap-editor(
              label="Solo"
              solo
            )
            v-tiptap-editor(
              label="Outlined"
              outlined
            )
            v-tiptap-editor(
              label="Default"
            )
</template>

<script lang="ts">
import VTiptapEditor from './components/VTiptapEditor.vue';

export default {
  components: {
    VTiptapEditor,
  },
  data() {
    return {
      tiptapVal1: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    };
  },
};
</script>
