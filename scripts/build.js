const path = require('path');
// const { spawnSync } = require('child_process');
const runRender = require('./runRender');

console.log('scripts/build.js START');

process.env.NODE_ENV = 'production';
// process.env.NODE_ENV = 'development';

const { promisify } = require('es6-promisify');

const webpack = promisify(require('webpack'));
const webpackConfigRender = require('../config/webpack.render.config.js');
const webpackConfigClient = require('../config/webpack.client.config.js');

const publicPath = '/';

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
    console.warn(`Above warning(s) occurred during build: ${buildName}`);
  }

  if (stats.hasErrors()) {
    console.error(`Above error(s) occurred during build: ${buildName}`);
    throw Error(`Error occurred during build: ${buildName}`);
  }
}

const runWebpack = async () => {
  const clientStats = await webpack(
    webpackConfigClient({ assetsPublicPath: publicPath })
  );
  printStats(clientStats, 'Client');
  const { assetsByChunkName } = clientStats.toJson({
    assets: true,
    chunks: false
  });

  const renderStats = await webpack(
    webpackConfigRender({
      assetsPublicPath: publicPath,
      manifestAssets: assetsByChunkName
    })
  );
  printStats(renderStats, 'Render');
  return [clientStats, renderStats];
};

runWebpack()
  .then(stats => {
    console.log('Build complete!');
    const renderStats = stats[1].toJson({ assets: true, chunks: false });
    const outputPath = renderStats.outputPath;
    console.log('outputPath', outputPath);
    const renderEntry = stats[1].toJson({ assets: true }).assetsByChunkName
      .render;
    const manifestEntry = 'manifest.json';

    runRender({
      entry: path.join(outputPath, renderEntry),
      manifestEntry: path.join(outputPath, manifestEntry),
      paths: ['/', '/book/:id', '/author/:id', '/fake'],
      outputPath,
      publicPath
    });
    // spawnSync(
    //   'node',
    //   [
    //     'bin/runRender',
    //     '--entry',
    //     path.join(outputPath, renderEntry),
    //     '--manifest',
    //     path.join(outputPath, manifestEntry),
    //     '--output',
    //     outputPath,
    //     '--publicPath',
    //     publicPath
    //   ],
    //   {
    //     stdio: 'inherit',
    //     cwd: process.cwd()
    //   }
    // );
  })
  .catch(error => {
    console.error('runWebpack Catch Error', error);
    process.exit(1);
  });
