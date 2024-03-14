<script>
import VBtnToggle from 'vuetify/lib/components/VBtnToggle/VBtnToggle';
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VBtn from 'vuetify/lib/components/VBtn/VBtn';

export default {
  name: 'v-tiptap-toolbar',
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  methods: {
    genContent() {
      return this.$createElement(VBtnToggle, {
        props: {
          dark: true,
          dense: true,
          multiple: true,
          value: [
            ...this.editor.isActive('bold') ? ['bold'] : [],
            ...this.editor.isActive('italic') ? ['italic'] : [],
            ...this.editor.isActive('strike') ? ['strike'] : [],
          ],
        },
      }, [
        this.$createElement(VBtn, {
          props: {
            value: 'bold',
          },
          on: {
            click: () => {
              this.editor.commands.toggleBold();
            },
          },
        }, [
          this.$createElement(VIcon, {}, ['mdi-format-bold']),
        ]),
        this.$createElement(VBtn, {
          props: {
            value: 'italic',
          },
          on: {
            click: () => {
              this.editor.commands.toggleItalic();
            },
          },
        }, [
          this.$createElement(VIcon, {}, ['mdi-format-italic']),
        ]),
        this.$createElement(VBtn, {
          props: {
            value: 'strike',
          },
          on: {
            click: () => {
              this.editor.commands.toggleStrike();
            },
          },
        }, [
          this.$createElement(VIcon, {}, ['mdi-format-strikethrough-variant']),
        ]),
      ]);
    },
  },
  render(h) {
    return h('div', {}, [this.genContent()]);
  },
};
</script>
