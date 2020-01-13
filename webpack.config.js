const path = require('path');

const config = {
  mode: 'production',
  target: 'node',
  entry: './src/index.js',
  externals: ['aws-sdk'],
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve('dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },
};

module.exports = () => {
  return config;
};
