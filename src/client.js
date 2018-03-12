import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { preloadChunksForPath } from './async';

import App from './App';

console.log('client.js START');

function clientRender() {
  preloadChunksForPath(window.location.pathname).then(() => {
    hydrate(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
      document.getElementById('root')
    );
  });
}

clientRender();
