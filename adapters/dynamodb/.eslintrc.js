const path = require('path');

module.exports = {
  extends: '../../.eslintrc.js',
  rules: {
    // override parent rule to consider current package dependencies too
    'import/no-extraneous-dependencies': [
      'error',
      {
        packageDir: [__dirname, path.join(__dirname, '../../')],
        devDependencies: ['**/*.test.js'],
      },
    ],
  },
};
