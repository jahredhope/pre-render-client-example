import 'babel-polyfill';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { StaticRouter } from 'react-router';
import { getBundles } from 'react-loadable/webpack';
import Loadable from 'react-loadable';

import App from './App';

const renderScript = src =>
  `<script type="text/javascript" src="${src}"></script>`;

export default function render({ manifestAssets, loadableStats, path }) {
  if (!manifestAssets.vendor) {
    throw new Error('Missing vendor chunk');
  }
  if (!manifestAssets.client) {
    throw new Error('Missing client chunk');
  }

  return new Promise(async (resolve, _reject) => {
    console.log('render()', path);
    const context = {};
    const modules = [];
    await Loadable.preloadAll();
    const appHtml = renderStylesToString(
      renderToString(
        // eslint-disable-next-line react/jsx-no-bind
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
          <StaticRouter location={path} context={context}>
            <App />
          </StaticRouter>
        </Loadable.Capture>
      )
    );
    const publicPath = '/';
    console.log('got some modules', modules);
    const bundles = getBundles(loadableStats, modules);
    console.log('got some bundles', bundles);
    const bundleScripts = bundles
      .map(bundle => bundle.file)
      .map(src => `${publicPath}${src}`)
      .map(renderScript)
      .join('\n');
    resolve(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        ${renderScript(manifestAssets.manifest)}
        ${bundleScripts}
        ${renderScript(manifestAssets.vendor)}
        ${renderScript(manifestAssets.client)}
      </body>
    </html>
      `);
  });
}
