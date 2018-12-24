'use strict';

const minimist = require('minimist');

module.exports = {
  ENV_PRODUCTION: 'production',
  cloptions: minimist(process.argv.slice(2), {
    alias: {
      b: 'browser',
      d: 'debug',
      f: 'files',
      k: 'keepalive',
    },
    boolean: ['debug', 'keepalive'],
  }),
  srcDir: 'src',
  destDir: 'public',
  viewsDir: 'views',
  testsDir: 'tests',
  jsDocDir: 'docs/js',
  tasksDir: 'gulp-tasks',
  bundle: {
    'carbon-custom-elements': 'index.js',
    'carbon-custom-elements-polyfills': 'polyfills/index.js',
    'carbon-custom-elements-with-polyfills': 'index-with-polyfills.js',
  },
};
