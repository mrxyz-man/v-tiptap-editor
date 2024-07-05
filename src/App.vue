<template lang="pug">
  v-app
    v-main
      v-container
        v-row
          v-col(cols="12")
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
// import { inline, btnToggle } from '@/renders';

import {
  Bold,
  Underline,
  Heading,
  Link,
  History,
  Italic,
  Image,
} from '@/extensions';
import VTiptapEditor from './components/VTiptapEditor.vue';

export default {
  components: {
    VTiptapEditor,
  },
  data() {
    return {
      extensions: [
        History,
        Bold.configure({
          // item: {
          //   icon: 'mdi-format-underline',
          // },
        }),
        Underline,
        Italic,
        Heading,
        Link,
        Image,
      ],
      // toolbar: {
      //   items: [
      //     {
      //       exts: ['history'],
      //       render: inline,
      //     },
      //     '|',
      //     {
      //       render: btnToggle,
      //       exts: ['underline', 'bold', 'italic'],
      //     },
      //   ],
      // },
      tiptapVal1: `
        <h3><strong>Render HTML</strong></h3>
        <p>With the <strong>renderHTML</strong> function you can control how an extension is rendered to HTML. We pass an attributes object to it, with all local attributes, global attributes, and configured CSS classes. Here is an example from the <strong>Bold</strong> extension:</p>
        <img src="https://ckeditor.com/assets/images/ckdemo/editor-types/volcano_2x.jpg" />
      `,
    };
  },
};
</script>
