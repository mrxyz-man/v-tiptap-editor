module.exports = {
  extends: [
    'plugin:vue/strongly-recommended',
    'plugin:vue-pug/strongly-recommended',
  ],
  plugins: [
    'vue',
  ],
  env: {
    'browser': true,
    'es2024': true,
  },
  parser: 'vue-eslint-parser',
  parserOptions: {
    'sourceType': 'module',
    'ecmaVersion': 2024,
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  rules: {
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/max-attributes-per-line': ['error', {
      "singleline": {
        "max": 4
      },
    }],
    'vue/v-slot-style': ['error', {
      'atComponent': 'v-slot',
      'default': 'v-slot',
      'named': 'longform',
    }],
    'vue/html-quotes': [ 'error', 'double', { 'avoidEscape': false } ],
  },
}
