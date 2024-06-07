<template lang="pug">
  v-app
    v-main
      v-container
        v-row
          v-col(cols="12")
            div.d-flex.my-3
              div
                p Text #[a#test text]
              v-btn(@click="() => $refs.tippy.show()") click

              v-tiptap-tippy(
                ref="tippy"
                element="#test"
              )
                v-btn test 1

            v-tiptap-editor(
              v-model="tiptapVal1"
              :extensions="extensions"
              filled
              label="Filled"
            )
            v-tiptap-editor(
              label="Solo"
              solo
            )
            v-tiptap-editor(
              label="Outlined"
              outlined
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
            v-tiptap-editor(
              label="Default"
            )
</template>

<script>
import {
  Bold,
  Underline,
  Heading,
  Link,
} from '@/extensions';
import VTiptapEditor from './components/VTiptapEditor.vue';
import VTiptapTippy from './components/VTiptapTippy.vue';

export default {
  components: {
    VTiptapEditor,
    VTiptapTippy,
  },
  data() {
    return {
      extensions: [
        Bold.configure({
          // icon: 'mdi-format-underline',
        }),
        Underline,
        Heading,
        Link,
      ],
      tiptapVal1: `<p>
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
        I’m running Tiptap with Vue.js. 🎉
      </p>
      <p>Heading 1</p>
      `,
    };
  },
};
</script>
