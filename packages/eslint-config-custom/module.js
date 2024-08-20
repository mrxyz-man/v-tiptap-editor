module.exports = {
  extends: [
    './vanilla.js',
  ],
  settings: {
    'import/resolver': {
      typescript: true,
      alias: [['@', './lib']],
    },
  },
};
