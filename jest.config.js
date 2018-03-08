const path = require('path');

const rootDir = process.cwd();

const fromRoot = dir => path.join(rootDir, dir);

module.exports = {
  setupFiles: [fromRoot('jest_setup')],
  snapshotSerializers: ['enzyme-to-json/serializer']
};
