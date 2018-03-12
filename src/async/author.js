const authorChunk = {};

function loadAuthorChunk() {
  if (!authorChunk.imagePromise) {
    authorChunk.imagePromise = import(/* webpackChunkName: "author" */ '../components/AuthorImage')
      .then(_module => {
        authorChunk.image = _module.default;
      })
      .then(() => {
        return authorChunk.image;
      });
  }
}

export function clear() {
  authorChunk.image = undefined;
  authorChunk.imagePromise = undefined;
}

export default function load() {
  loadAuthorChunk();
  return authorChunk;
}
