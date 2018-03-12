import 'babel-polyfill';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';
import { StaticRouter } from 'react-router';

import { preloadChunksForPath, entriesToPreload } from './async';

import App from './App';

export default function render({ manifestAssets, path }) {
  const scriptsToLink = [];
  entriesToPreload(path).forEach(chunkName => {
    const entryScript = manifestAssets[chunkName];
    if (!entryScript) {
      throw new Error(`No entry script found for chunk ${chunkName}`);
    }
    scriptsToLink.push(entryScript);
  });

  if (!manifestAssets.vendor) {
    throw new Error('Missing vendor chunk');
  }
  scriptsToLink.push(manifestAssets.vendor);

  if (!manifestAssets.client) {
    throw new Error('Missing client chunk');
  }
  scriptsToLink.push(manifestAssets.client);

  return new Promise(async (resolve, _reject) => {
    await preloadChunksForPath(path, { clearCache: true });

    console.log('render()', path);
    const jsScripts = scriptsToLink
      .map(
        jsEntry => `<script type="text/javascript" src="${jsEntry}"></script>`
      )
      .join('\n');
    const context = {}
    const appHtml = renderStylesToString(
      renderToString(
        <StaticRouter location={path} context={context}>
          <App />
        </StaticRouter>
      )
    );
    resolve(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
      </head>
      <body>
        <div id="root">${appHtml}</div>
        ${jsScripts}
      </body>
    </html>
      `);
  });
}
