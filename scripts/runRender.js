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
  entry,
  publicPath,
  outputPath,
  paths,
  manifestEntry
}) {
  console.log('loading entry', entry);

  const render = require(entry).default;
  const manifest = require(manifestEntry);

  const assets = travAssets(manifest, publicPath);

  Promise.all(
    paths.map(async dir => {
      try {
        const html = await render({
          manifestAssets: assets,
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
