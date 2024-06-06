<template lang="pug">
  v-text-field(
    ref="textfield"
    v-model="value"
    v-bind="attrs"
  )
    template(#append)
      v-icon(
        color="success"
        @click="$emit('save', value)"
      ) mdi-check
      v-icon.ml-2(
        color="error"
        @click="onClose"
        @blur="onBlur"
      ) mdi-close
</template>

<script>
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';

export default {
  components: {
    VIcon,
    VTextField,
  },
  props: {
    solo: {
      type: Boolean,
      default: true,
    },
    autofocus: {
      type: Boolean,
      default: false,
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
  },
  data() {
    return {
      value: this.$attrs.value || '',
    };
  },
  computed: {
    attrs() {
      const { $props, $attrs } = this;
      return { ...$props, ...$attrs };
    },
  },
  methods: {
    onClose() {
      this.reset();
      this.$emit('close');
    },
    reset() {
      this.value = '';
    },
    onBlur(e) {
      this.$refs.textfield.$refs.input.focus();
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
