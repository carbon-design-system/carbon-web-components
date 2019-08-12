'use strict';

const path = require('path');
const { createFilter } = require('rollup-pluginutils');
const createSVGResultFromCarbonIcon = require('./tools/svg-result-carbon-icon');

/**
 * @param {Object} [options] The plugin options.
 * @param {string} [options.include] The glob of module IDs to be included.
 * @param {string} [options.exclude] The glob of module IDs to be excluded.
 * @returns {Object} A Rollup plugin to generate `lit-element`'s `CSSResult` from CSS string.
 */
function svgResultCarbonIconRollupPlugin({ include, exclude } = {}) {
  const filter = createFilter(include, exclude);

  return {
    name: 'svg-result-carbon-icon',

    /**
     * @param {string} code The original icon code.
     * @param {string} id The module ID.
     * @returns {string} The massaged module content.
     */
    transform(code, id) {
      if (!filter(id)) {
        return undefined;
      }
      const descriptor = require(id); // eslint-disable-line global-require,import/no-dynamic-require
      return `
        import { svg } from 'lit-html';
        import spread from '${path.resolve(__dirname, 'src/globals/directives/spread')}';
        const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(descriptor)};
        export default svgResultCarbonIcon;
      `;
    },
  };
}

module.exports = svgResultCarbonIconRollupPlugin;
