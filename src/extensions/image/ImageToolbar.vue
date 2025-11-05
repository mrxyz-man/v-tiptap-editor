<template lang="pug">
  v-tiptap-toolbar(:editor="editor")
    div.d-flex
      v-btn-toggle(
        multiple
        borderless
        :value="activeActions"
      )
        component(
          v-for="action in actionTypesList"
          v-bind="action.component_attrs"
          v-on="action.component_listeners"
          :is="action.component"
          :key="action.id"
          tab-index="-1"
        )
          v-icon(small) {{ action.icon }}
</template>

<script>
import VBtn from 'vuetify/lib/components/VBtn/VBtn';
import VTiptapToolbar from '@/components/VTiptapToolbar.vue';

const ACTION_TYPES = {
  contain: 1,
  src: 2,
  remove: 3,
};

export default {
  components: {
    VTiptapToolbar,
  },
  props: {
    editor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    actionTypesData() {
      const {
        image,
        trash,
        linkEdit,
      } = this.editor.options.iconPack;

      return {
        [ACTION_TYPES.contain]: {
          id: ACTION_TYPES.contain,
          name: 'contain',
          icon: image,
          component: VBtn,
          get component_attrs() {
            const { name } = this;

            return {
              text: true,
              depressed: true,
              disabled: true,
              get value() {
                return name;
              },
            };
          },
          component_listeners: {
            click: () => this.editor.commands.toggleImageContain(),
          },
        },
        [ACTION_TYPES.src]: {
          id: ACTION_TYPES.src,
          name: 'src',
          icon: linkEdit,
          component: VBtn,
          get component_attrs() {
            const { name } = this;

            return {
              text: true,
              disabled: true,
              get value() {
                return name;
              },
            };
          },
          component_listeners: {
            click: () => {
              this.editor
                .chain()
                .focus()
                .showBubbleMenu({ key: 'image-add-url' })
                .run();
            },
          },
        },
        [ACTION_TYPES.remove]: {
          id: ACTION_TYPES.remove,
          name: 'remove',
          icon: trash,
          component: VBtn,
          get component_attrs() {
            const { name } = this;

            return {
              text: true,
              disabled: this.editor.options.readonly,
              get value() {
                return name;
              },
            };
          },
          component_listeners: {
            click: () => {
              this.editor.commands.deleteSelection();
            },
          },
        },
      };
    },
    actionTypesList() {
      return Object.values(this.actionTypesData);
    },
    activeActions() {
      const attrs = this.editor.getAttributes('image');

      return Object.entries(attrs)
        .filter(([key, value]) => (
          this.actionTypesList.map((i) => i.name).includes(key)
          && Boolean(value)
        ))
        .map(([key]) => key);
    },
  },
};
</script>
