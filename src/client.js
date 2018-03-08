import React from 'react';
import { hydrate } from 'react-dom';

import App from './App';

console.log('client.js START');

hydrate(<App />, document.getElementById('root'));
