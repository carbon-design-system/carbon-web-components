'use strict';

const path = require('path');
const rollup = require('rollup');
const rollupConfigDev = require('../rollup.config.dev');
const rollupConfigProd = require('../rollup.config.prod');

const config = require('./config');

module.exports = {
  scripts() {
    return Promise.all(Object.keys(config.bundle).map(moduleName =>
      rollup.rollup(Object.assign(process.env.NODE_ENV === config.ENV_PRODUCTION ? rollupConfigProd : rollupConfigDev, {
        entry: path.join(config.srcDir, config.bundle[moduleName]),
      }))
      .then(bundle => bundle.write({
        format: 'iife',
        moduleName,
        dest: path.join(config.destDir, `${moduleName}.js`),
        sourceMap: true,
      }))));
  },
};
