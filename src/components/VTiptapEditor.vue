<script>
import Vue from 'vue';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';
import VInput from 'vuetify/lib/components/VInput/VInput';
import { attachedRoot } from 'vuetify/lib/util/dom';
import { Editor, EditorContent } from '@tiptap/vue-2';
import StarterKit from '@tiptap/starter-kit';
import '@/assets/settings/index.scss';

export default Vue.extend({
  name: 'v-tiptap-editor',
  mixins: [VTextField],
  data() {
    return {
      editor: null,
    };
  },
  created() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          style: 'width: inherit; outline: none; height: 100%;',
        },
      },
      content: this.lazyValue,
      extensions: [
        StarterKit,
      ],
      onFocus: ({ event: e }) => {
        this.onFocus(e);
      },
      onBlur: ({ event: e }) => {
        this.onBlur(e);
      },
      onUpdate: ({ editor }) => {
        this.lazyValue = editor.getText() ? editor.getHTML() : '';
      },
    });
  },
  computed: {
    classes() {
      return {
        'v-tiptap-editor': true,
        ...VTextField.options.computed.classes.call(this),
      };
    },
    noResizeHandle() {
      return this.noResize || this.autoGrow;
    },
  },
  watch: {
    value(val) {
      const isSame = this.editor.getHTML() === val;

      if (isSame) return;

      this.lazyValue = val;
      this.editor.commands.setContent(val, false);
    },
  },
  methods: {
    genInput() {
      const input = VTextField.options.methods.genInput.call(this);
      return this.$createElement(EditorContent, {
        ...input.data,
        class: 'v-tiptap__input',
        attrs: {
          ...input.data.attrs,
          editor: this.editor,
        },
      });
    },
    onBlur(e) {
      this.isFocused = false;
      this.editor.commands.blur();

      if (e) this.$nextTick(() => this.$emit('blur', e));
    },
    onFocus(e) {
      if (!this.$refs.input) return;

      const root = attachedRoot(this.$el);
      if (!root) return;

      if (!root.activeElement.closest(`.${this.$refs.input.$el.className}`)) {
        this.editor.commands.focus('end');
      }

      if (!this.editor.getText()) {
        this.editor.commands.focus('start');
      }

      if (!this.isFocused) {
        this.isFocused = true;

        if (e) this.$emit('focus', e);
      }
    },
    onClick() {
      if (this.isFocused || this.isDisabled || !this.$refs.input) return;

      this.editor.commands.focus();
    },
    onMouseDown(e) {
      // Prevent input from being blurred
      if (!e.target.closest(`.${this.$refs.input.$el.className}`)) {
        e.preventDefault();
        e.stopPropagation();
      }

      VInput.options.methods.onMouseDown.call(this, e);
    },
    clearableCallback() {
      if (this.$refs.input && this.editor.commands.focus()) {
        this.$nextTick(() => {
          this.internalValue = null;
        });
      }
    },
  },
});
</script>
