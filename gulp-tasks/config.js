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
      p: 'port',
      s: 'serverport',
    },
    boolean: ['debug', 'keepalive'],
    default: {
      port: 3000,
      serverport: 8080,
    },
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
