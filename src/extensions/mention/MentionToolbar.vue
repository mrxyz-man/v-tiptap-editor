<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    v-list
      template(v-if="items.length")
        v-list-item(
          v-for="(item, idx) in serializedItems"
          :key="idx"
          @click="selectItem(idx)"
        )
          v-list-item-content
            v-list-item-title {{ item.label }}
      template(v-else)
        v-list-item
          v-list-item-title Нет данных
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
    itemText: {
      type: String,
      required: true,
    },
    itemValue: {
      type: String,
      required: true,
    },
  },
  computed: {
    serializedItems() {
      const { items, itemText, itemValue } = this;

      return items.map((i, idx) => {
        if (typeof i === 'object') {
          return {
            id: i[itemValue],
            label: i[itemText],
          };
        }

        return {
          id: idx + 1,
          label: i,
        };
      });
    },
  },
  methods: {
    selectItem(index) {
      const item = this.serializedItems[index];
      if (item) this.command(item);
    },
  },
};
</script>
