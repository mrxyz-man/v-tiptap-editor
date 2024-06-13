import VSelect from 'vuetify/lib/components/VSelect/VSelect';
import VBtnToggle from 'vuetify/lib/components/VBtnToggle/VBtnToggle';
import VDivider from 'vuetify/lib/components/VDivider/VDivider';

const TYPES = {
  formating: 'formating',
  heading: 'heading',
  history: 'history',
};

const TYPES_DATA = {
  [TYPES.formating]: {
    id: TYPES.formating,
    render: ({ extensions, $createElement, editor }) => $createElement(VBtnToggle, {
      props: {
        multiple: true,
        borderless: true,
        value: extensions
          .filter((i) => editor.isActive(...i.options.editorValue))
          .map((i) => i.options.value),
      },
    }, [...extensions.map((ext) => ext.options.render({
      editor,
      $createElement,
    }))]),
  },
  [TYPES.heading]: {
    id: TYPES.heading,
    render: ({ extensions, editor, $createElement }) => $createElement(VSelect, {
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
          contentClass: 'editor-included',
        },
        itemText: 'name',
        itemValue: 'value',
        singleLine: true,
        hideDetails: true,
        returnObject: true,
        value: extensions.flatMap((ext) => ext.options.groupSerializer(ext))
          .filter((i) => editor.isActive(...i.editorValue))
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
    }, []),
  },
  [TYPES.history]: {
    id: TYPES.history,
    render: ({ extensions, editor, $createElement }) => $createElement('div', {
      staticClass: 'd-flex',
    }, [
      ...extensions.flatMap((ext) => ext.options.groupSerializer(ext))
        .map((i) => i.render({
          editor,
          $createElement,
        })),
    ]),
  },
};

export default ({
  editor,
  extensions,
  $createElement,
}) => {
  const groups = extensions.reduce((acc, ext) => {
    const { options } = ext;
    if (!options?.group) return acc;
    if (acc[options.group]) {
      acc[options.group].push(ext);
      return acc;
    }

    return { ...acc, [options.group]: [ext] };
  }, {});

  const elements = Object.entries(groups).flatMap(([key, exts], index) => {
    const { render } = TYPES_DATA[key];
    const renderedGroup = render({
      editor,
      $createElement,
      extensions: exts,
    });

    // Inject VDivider between extensions
    if (index !== Object.entries(groups).length - 1) {
      return [renderedGroup, $createElement(VDivider, {
        class: 'my-1 mx-1',
        props: {
          vertical: true,
        },
      })];
    }

    return renderedGroup;
  });

  return $createElement('div', {
    class: 'd-flex',
  }, elements);
};
