const config = {
  mode: 'production',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.(js|ts)/,
        include: /src/,
        use: {
          loader: 'istanbul-instrumenter-loader',
          options: { esModules: true },
        },
        enforce: 'post',
      },
    ],
  },
};

module.exports = () => {
  return config;
};
