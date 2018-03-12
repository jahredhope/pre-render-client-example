import { matchPath } from 'react-router';
import loadAuthorChunk, { clear as clearAuthorChunk } from './author';

export function preloadChunksForPath(path, { clearCache = false } = {}) {
  const promises = [];
  if (matchPath(path, { path: '/author/:id' })) {
    promises.push(loadAuthorChunk());
  } else if (clearCache) {
    clearAuthorChunk();
  }
  return Promise.all(promises);
}

export function entriesToPreload(path) {
  const promises = [];
  if (matchPath(path, { path: '/author/:id' })) {
    promises.push('author');
  }
  return promises;
}
