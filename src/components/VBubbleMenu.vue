<template lang="pug">
  bubble-menu(
    :editor="editor"
    :tippy-options="tippyOptions"
    :plugin-key="pluginKey"
    :should-show="shouldShow"
  )
    slot
</template>

<script>
import { BubbleMenu } from '@tiptap/vue-2';

export default {
  components: {
    BubbleMenu,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    shouldShow: {
      type: Function,
      default: () => null,
    },
    pluginKey: {
      type: String,
      default: 'bubbleMenu',
    },
    tippyOptions: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
