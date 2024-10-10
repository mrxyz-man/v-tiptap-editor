<template lang="pug">
  tiptap-toolbar(:editor="editor")
    add-link(
      v-model="url"
      :editable.sync="editable"
      @close="onCloseLink"
      @save="onSaveLink"
      @reset="onResetLink"
    )
</template>

<script>
import TiptapToolbar from '@/components/TiptapToolbar.vue';
import AddLink from './AddLink.vue';

export default {
  components: {
    TiptapToolbar,
    AddLink,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    nodeName: {
      type: String,
      required: true,
    },
    attrKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      initialURL: '',
      editable: this.editor.isActive(this.nodeName) || false,
      url: this.editor.getAttributes(this.nodeName)[this.attrKey] || this.initialURL,
    };
  },
  methods: {
    onSaveLink() {
      this.$emit('link:save', this.url);
      this.editable = this.editor.isActive(this.nodeName);
    },
    onCloseLink() {
      if (this.editor.isActive(this.nodeName)) {
        this.editable = this.editor.isActive(this.nodeName);
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
