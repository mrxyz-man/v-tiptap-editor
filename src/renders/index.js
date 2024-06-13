import VBtn from 'vuetify/lib/components/VBtn/VBtn';
import VIcon from 'vuetify/lib/components/VIcon/VIcon';

export default {
  toggle: ({
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
      value: item.value,
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
  ]),
};
