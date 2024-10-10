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
  HardBreak,
  BubbleMenu,
  Dropcursor,
  Placeholder,
} from '@/extensions';
import { renderExtensions } from '@/utils';

import {
  inline,
  select,
  btnToggle,
} from '@/renders';

import TiptapToolbar from './TiptapToolbar.vue';
import TiptapTippy from './TiptapTippy.vue';

const REQUIRED_EXTENSIONS = [
  Text,
  Document,
  Paragraph,
  HardBreak,
  BubbleMenu,
  Dropcursor,
  Placeholder,
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

export default Vue.extend({
  name: 'TiptapEditor',
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
  },
  data() {
    return {
      editor: null,
      includedClass: 'v-tiptap-editor--included',
      allExtensions: [
        ...this.extensions,
        ...REQUIRED_EXTENSIONS,
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
      extensions: this.allExtensions,
      content: this.value,
      onFocus: ({ event: e }) => {
        this.onFocus(e);
      },
      onUpdate: ({ editor }) => {
        this.internalValue = editor.getText() ? editor.getHTML() : '';
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
  },
  watch: {
    value(val) {
      const isSame = this.editor.getHTML() === val;

      if (isSame) return;

      this.lazyValue = val;
      this.editor.commands.setContent(val, false);
    },
    isFocused(val) {
      const { placeholder, editor } = this;

      if (placeholder) {
        editor.commands.setPlaceholder(val ? placeholder : '');
      }
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

      return $createElement(TiptapToolbar, {
        ref: 'toolbar',
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
    genBubbleMenus() {
      const { editor, $createElement } = this;
      const { element } = editor.options;
      const menusDict = editor.storage?.bubbleMenu?.editors?.[element.id];
      const menusList = menusDict ? Object.entries(menusDict) : [];

      return menusList.map(([key, { state, content, shouldShow }]) => (
        $createElement(TiptapTippy, {
          props: {
            editor,
            state,
            content,
            shouldShow,
          },
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

      return this.$createElement(EditorContent, {
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
      this.genFunctionalToolbar(),
      this.$createElement('div', this.setTextColor(this.validationState, {
        staticClass: 'v-input',
        class: this.classes,
      }), this.genContent()),
    ]);
  },
});
</script>
