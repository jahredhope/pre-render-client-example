const fs = require('fs-extra');
const path = require('path');

function travAssets(manifestAssets, publicPath) {
  const assets = {};
  Object.entries(manifestAssets).forEach(([chunkName, chunkPath]) => {
    assets[chunkName.replace(/\.js$/gi, '')] = path.join(publicPath, chunkPath);
  });
  return assets;
}

module.exports = function runRender({
  webAssets,
  nodeAssets,
  publicPath,
  outputPath,
  paths,
  loadableStats
}) {
  console.log('webAssets', webAssets)
  console.log('nodeAssets', nodeAssets)
  console.log('outputPath', outputPath);

  const render = require(path.join(outputPath, nodeAssets.render)).default;
  const manifest = require(path.join(outputPath, 'manifest.json'));

  const assets = travAssets(manifest, publicPath);

  Promise.all(
    paths.map(async dir => {
      try {
        const html = await render({
          manifestAssets: assets,
          loadableStats,
          path: dir
        });
        console.log('Successfully rendered: ', dir);
        return [dir, html];
      } catch (error) {
        const errorMsg = `Error rendering: ${dir}`;
        console.log(`Error rendering: ${dir}`, error);
        throw new Error(`${errorMsg}\n${error}`);
      }
    })
  ).then(values =>
    values.map(([dir, html]) => {
      const filePath = path.join(outputPath, dir, 'index.html');
      try {
        fs.ensureDirSync(path.dirname(filePath));
        fs.writeFileSync(filePath, html);
        console.log('Successfully created:', filePath);
      } catch (error) {
        console.error('Error writing file:', filePath);
        throw error;
      }
    })
  );
};
