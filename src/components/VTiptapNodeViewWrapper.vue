<template lang="pug">
  node-view-wrapper.node-view-wrapper(
    @dragstart.native="onDragStart"
    @dragend.native="onDragEnd"
  )
    div.ghost(ref="ghost")
    v-hover(v-slot="{ hover }")
      div
        div(v-if="(isSelected && editor.isFocused) || hover")
          v-btn(
            fab
            top
            x-small
            absolute
            depressed
            :color="getColor({ hover, isSelected })"
            :dark="!(isSelected && editor.isFocused)"
            style="transform: translate(100%, 0);"
            @click="() => setParagraph(CONTENT_POSITIONS.before)"
          )
            v-icon mdi-keyboard-return
          v-overlay(
            :color="getColor({ hover, isSelected })"
            style="margin: -.2em; font-size: initial;"
            opacity="1"
            z-index="0"
            absolute
          )
          v-btn(
            fab
            right
            x-small
            bottom
            absolute
            depressed
            :color="getColor({ hover, isSelected })"
            :dark="!(isSelected && editor.isFocused)"
            style="transform: translate(-100%, 0);"
            @click="() => setParagraph(CONTENT_POSITIONS.after)"
          )
            v-icon mdi-keyboard-return
        slot
</template>

<script>
import { NodeViewWrapper } from '@tiptap/vue-2';

const CONTENT_POSITIONS = {
  before: 1,
  after: 2,
};

const CONTENT_POSITIONS_DATA = {
  [CONTENT_POSITIONS.before]: {
    getPos: (nodePos, nodeSize) => nodePos - nodeSize,
  },
  [CONTENT_POSITIONS.after]: {
    getPos: (nodePos, nodeSize) => nodePos + nodeSize,
  },
};

export default {
  components: {
    NodeViewWrapper,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
      required: true,
    },
    node: {
      type: Object,
      required: true,
    },
    getPos: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      isSelected: false,

      CONTENT_POSITIONS,
    };
  },
  watch: {
    selected: {
      handler(val) {
        this.isSelected = val;
      },
      immediate: true,
    },
  },
  methods: {
    getColor({ hover, isSelected }) {
      const { isFocused } = this.editor;

      if (isSelected && isFocused) return 'primary';
      if (hover) return 'yellow darken-2';

      return '';
    },
    setParagraph(position) {
      const { getPos, node } = this;
      const currentNodePos = getPos();
      const currentNodeSize = node.nodeSize;
      const posData = CONTENT_POSITIONS_DATA[position];
      const targetPos = posData.getPos(currentNodePos, currentNodeSize);

      this.editor
        .chain()
        .focus()
        .insertContentAt(targetPos, { type: 'paragraph' })
        .run();
    },
    onDragStart(e) {
      const [node] = this.$slots.default;
      const nodePos = node.elm.getBoundingClientRect();
      const ghostElm = node.elm.cloneNode(true);

      ghostElm.classList.add('dragging');
      this.$refs.ghost.appendChild(ghostElm);

      e.dataTransfer.setDragImage(
        ghostElm,
        (e.clientX - nodePos.x) / (nodePos.width / ghostElm.offsetWidth),
        (e.clientY - nodePos.y) / (nodePos.height / ghostElm.offsetHeight),
      );
    },
    onDragEnd() {
      if (this.$refs.ghost.children.length) {
        this.$refs.ghost.replaceChildren();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.node-view-wrapper {
  position: relative;
  cursor: default;
}

.ghost {
  position: fixed;
  left: -9999px;

  ::v-deep .dragging {
    max-width: 320px;
  }
}
</style>
