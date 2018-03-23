const CleanWebpackPlugin = require('clean-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const { ReactLoadablePlugin } = require('react-loadable/webpack');

const { jsLoaders, svgLoaders, imageLoaders } = require('./loaders');
const { clientEntry, dist } = require('./paths');

const isProductionBuild = process.env.NODE_ENV === 'production';
const webpackMode = isProductionBuild ? 'production' : 'development';

const config = ({ assetsPublicPath }) => ({
  mode: webpackMode,
  entry: {
    client: ['babel-polyfill', clientEntry]
  },
  target: 'web',
  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'vendor'
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  output: {
    path: dist,
    publicPath: assetsPublicPath,
    chunkFilename: isProductionBuild
      ? 'chunk-[name]-[chunkHash].js'
      : 'assets/chunk-[name]-development.js',
    filename: isProductionBuild
      ? 'web-[name]-[chunkHash].js'
      : 'assets/web-[name]-development.js'
  },
  module: {
    rules: [...jsLoaders, ...imageLoaders, ...svgLoaders]
  },
  plugins: [
    new CleanWebpackPlugin([dist], { allowExternal: true }),
    new ManifestPlugin(),
    new ReactLoadablePlugin({
      filename: './dist/react-loadable.json'
    })
  ]
});

module.exports = config;
