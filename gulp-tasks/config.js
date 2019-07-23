'use strict';

const path = require('path');
const commander = require('commander');

const collect = (v, a) => a.add(v);
const { browser: browsers, spec: specs, ...rest } = commander
  .option('-b, --browser [browser]', 'Browser to test with (ChromeHeadless or Chrome) for Karma testing', collect, new Set())
  .option(
    '-d, --debug',
    'Disables collection of code coverage for Karma testing, useful for runinng debugger against specs or sources'
  )
  .option('-e, --use-experimental-features', 'Build with experimental features turned on (For dev build only)')
  .option('-k, --keepalive', 'Keeps browser open after first run of Karma test finishes')
  .option('-r, --random', 'Enable random execution order of tests')
  .option('-s, --spec [file]', 'Spec files to run for Karma testing', collect, new Set())
  .option('--verbose', 'Enables verbose output')
  .parse(process.argv);
const cloptions = { browsers: Array.from(browsers), specs: Array.from(specs), ...rest };

module.exports = {
  ENV_PRODUCTION: 'production',
  cloptions,
  srcDir: 'src',
  iconsDir: path.dirname(require.resolve('@carbon/icons/lib')),
  destDir: 'public',
  jsDestDir: 'es',
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
