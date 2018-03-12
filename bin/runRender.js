#!/usr/bin/env node
const args = require('args');

args
  .option('entry', 'entry script')
  .option('paths', 'paths to render')
  .option('manifest', 'manifest file')
  .option('output', 'output location')
  .option('publicPath', 'publicPath')

const flags = args.parse(process.argv);

const runRender = require('../scripts/runRender')

runRender({
  paths: JSON.parse(flags.paths),
  entry: flags.entry,
  manifest: flags.manifest,
  outputPath: flags.output,
  publicPath: flags.publicPath
})
