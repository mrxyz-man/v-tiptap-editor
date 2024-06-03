import VSelect from 'vuetify/lib/components/VSelect/VSelect';
import VBtnToggle from 'vuetify/lib/components/VBtnToggle/VBtnToggle';

const TYPES = {
  formating: 'formating',
  heading: 'heading',
};

const TYPES_DATA = {
  [TYPES.formating]: {
    id: TYPES.formating,
    render: ({
      balloon,
      extensions,
      genToolbar,
      $createElement,
      editor,
    }) => $createElement(VBtnToggle, {
      props: {
        multiple: true,
        borderless: true,
        value: extensions
          .filter((i) => editor.isActive(...i.options.editorValue))
          .map((i) => i.options.value),
      },
    }, [...extensions.map((ext) => ext.options.render({
      editor,
      balloon,
      genToolbar,
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
};

export default ({
  editor,
  balloon,
  extensions,
  genToolbar,
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

  return $createElement('div', {
    class: 'd-flex',
  }, [
    ...Object.entries(groups).map(([key, exts]) => {
      const { render } = TYPES_DATA[key];

      return render({
        editor,
        balloon,
        genToolbar,
        $createElement,
        extensions: exts,
      });
    }),
  ]);
};
