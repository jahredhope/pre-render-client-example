console.log('scripts/start.js START');

process.env.NODE_ENV = 'development';

const webpack = require('webpack');
const webpackConfigRender = require('../config/webpack.render.config.js');
const webpackConfigClient = require('../config/webpack.client.config.js');
const opn = require('opn');

const webpackMiddleware = require('webpack-dev-middleware');
const express = require('express');

const MemoryFileSystem = require('memory-fs');

const manifestAssets = require('../config/developmentAssetManifest.js');
const assetsPublicPath = '/'

const compiler = webpack([
  webpackConfigClient({assetsPublicPath}),
  webpackConfigRender({ assetsPublicPath, manifestAssets })
]);

const memoryFs = new MemoryFileSystem();
compiler.outputFileSystem = memoryFs;

const app = express();

// app.use((req, res, next) => {
//   if (!/assets\//.test(req.url)) {
//     req.url = '/';
//   }
//   next();
// });

app.use(
  webpackMiddleware(compiler, {
    logLevel: 'trace',
    publicPath: '/'
  })
);

app.listen('8080', '127.0.0.1', (err, _result) => {
  if (err) {
    console.log(err);
    return;
  }
  const url = 'localhost:8080';

  console.log();
  console.log(`Starting the development server on ${url}...`);
  console.log();

  if (process.env.OPEN_TAB !== 'false') {
    opn(url);
  }
});
