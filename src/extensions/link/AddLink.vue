<template lang="pug">
  div
    v-list.px-0.py-1(
      v-if="isEditable"
      max-width="320"
      rounded
    )
      v-list-item
        v-list-item-content
          v-list-item-title
            a(
              :href="attrs.value"
              target="_blank"
            ) {{ attrs.value }}
        v-list-item-action-text
          v-icon(@click="toggleEdit") mdi-link-edit
          v-icon.ml-2(@click="$emit('reset')") mdi-link-off

    div(
      v-else
      style="max-width: 320px; min-width: 320px;"
    )
      v-text-field(
        ref="textfield"
        v-bind="attrs"
        @input="$emit('input', $event)"
        @hook:mounted="onMountedField"
      )
        template(#append)
          v-icon(
            color="success"
            @click="$emit('save')"
          ) mdi-check
          v-icon.ml-2(
            color="error"
            @click="$emit('close')"
            @blur="blur"
          ) mdi-close
</template>

<script>
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import {
  VList,
  VListItem,
  VListItemContent,
  VListItemTitle,
  VListItemActionText,
} from 'vuetify/lib/components/VList';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';

export default {
  components: {
    VIcon,
    VList,
    VListItem,
    VListItemContent,
    VListItemTitle,
    VListItemActionText,
    VTextField,
  },
  props: {
    solo: {
      type: Boolean,
      default: true,
    },
    autofocus: {
      type: Boolean,
      default: true,
    },
    label: {
      type: String,
      default: 'Введите URL-адрес',
    },
    placeholder: {
      type: String,
      default: 'Введите URL-адрес',
    },
    hideDetails: {
      type: Boolean,
      default: true,
    },
    fullWidth: {
      type: Boolean,
      default: true,
    },
    flat: {
      type: Boolean,
      default: true,
    },
    editable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditable: false,
    };
  },
  watch: {
    editable: {
      handler(val) {
        this.isEditable = val;
      },
      immediate: true,
    },
    isEditable(val) {
      this.$emit('update:editable', val);
    },
  },
  computed: {
    attrs() {
      const { $props, $attrs } = this;
      return { ...$props, ...$attrs };
    },
  },
  methods: {
    toggleEdit() {
      this.isEditable = !this.isEditable;
    },
    onMountedField() {
      this.$refs.textfield.$refs.input.focus();
      this.$refs.textfield.$refs.input.select();
      this.$refs.textfield.$refs.input.scrollLeft = 0;
    },
    blur(e) {
      this.$refs.textfield.$refs.input.focus();
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
