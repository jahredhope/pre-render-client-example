const path = require('path');

const rootDir = process.cwd();

const fromRoot = dir => path.join(rootDir, dir);

module.exports.clientEntry = fromRoot('src/client');
module.exports.renderEntry = fromRoot('src/render');
module.exports.dist = fromRoot('dist');
