const path = require('path');
const fs = require('fs');
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
  const { stats } = await webpack([
    webpackConfigClient({ assetsPublicPath: publicPath }),
    webpackConfigRender({ assetsPublicPath: publicPath })
  ]);

  printStats(stats[0], 'Client');
  printStats(stats[1], 'Render');
  return stats;
};

runWebpack()
  .then(stats => {
    console.log('Build complete!');
    const { outputPath, assetsByChunkName: webAssets } = stats[0].toJson({
      assets: true
    });
    const nodeAssets = stats[1].toJson({ assets: true }).assetsByChunkName;
    console.log('outputPath', outputPath);
    const manifestEntry = 'manifest.json';

    const loadableStats = JSON.parse(
      fs.readFileSync(path.join(outputPath, 'react-loadable.json'), 'utf8')
    );
    console.log('Loaded loadable stats');

    runRender({
      manifestEntry: path.join(outputPath, manifestEntry),
      paths: ['/', '/book/:id', '/author/:id', '/fake'],
      webAssets,
      nodeAssets,
      loadableStats,
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
