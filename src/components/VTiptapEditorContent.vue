<template lang="pug">
  v-card(
    v-bind="$attrs"
    color="transparent"
    flat
  )
    editor-content(:editor="editor")
</template>

<script>
import { EditorContent } from '@tiptap/vue-2';

export default {
  components: {
    EditorContent,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
};
</script>
