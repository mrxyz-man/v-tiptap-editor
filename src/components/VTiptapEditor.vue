<script>
import Vue from 'vue';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';
import VInput from 'vuetify/lib/components/VInput/VInput';
import { attachedRoot } from 'vuetify/lib/util/dom';

import { Editor, EditorContent } from '@tiptap/vue-2';
import {
  Text,
  Document,
  Paragraph,
  Highlight,
} from '@/extensions';
import { groupExtensions } from '@/utils';

import VTiptapToolbar from './VTiptapToolbar.vue';
import '@/assets/settings/index.scss';

const REQUIRED_EXTENSIONS = [
  Text,
  Document,
  Paragraph,
  Highlight.configure({
    multicolor: true,
    HTMLAttributes: {
      class: 'selection',
    },
  }),
];

/*
TODO LIST:
[ ] - Usage typescript syntax;
[ ] - Add special editor props support;
[ ] - Optimize the new logic;
[ ] - Add functional toolbar;
[ ] - Add functional tooltip by selection;
[ ] - Test all text-field functionality with new shell;
[ ] - Add support save default styles by props (enabled/disabled);
*/
export default Vue.extend({
  name: 'v-tiptap-editor',
  mixins: [VTextField],
  props: {
    extensions: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      editor: null,
      allExtensions: [
        ...this.extensions,
        ...REQUIRED_EXTENSIONS,
      ],
    };
  },
  created() {
    this.editor = new Editor({
      editorProps: {
        attributes: {
          style: 'width: inherit; outline: none; height: 100%;',
        },
      },
      extensions: this.allExtensions,
      content: this.value,
      onFocus: ({ event: e }) => {
        this.onFocus(e);
      },
      onBlur: ({ event: e }) => {
        this.onBlur(e);
      },
      onUpdate: ({ editor }) => {
        this.internalValue = editor.getText() ? editor.getHTML() : '';
      },
    });
  },
  computed: {
    classes() {
      return {
        'v-tiptap-field': true,
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
    genDefaultSlot() {
      return [
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot(),
        this.genProgress(),
      ];
    },
    genFunctionalToolbar() {
      const {
        editor,
        allExtensions,
        $createElement,
      } = this;

      const extensions = allExtensions;

      return $createElement(VTiptapToolbar, {
        props: {
          editor,
        },
      }, [
        groupExtensions({
          editor,
          extensions,
          $createElement,
        }),
      ]);
    },
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
      this.$refs.input.$el.blur();

      if (e) this.$nextTick(() => this.$emit('blur', e));
    },
    onFocus(e) {
      if (!this.$refs.input) return;

      const root = attachedRoot(this.$el);
      if (!root) return;

      if (!this.hasMouseDown && !this.isFocused && !this.hasFocused) {
        this.editor.commands.focus('end');
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
      if (!e.target.closest(`#${this.$refs.input.$el.id}`)) {
        e.preventDefault();
        e.stopPropagation();
      }

      VInput.options.methods.onMouseDown.call(this, e);
    },
    onMouseUp(e) {
      VInput.options.methods.onMouseUp.call(this, e);
    },
    clearableCallback() {
      if (this.$refs.input && this.editor.commands.focus()) {
        this.$nextTick(() => {
          this.internalValue = null;
        });
      }
    },
  },
  render(h) {
    return h('div', {
      staticClass: 'v-tiptap-editor',
    }, [
      this.genFunctionalToolbar(),
      this.$createElement('div', this.setTextColor(this.validationState, {
        staticClass: 'v-input',
        class: this.classes,
      }), this.genContent()),
    ]);
  },
});
</script>
