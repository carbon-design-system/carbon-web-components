'use strict';

/**
 * A WebPack loader to generate `lit-element`'s `CSSResult` from CSS string.
 * @returns {string} The massaged module content.
 */
function cssResultLoader(fileContent) {
  return `
    import { css } from 'lit-element';
    export default css([${JSON.stringify(fileContent)}]);
  `;
}

module.exports = cssResultLoader;
