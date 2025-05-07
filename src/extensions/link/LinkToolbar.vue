<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    add-link(
      v-model="url"
      v-bind="extendAttrs"
      v-on="extendListeners"
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
    nodeName: {
      type: String,
      required: true,
    },
    attrKey: {
      type: String,
      required: true,
    },
    saveIcon: {
      type: String,
      required: true,
    },
    closeIcon: {
      type: String,
      required: true,
    },
    editIcon: {
      type: String,
      required: true,
    },
    resetIcon: {
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
  computed: {
    extendAttrs() {
      const { editable, $props } = this;
      return {
        ...$props,
        editable,
      };
    },
    extendListeners() {
      const {
        onCloseLink,
        onSaveLink,
        onResetLink,
        onUpdateEditable,
      } = this;

      return {
        close: onCloseLink,
        save: onSaveLink,
        reset: onResetLink,
        'update:editable': onUpdateEditable,
      };
    },
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
    onUpdateEditable(val) {
      this.editable = val;
    },
  },
};
</script>
