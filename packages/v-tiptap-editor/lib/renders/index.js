import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VBtn from 'vuetify/lib/components/VBtn/VBtn';
import VBtnToggle from 'vuetify/lib/components/VBtnToggle/VBtnToggle';
import VSelect from 'vuetify/lib/components/VSelect/VSelect';
import VDivider from 'vuetify/lib/components/VDivider/VDivider';

export const btn = ({
  item,
  props,
  editor,
  options,
  $createElement,
}) => $createElement(VBtn, {
  attrs: {
    tabindex: '-1',
  },
  props: {
    text: true,
    value: item.id,
    ...props || {},
  },
  on: {
    click: () => {
      item.callCommand(editor);
    },
  },
  ...options,
}, [
  $createElement(VIcon, {
    props: {
      small: true,
    },
  }, [item.icon]),
]);

export const btnToggle = ({
  editor,
  extensions,
  $createElement,
}) => $createElement(VBtnToggle, {
  props: {
    multiple: true,
    borderless: true,
    value:
      extensions
        .flatMap((ext) => ext.options.groupSerializer(ext))
        .filter((i) => editor.isActive(...i.value))
        .map((i) => i.id),
  },
}, [
  ...extensions
    .flatMap((ext) => ext.options.groupSerializer(ext))
    .map((i) => i.render({ editor, $createElement })),
]);

export const select = ({
  editor,
  extensions,
  $createElement,
}) => $createElement(VSelect, {
  attrs: {
    tabindex: '-1',
  },
  props: {
    flat: true,
    solo: true,
    height: '46px',
    menuProps: {
      nudgeTop: 8,
      nudgeLeft: 4,
    },
    itemText: 'name',
    itemValue: 'value',
    singleLine: true,
    hideDetails: true,
    returnObject: true,
    value:
      extensions
        .flatMap((ext) => ext.options.groupSerializer(ext))
        .filter((i) => editor.isActive(...i.value))
        .pop(),
    items: extensions.flatMap((ext) => ext.options.groupSerializer(ext)),
  },
  style: {
    maxWidth: '160px',
  },
  on: {
    change: (i) => {
      i.callCommand(editor);
    },
  },
});

export const inline = ({
  editor,
  extensions,
  $createElement,
}) => $createElement('div', {
  staticClass: 'd-flex',
}, [
  ...extensions
    .flatMap((ext) => ext.options.groupSerializer(ext))
    .map((i) => i.render({
      editor,
      $createElement,
    })),
]);

export const divider = ({
  $createElement,
}) => $createElement(VDivider, {
  class: 'my-1 mx-1',
  props: {
    vertical: true,
  },
});

export default {
  btn,
  inline,
  select,
  divider,
  btnToggle,
};
