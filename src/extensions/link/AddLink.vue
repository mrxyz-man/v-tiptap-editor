<template lang="pug">
  v-text-field(
    ref="textfield"
    v-bind="attrs"
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
  },
  computed: {
    attrs() {
      const { $props, $attrs } = this;
      return { ...$props, ...$attrs };
    },
  },
  methods: {
    blur(e) {
      this.$refs.textfield.$refs.input.focus();
      e.preventDefault();
      e.stopPropagation();
    },
  },
};
</script>
