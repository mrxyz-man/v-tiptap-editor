
module.exports = {
  extends: [
    './vue2.js',
  ],
  overrides: [
    {
      files: ['pages/**/*.vue', 'layouts/*.vue'],
      rules: {
        'vue/multi-word-component-names': 'off',
      },
    },
  ],
}
