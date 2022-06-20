module.exports = {
  env: {
    browser: true,
    es6: true,
    es2021: true,
    node: true,
  },
  parser: 'vue-eslint-parser',
  extends: '@antfu/eslint-config-ts',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [{
    files: '*.vue',
    rules: {
      'vue/component-tags-order': 'off',
      '@typescript-eslint/quotes': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'curly': 'off',
      'vue/no-mutating-props': 'off',

    },
  },
  {
    files: '*.{ts,vue}',
    rules: {
      'no-console': 'off',
    },
  },
  ],
  root: true,
}
