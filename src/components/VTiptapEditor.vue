<script>
import Vue from 'vue';
import VTextField from 'vuetify/lib/components/VTextField/VTextField';
import VInput from 'vuetify/lib/components/VInput/VInput';
import { attachedRoot } from 'vuetify/lib/util/dom';

import { Editor } from '@tiptap/vue-2';
import {
  Text,
  Indent,
  Document,
  Paragraph,
  Highlight,
  HardBreak,
  BubbleMenu,
  Dropcursor,
  // Gapcursor,
} from '@/extensions';
import { renderExtensions } from '@/utils';

import {
  inline,
  select,
  btnToggle,
} from '@/renders';

import VTiptapEditorContent from './VTiptapEditorContent.vue';
import VTiptapToolbar from './VTiptapToolbar.vue';
import VTiptapTippy from './VTiptapTippy.vue';

import '@/assets/settings/index.scss';

const REQUIRED_EXTENSIONS = [
  Text,
  Indent,
  Document,
  Paragraph,
  HardBreak,
  BubbleMenu,
  Dropcursor,
  // Gapcursor,
  Highlight.configure({
    HTMLAttributes: {
      class: 'selection',
    },
  }),
];

const DEFAULT_TOOLBAR_CONFIG = {
  items: [
    {
      exts: ['history'],
      render: inline,
    },
    '|',
    {
      exts: ['bold', 'underline', 'italic'],
      render: btnToggle,
    },
    '|',
    {
      exts: ['paragraph', 'heading'],
      render: select,
    },
    '|',
    {
      exts: ['link', 'image'],
      render: inline,
    },
    '|',
    {
      exts: ['textAlign'],
      render: btnToggle,
    },
  ],
};

/*
TODO LIST:
[ ] - Usage typescript syntax;
[ ] - Add special editor props support;
[ ] - Optimize the new logic;
// [*] - Add functional toolbar;
// [*] - Add functional toolbar configuration support;
[ ] - Add functional tooltip by selection;
// [*] - Test all text-field functionality with new shell;
[ ] - Add support save default styles by props (enabled/disabled);
*/
export default Vue.extend({
  name: 'VTiptapEditor',
  mixins: [VTextField],
  props: {
    extensions: {
      type: Array,
      default: () => [],
    },
    toolbar: {
      type: Object,
      default: () => DEFAULT_TOOLBAR_CONFIG,
    },
    balloon: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      editor: null,
      includedClass: 'v-tiptap-editor--included',

      allExtensions: [
        ...REQUIRED_EXTENSIONS,
        ...this.extensions,
      ],
    };
  },
  created() {
    const { includedClass } = this;

    this.editor = new Editor({
      includedClass,
      editorProps: {
        attributes: {
          style: 'width: inherit; outline: none; height: 100%;',
        },
      },
      bubbleMenus: {},
      extensions: this.allExtensions,
      content: this.value,
      editable: !this.isDisabled,
      onFocus: ({ event: e }) => {
        this.onFocus(e);
      },
      onUpdate: ({ editor }) => {
        this.internalValue = editor.getText() ? editor.getHTML() : '';
      },
      onCreate: ({ editor }) => {
        if (this.balloon) {
          editor.commands.createBubbleMenu({
            key: 'toolbarBubbleMenu',
            content: this.genFunctionalToolbar,
            shouldShow: () => {
              const { selection } = editor.state;
              return !selection.empty && !selection?.node;
            },
          });
        }
      },
      $createElement: this.$createElement,
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
    bubbleMenus() {
      return this.editor.options.bubbleMenus;
    },
  },
  watch: {
    value(val) {
      const isSame = this.editor.getHTML() === val;

      if (isSame) return;

      this.lazyValue = val;
      this.editor.commands.setContent(val);
    },
  },
  methods: {
    genFunctionalToolbar() {
      const {
        editor,
        toolbar,
        allExtensions,
        $createElement,
      } = this;

      const extensions = allExtensions;

      return $createElement(VTiptapToolbar, {
        props: {
          editor,
          flat: true,
          focusable: false,
        },
      }, [
        renderExtensions({
          editor,
          extensions,
          $createElement,
          config: toolbar,
        }),
      ]);
    },
    hideBubbleMenus() {
      const { bubbleMenus } = this;
      const menusList = Object.entries(bubbleMenus);

      const newMenus = menusList.reduce((acc, [key, value]) => ({
        ...acc, [key]: { ...value, state: false },
      }), {});
      this.editor.setOptions({ bubbleMenus: newMenus });
    },
    genBubbleMenus() {
      const { editor, $createElement, bubbleMenus } = this;
      const menusList = Object.entries(bubbleMenus);

      return menusList.map(([key, props]) => (
        $createElement(VTiptapTippy, {
          props: { editor, ...props },
          on: {
            'update:state': (val) => {
              this.editor.commands.updateBubbleMenu({
                key,
                state: val,
              });
            },
          },
        })
      ));
    },
    genDefaultSlot() {
      return [
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot(),
        this.genProgress(),
      ];
    },
    genInput() {
      const input = VTextField.options.methods.genInput.call(this);
      return this.$createElement(VTiptapEditorContent, {
        ...input.data,
        class: 'v-tiptap__input',
        attrs: {
          ...input.data.attrs,
          editor: this.editor,
        },
        nativeOn: {
          focusout: (e) => {
            if (
              (e?.relatedTarget && this.$el.contains(e?.relatedTarget))
              || e?.relatedTarget?.closest?.(`.${this.includedClass}`)
            ) {
              return;
            }

            this.onBlur(e);
          },
        },
      });
    },
    onBlur(e) {
      this.isFocused = false;
      this.$refs.input.$el.blur();
      this.hideBubbleMenus();

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
        this.editor.commands.focus();
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
      ...this.genBubbleMenus(),
      !this.balloon ? this.genFunctionalToolbar() : null,
      this.$createElement('div', this.setTextColor(this.validationState, {
        staticClass: 'v-input',
        class: this.classes,
      }), this.genContent()),
    ]);
  },
});
</script>
