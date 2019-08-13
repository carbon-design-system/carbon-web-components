'use strict';

const fs = require('fs');
const { promisify } = require('util');
const { createFilter } = require('rollup-pluginutils');
const nodeResolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const svgResultCarbonIcon = require('./rollup-plugin-svg-result-carbon-icon');

const readFile = promisify(fs.readFile);
const scssFilter = createFilter('**/*.scss');

module.exports = {
  plugins: [
    nodeResolve({
      mainFields: ['module', 'main'],
      extensions: ['.js', '.ts'],
    }),
    {
      load(id) {
        if (scssFilter(id)) {
          // TODO: Consider a Rollup plugin here
          return readFile(id.replace(/[\\/]src[\\/]/i, '/es/').replace(/\.scss$/, '.css.js'), 'utf8');
        }
        return undefined;
      },
    },
    svgResultCarbonIcon({
      include: 'node_modules/**/@carbon/icons/**',
    }),
    babel({
      exclude: /node_modules[\\/](?!(lit|@webcomponents|@carbon[\\/]icons))/,
      extensions: ['.js', '.ts'],
      runtimeHelpers: true,
      presets: [
        [
          '@babel/preset-env',
          {
            modules: false,
            targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
          },
        ],
      ],
      plugins: [['@babel/plugin-transform-runtime', { version: '7.3.0' }]],
    }),
    commonjs(),
  ],
};
