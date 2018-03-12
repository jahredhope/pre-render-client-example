const { jsLoaders, svgLoaders, imageLoaders } = require('./loaders');
const { renderEntry, dist } = require('./paths');

const isProductionBuild = process.env.NODE_ENV === 'production';
const webpackMode = isProductionBuild ? 'production' : 'development';

const config = ({ manifestAssets }) => {
  if (!manifestAssets) {
    throw new Error(
      `Missing manifestAssets: Render must be able to link to web assets`
    );
  }
  return {
    mode: webpackMode,
    entry: {
      render: renderEntry
    },
    target: 'node',
    output: {
      path: dist,
      publicPath: '/',
      filename: isProductionBuild
        ? 'node-[name]-[chunkHash].js'
        : 'node-[name]-development.js',
      libraryTarget: 'umd'
    },
    module: {
      rules: [...jsLoaders, ...imageLoaders, ...svgLoaders]
    },
    node: {
      fs: 'empty',
      path: 'empty'
    },
    plugins: []
  };
};

module.exports = config;
