'use strict';

const { readFile } = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFileAsync = promisify(readFile);

/**
 * A WebPack loader that takes a fake resource path,
 * finds the corresponding source file path that can generate the content for the fake resource path from, and loads it.
 * @returns {string} The massaged module content.
 */
function reactCustomElementTypeSourceLoader() {
  const callback = this.async();
  const { resourcePath } = this;
  const relativePath = path.relative(path.resolve(__dirname, 'es/components-react'), resourcePath);
  const src = path.resolve(__dirname, 'src/components', relativePath).replace(/\.js$/, '.ts');
  readFileAsync(src, 'utf8').then(contents => {
    this.resourcePath = src; // Changes `resourcePath` so `babel-loader` sees it's loaded from `src`
    callback(null, contents);
  }, callback);
}

module.exports = reactCustomElementTypeSourceLoader;
