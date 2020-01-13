const path = require('path');

module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
    jest: true,
  },
  extends: ['airbnb-base', 'prettier'],
  plugins: ['prettier', 'import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  ignorePatterns: ['dist'],
  rules: {
    // eslint can't find devDependency installed on root level, ignoring rule for now
    'import/no-extraneous-dependencies': ['off'],
    // 'arrow-parens': [2, 'as-needed'],
    // 'class-methods-use-this': 'off',
    // 'consistent-return': 'off',
    // curly: ['error', 'multi', 'consistent'],
    // // descobrir pq essa regra não funciona
    // // 'import/core-modules': [2, 'aws-sdk'],
    // 'import/no-unresolved': [2, { caseSensitive: true, ignore: ['@/*'] }],
    // 'import/prefer-default-export': 'off',
    // 'no-confusing-arrow': ['error', { allowParens: true }],
    // 'no-eval': 'off',
    // 'no-new': 'off',
    // 'no-plusplus': 'off',
    // 'no-restricted-syntax': 'off',
    // 'no-throw-literal': 'off',
    // // 'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    // // 'no-underscore-dangle': 'off',
    // 'no-use-before-define': 'off',
    // 'nonblock-statement-body-position': ['error', 'beside', { overrides: { if: 'any' } }],
    // 'prefer-promise-reject-errors': 'off',
    // 'prettier/prettier': ['error'],
    // radix: [2, 'as-needed'],
  },
};
