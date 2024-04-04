import VBtnToggle from 'vuetify/lib/components/VBtnToggle/VBtnToggle';
import VIcon from 'vuetify/lib/components/VIcon/VIcon';
import VBtn from 'vuetify/lib/components/VBtn/VBtn';

export const TYPES = {
  bold: 1,
  italic: 2,
  underline: 3,
};

export const TYPES_DATA = {
  [TYPES.bold]: {
    id: TYPES.bold,
    value: 'bold',
    icon: 'mdi-format-bold',
    command: 'toggleBold',
  },
  [TYPES.italic]: {
    id: TYPES.italic,
    value: 'italic',
    icon: 'mdi-format-italic',
    command: 'toggleItalic',
  },
  [TYPES.underline]: {
    id: TYPES.underline,
    value: 'underline',
    icon: 'mdi-format-underline',
    command: 'toggleUnderline',
  },
};

export const TYPES_LIST = Object.values(TYPES_DATA);

export const genFormatingBtns = ({
  editor,
  $createElement,
}) => TYPES_LIST.map((type) => ({
  type,
  content: $createElement(VBtn, {
    props: { value: type.value, text: true },
    on: {
      click: () => {
        if (editor.commands[type.command]) {
          editor.commands[type.command]();
        }
      },
    },
  }, [
    $createElement(VIcon, {
      props: { small: true },
    }, [type.icon]),
  ]),
}));

export const genFormatings = ({ editor, $createElement }) => {
  const btns = genFormatingBtns({ editor, $createElement });

  return $createElement(VBtnToggle, {
    props: {
      multiple: true,
      borderless: true,
      value: btns
        .filter((item) => editor.isActive(item.type.value))
        .map((item) => item.type.value),
    },
  }, [btns.map((item) => item.content)]);
};

export default {
  TYPES,
  TYPES_DATA,
  TYPES_LIST,

  genFormatings,
  genFormatingBtns,
};
