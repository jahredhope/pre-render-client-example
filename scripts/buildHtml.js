// const path = require('path');
// const { spawnSync } = require('child_process');
const runRender = require('./runRender');

console.log('scripts/build.js START');

// process.env.NODE_ENV = 'production';
process.env.NODE_ENV = 'development';

runRender({
  entry:
    '/Users/jhope/code/pre-render-client-example/dist/node-render-development.js',
  manifestEntry:
    '/Users/jhope/code/pre-render-client-example/dist/manifest.json',
  outputPath: '/Users/jhope/code/pre-render-client-example/dist',
  publicPath: '/'
});
