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
              ref="link"
              :href="attrs.value"
              target="_blank"
            ) {{ attrs.value }}
        v-list-item-action-text
          v-icon.ml-2(@click="toggleEdit") {{ editIcon }}
          v-icon.ml-2(
            @click="$emit('reset')"
            @blur="blur"
          ) {{ resetIcon }}

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
            :disabled="!attrs.value"
            color="success"
            @click="$emit('save')"
          ) {{ saveIcon }}
          v-icon.ml-2(
            color="error"
            @click="$emit('close')"
            @blur="blur"
          ) {{ closeIcon }}
</template>

<script>

export default {
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
      this.$refs?.textfield?.$refs?.input?.focus();
      this.$refs?.link?.focus();
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
