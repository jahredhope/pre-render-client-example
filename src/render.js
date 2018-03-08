import React from 'react';
import { renderToString } from 'react-dom/server';
import { renderStylesToString } from 'emotion-server';

import App from './App';
console.log('render.js');

export default function render({ manifestAssets }) {
  console.log('render()', manifestAssets);
  const jsScripts = Object.values(manifestAssets)
    .map(jsEntry => `<script type="text/javascript" src="${jsEntry}"></script>`)
    .join('\n');
  const appHtml = renderStylesToString(renderToString(<App />));
  return `
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
  `;
}
