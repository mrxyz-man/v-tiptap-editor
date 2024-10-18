<template lang="pug">
  v-app
    v-main
      v-container
        v-row
          v-col(cols="12")
            v-tiptap-editor(
              v-model="tiptapVal1"
              :extensions="extensions"
              balloon
              filled
              label="Filled"
            )
            v-tiptap-editor(
              :value="tiptapVal1"
              :extensions="extensions"
              label="Outlined"
              outlined
              balloon
            )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
            //- v-tiptap-editor(
            //-   label="Default"
            //- )
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
  TextAlign,
  Mention,
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
        TextAlign,
        Mention.configure({
          HTMLAttributes: {
            color: 'primary',
            label: true,
          },
          suggestion: {
            itemValue: 'code',
            itemText: 'text',
            items: () => [{
              code: 1,
              text: 'Foo',
            }],
            char: '#',
          },
        }),
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
        <h3 class="text-h3" style="padding-top: .4em; margin-bottom: .4em"><strong>Render HTML</strong></h3><p style="padding-top: .2em; margin-bottom: .8em">With the <strong>renderHTML</strong> function you can control how an extension is rendered to HTML. We pass an attributes object to it, with all local attributes, global attributes, and configured CSS classes. Here is an example from the <strong>Bold</strong> extension:</p><p style="padding-top: .2em; margin-bottom: .8em">Mentions: <span color="primary" label="true" data-type="mention" data-id="1" data-label="Foo">#Foo</span> </p><img src="https://ckeditor.com/assets/images/ckdemo/editor-types/volcano_2x.jpg">
      `,
    };
  },
};
</script>
