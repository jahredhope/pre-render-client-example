const StaticSiteGeneratorPlugin = require('static-site-generator-webpack-plugin');

const { jsLoaders, svgLoaders, imageLoaders } = require('./loaders');
const { renderEntry, dist } = require('./paths');

const isProductionBuild = process.env.NODE_ENV === 'production';
const webpackMode = isProductionBuild ? 'production' : 'development';

const config = ({ manifestAssets }) => ({
  mode: webpackMode,
  entry: {
    render: renderEntry
  },
  target: 'node',
  output: {
    path: dist,
    filename: isProductionBuild
      ? 'node-[name]-[chunkHash].js'
      : 'node-[name].js',
    libraryTarget: 'umd'
  },
  module: {
    rules: [...jsLoaders, ...imageLoaders, ...svgLoaders]
  },
  plugins: [
    // new webpack.DefinePlugin(envVars),
    new StaticSiteGeneratorPlugin({
      entry: 'render',
      locals: {
        manifestAssets
      }
    })
  ]
});

module.exports = config;
