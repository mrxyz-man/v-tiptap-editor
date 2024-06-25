<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    add-link(
      v-model="url"
      :editable.sync="editable"
      @close="onCloseLink"
      @save="onSaveLink"
      @reset="onResetLink"
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
      initialURL: '',
      editable: this.editor.isActive('link') || false,
      url: this.editor.getAttributes('link').href || this.initialURL,
    };
  },
  methods: {
    onSaveLink() {
      this.$emit('link:save', this.url);
      this.editable = this.editor.isActive('link');
    },
    onCloseLink() {
      if (this.editor.isActive('link')) {
        this.editable = this.editor.isActive('link');
        return;
      }

      this.$emit('link:close');
    },
    onResetLink() {
      this.url = this.initialURL;
      this.$emit('link:reset', this.url);
    },
  },
};
</script>
