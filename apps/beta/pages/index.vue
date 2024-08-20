<template lang="pug">
  div
    ev-tiptap-editor(
      v-model="text"
      label="Описание"
      placeholder="Введите описание"
    )
</template>

<script>
export default {
  data() {
    return {
      text: '',
    };
  },
};
</script>
