<template lang="pug">
  v-app
    v-main
      v-container
        v-row
          v-col(cols="12")
            //- tiptap-editor(
            //-   v-model="tiptapVal1"
            //-   :extensions="extensions"
            //-   filled
            //-   label="Filled"
            //- )
            //- tiptap-editor(
            //-   label="Solo"
            //-   solo
            //- )
            v-btn(
              active-class="primary white--text"
              :input-value="switcher"
              depressed
              outlined
              @click="switcher = !switcher"
            ) On/Off placeholder
            tiptap-editor(
              label="Описание"
              :placeholder="switcher ? 'Введите описание...' : ''"
              :extensions="extensions"
              outlined
            )
            //- tiptap-editor(
            //-   label="Default"
            //- )
</template>

<script>
import '@/assets/index.scss';
import TiptapEditor, {
  Bold,
  Underline,
  Heading,
  Link,
  History,
  Italic,
  Image,
  TextAlign,
} from '@/index';

export default {
  components: {
    TiptapEditor,
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
        TextAlign,
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
      switcher: false,
    };
  },
};
</script>
