const path = require('path');

module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['prettier'],
  plugins: ['prettier', 'import'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  rules: {
    strict: 0,
    // 'arrow-parens': ['error', 'always'],
    curly: ['error', 'multi-line'],
    'import/no-unresolved': ['error', { caseSensitive: true }],
    // erro caso não reconhecer algum require/import
    // packageDir: avisa que algumas dependências podem estar na raiz do repositório
    // devDependecies: permite que sejam importadas devDependencies em arquivos de teste unitário
    'import/no-extraneous-dependencies': [
      'error',
      { packageDir: [__dirname], devDependencies: ['**/*.test.js'] },
    ],
    'no-confusing-arrow': ['error', { allowParens: true }],
    'no-param-reassign': ['error', { props: false }],
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: { if: 'any' } }],
    'prettier/prettier': ['error'],
    radix: ['error', 'as-needed'],
  },
};
