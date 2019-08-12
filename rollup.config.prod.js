'use strict';

const { terser } = require('rollup-plugin-terser');

const rollupConfig = require('./rollup.config.dev');

module.exports = {
  ...rollupConfig,
  plugins: [...rollupConfig.plugins, terser()],
};
