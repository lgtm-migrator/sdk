module.exports = {
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  extends: ['prettier', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    // required to enable spread operator
    ecmaVersion: 9,
  },
  plugins: ['prettier', 'import'],
  root: true,
  rules: {
    // requires arrow parens to always be present even with 1 argument
    'arrow-parens': ['error', 'always'],
    // requires brackets on all ifs that are multiline
    curly: ['error', 'multi-line'],
    'import/no-unresolved': ['error', { caseSensitive: true }],
    // allows use of dev-dependencies on unit tests but not on src
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [__dirname],
        devDependencies: ['**/*.test.js'],
      },
    ],
    'no-confusing-arrow': ['error', { allowParens: true }],
    // allow reassing of parameters only on objects
    'no-param-reassign': ['error', { props: false }],

    'no-trailing-spaces': ['error'],
    'nonblock-statement-body-position': ['error', 'beside', { overrides: { if: 'any' } }],
    'prettier/prettier': ['error'],
    radix: ['error', 'as-needed'],
  },
};
