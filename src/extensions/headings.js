import VSelect from 'vuetify/lib/components/VSelect/VSelect';

export const TYPES = {
  p: 1,
  h1: 2,
  h2: 3,
  h3: 4,
  h4: 5,
  h5: 6,
  h6: 7,
};

export const TYPES_DATA = {
  [TYPES.p]: {
    id: TYPES.p,
    name: 'Обычный',
    value: 'p',
    icon: 'mdi-format-paragraph',
    command: 'setParagraph',
    get activeParams() {
      return ['paragraph'];
    },
    callCommand(commands) {
      const { command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand();
    },
  },
  [TYPES.h1]: {
    id: TYPES.h1,
    name: 'Заголовок 1',
    value: 'h1',
    icon: 'mdi-format-header-1',
    command: 'toggleHeading',
    level: 1,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
  [TYPES.h2]: {
    id: TYPES.h2,
    name: 'Заголовок 2',
    value: 'h2',
    icon: 'mdi-format-header-2',
    command: 'toggleHeading',
    level: 2,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
  [TYPES.h3]: {
    id: TYPES.h3,
    name: 'Заголовок 3',
    value: 'h3',
    icon: 'mdi-format-header-3',
    command: 'toggleHeading',
    level: 3,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
  [TYPES.h4]: {
    id: TYPES.h4,
    name: 'Заголовок 4',
    value: 'h4',
    icon: 'mdi-format-header-4',
    command: 'toggleHeading',
    level: 4,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
  [TYPES.h5]: {
    id: TYPES.h5,
    name: 'Заголовок 5',
    value: 'h5',
    icon: 'mdi-format-header-5',
    command: 'toggleHeading',
    level: 5,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
  [TYPES.h6]: {
    id: TYPES.h6,
    name: 'Заголовок 6',
    value: 'h6',
    icon: 'mdi-format-header-6',
    command: 'toggleHeading',
    level: 6,
    get activeParams() {
      const { level } = this;
      return ['heading', { level }];
    },
    callCommand(commands) {
      const { level, command } = this;
      const targetCommand = commands[command];
      if (!targetCommand) return;
      targetCommand({ level });
    },
  },
};

export const TYPES_LIST = Object.values(TYPES_DATA);

export const genHeadings = ({ editor, $createElement }) => {
  const items = TYPES_LIST;

  return $createElement(VSelect, {
    props: {
      flat: true,
      solo: true,
      height: '46px',
      menuProps: {
        nudgeTop: 8,
        nudgeLeft: 4,
      },
      singleLine: true,
      hideDetails: true,
      itemText: 'name',
      itemValue: 'id',
      value: items
        .filter((item) => editor.isActive(...item.activeParams))
        .map((item) => item.id)
        .pop(),
      items,
    },
    style: {
      maxWidth: '160px',
    },
    on: {
      change: (val) => {
        TYPES_DATA[val].callCommand(editor.commands);
      },
    },
  }, []);
};

export default {
  TYPES,
  TYPES_DATA,
  TYPES_LIST,

  genHeadings,
};
