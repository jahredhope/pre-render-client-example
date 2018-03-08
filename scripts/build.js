console.log('scripts/build.js START');

process.env.NODE_ENV = 'production';

const { promisify } = require('es6-promisify');

const webpack = promisify(require('webpack'));
const webpackConfigRender = require('../config/webpack.render.config.js');
const webpackConfigClient = require('../config/webpack.client.config.js');

function printStats(stats, buildName) {
  console.log(
    stats.toString({
      assets: true,
      chunks: false,
      children: false,
      colors: true
    })
  );

  if (stats.hasWarnings()) {
    console.warn(`Error occurred during build: ${buildName}`);
  }

  if (stats.hasErrors()) {
    throw Error(`Error occurred during build: ${buildName}`);
  }
}

const runWebpack = async () => {
  const clientStats = await webpack(webpackConfigClient());
  printStats(clientStats, 'Client');
  const manifestAssets = clientStats.toJson({ assets: true, chunks: false })
    .assetsByChunkName;
  console.log('manifestAssets', manifestAssets);
  const renderStats = await webpack(webpackConfigRender({ manifestAssets }));
  printStats(renderStats, 'Render');
};

runWebpack()
  .then(() => console.log('Build complete!'))
  .catch(() => process.exit(1));
