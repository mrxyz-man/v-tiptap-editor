import { divider } from '@/renders';

const GROUP_SYMBOL_TYPES = {
  divider: 1,
};

const GROUP_SYMBOL_DATA = {
  [GROUP_SYMBOL_TYPES.divider]: {
    id: GROUP_SYMBOL_TYPES.divider,
    render: divider,
    symbol: '|',

    shouldShow(count) {
      return count > 1;
    },
  },
};

const GROUP_SYMBOL_LIST = Object.values(GROUP_SYMBOL_DATA);

const getGroupSymbolInstance = (symbol) => (
  GROUP_SYMBOL_LIST.find((i) => i.symbol === symbol)
);

const isGroupSymbol = (value) => {
  const symbol = getGroupSymbolInstance(value);

  return !!GROUP_SYMBOL_DATA[symbol?.id];
};

export default ({
  editor,
  config,
  extensions,
  $createElement,
}) => {
  const items = config?.items || [];

  const itemsWithExtensions = items.filter((i) => {
    const extsNames = i?.exts || [];
    const extsInstances = extsNames.map(
      (extName) => extensions.find((extInst) => (
        extInst.name === extName
      )),
    ).filter(Boolean);

    return !!extsInstances.length;
  });

  let count = itemsWithExtensions.length > 0 ? itemsWithExtensions.length : 0;
  const elements = items.map((i) => {
    const extsNames = i?.exts || [];
    const extsInstances = extsNames.map(
      (extName) => extensions.find((extInst) => (
        extInst.name === extName
      )),
    ).filter(Boolean);

    if (isGroupSymbol(i)) {
      const symbolInst = getGroupSymbolInstance(i);

      if (symbolInst.shouldShow(count)) {
        count -= 1;
        return symbolInst.render({
          editor,
          $createElement,
        });
      }
    }

    if (!i.render) return null;

    return i.render({
      editor,
      $createElement,
      extensions: extsInstances,
    });
  });

  return $createElement('div', {
    staticClass: 'd-flex',
  }, elements);
};
