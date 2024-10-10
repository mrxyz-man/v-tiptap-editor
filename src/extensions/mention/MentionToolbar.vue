<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    v-list(v-if="items.length")
      v-list-item(
        v-for="(item, idx) in items"
        @click="selectItem(idx)"
        :key="idx"
      )
        v-list-item-content
          v-list-item-title {{ item }}
</template>

<script>
import VTiptapToolbar from '@/components/VTiptapToolbar.vue';

export default {
  components: {
    VTiptapToolbar,
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    editor: {
      type: Object,
      required: true,
    },
    command: {
      type: Function,
      required: true,
    },
  },
  methods: {
    selectItem(index) {
      const item = this.items[index];
      if (item) {
        this.command({ id: item });
      }
    },
  },
};
</script>
