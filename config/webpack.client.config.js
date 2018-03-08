const CleanWebpackPlugin = require('clean-webpack-plugin');

const { jsLoaders, svgLoaders, imageLoaders } = require('./loaders');
const { clientEntry, dist } = require('./paths');

const isProductionBuild = process.env.NODE_ENV === 'production';
const webpackMode = isProductionBuild ? 'production' : 'development';

const config = () => ({
  mode: webpackMode,
  entry: {
    client: clientEntry
  },
  target: 'web',
  output: {
    path: dist,
    filename: isProductionBuild
      ? 'web-[name]-[chunkHash].js'
      : 'assets/web-[name].js'
  },
  module: {
    rules: [...jsLoaders, ...imageLoaders, ...svgLoaders]
  },
  plugins: [new CleanWebpackPlugin([dist], { allowExternal: true })]
});

module.exports = config;
