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
import VTiptapMenu from './VTiptapMenu.vue';
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
      balloon: null,
      allExtensions: [
        ...this.extensions,
        ...REQUIRED_EXTENSIONS,
      ],
    };
  },
  created() {
    this.balloon = {
      id: null,
      content: null,
      props: {
        positionX: null,
        positionY: null,
        value: false,
      },
      set({ id, props, content }) {
        this.id = id;
        this.props = { ...this.props, ...props };
        this.content = content;
      },
      reset() {
        this.id = null;
        this.props = {
          positionX: null,
          positionY: null,
          value: false,
        };
        this.content = null;
      },
    };

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
      onSelectionUpdate: ({ editor, transaction }) => {
        const headPosition = editor.view.coordsAtPos(transaction.selection.$head.pos);

        this.balloon.set({
          id: '1',
          props: {
            positionY: headPosition.top,
            positionX: headPosition.left,
            value: !transaction.selection.empty,
          },
          content: this.genFunctionalToolbar(),
        });

        this.allExtensions.forEach((ext) => {
          ext?.options?.testHook?.({
            editor,
            transaction,
            headPosition,
            balloon: this.balloon,
            genToolbar: this.genToolbar,
            $createElement: this.$createElement,
          });
        });
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
        this.genBalloon(),
        this.genFieldset(),
        this.genTextFieldSlot(),
        this.genClearIcon(),
        this.genIconSlot(),
        this.genProgress(),
      ];
    },
    genBalloon() {
      const { $createElement, balloon } = this;

      return $createElement(VTiptapMenu, {
        ref: 'balloon',
        key: balloon.id,
        props: {
          top: true,
          eager: true,
          nudgeTop: 8,
          attach: this.$el,
          closeOnClick: false,
          closeOnContentClick: false,
          contentClass: 'v-tiptap-menu',
          ...balloon.props,
        },
      }, [balloon.content]);
    },
    genToolbar(options) {
      return this.$createElement(VTiptapToolbar, {
        ref: 'toolbar',
        on: {
          focus: () => {
            this.isFocused = true;
          },
          blur: (e) => {
            if (!this.$refs.input.$el.contains(e.target)) {
              this.onBlur(e);
            }

            this.editor.commands.unsetHighlight();
          },
        },
        ...options,
      });
    },
    genFunctionalToolbar() {
      const {
        editor,
        balloon,
        genToolbar,
        allExtensions,
        $createElement,
      } = this;

      const extensions = allExtensions;

      return genToolbar({
        props: {
          editor,
          content: groupExtensions({
            editor,
            balloon,
            extensions,
            genToolbar,
            $createElement,
          }),
        },
      });
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
      if (!this.$refs.balloon.$refs.content.contains(e.relatedTarget)) {
        this.balloon.reset();
      }
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
