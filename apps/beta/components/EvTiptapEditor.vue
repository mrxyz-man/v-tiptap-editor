<template lang="pug">
  v-tiptap-editor(
    v-bind="$props"
    :value="value"
    @input="(val) => $emit('input', val)"
  )
</template>

<script>
import VTiptapEditor from 'v-tiptap-editor';

export default {
  components: {
    VTiptapEditor,
  },
  props: {
    value: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: undefined,
    },
    outlined: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: undefined,
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
};
</script>
