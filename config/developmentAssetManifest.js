const hash = 'development';

module.exports = {
  client: `assets/web-client-${hash}.js`,
  bigfile: `assets/chunk-bigfile-development.js`,
  author: `assets/chunk-author-development.js`,
  'vendors~client': `assets/chunk-vendors~client-${hash}.js`
};
