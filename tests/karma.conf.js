'use strict';

/* eslint-disable global-require */

const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');

const rollupConfig = require('../rollup.config.dev');

function normalizeBrowser(browser) {
  return {
    chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
    firefox: 'Firefox',
    safari: 'Safari',
    ie: 'IE',
  }[browser.toLowerCase()] || browser;
}

module.exports = function setupKarma(config) {
  const altRollupPlugins = [
    babel({
      exclude: 'node_modules/**',
      runtimeHelpers: true,
      plugins: [
        require.resolve('../babel-plugin-supercall'),
        'external-helpers',
        ['transform-runtime', { helpers: false, polyfill: false }],
      ].concat(!config.customCollectCoverage ? [] : [
        ['istanbul', { include: ['src/**/*.js'] }],
      ]),
    }),
    commonjs({
      namedExports: {
        'node_modules/bluebird/js/browser/bluebird.js': ['delay'],
      },
    }),
  ];

  config.set({
    basePath: '..',

    browsers: (config.browsers.length > 0 ? config.browsers : ['ChromeHeadless']).map(normalizeBrowser),

    frameworks: ['mocha', 'sinon-chai'],

    files: ['src/polyfills/index.js'].concat(config.customFiles || [
      'src/components/**/*.js', // For generatoring coverage report for untested files
      'tests/spec/**/*.js',
    ]),

    preprocessors: {
      'src/**/*.js': ['rollup', 'sourcemap'], // For generatoring coverage report for untested files
      'tests/spec/**/*.js': ['rollup', 'sourcemap'],
    },

    rollupPreprocessor: Object.assign({}, rollupConfig, {
      plugins: rollupConfig.plugins.map(plugin => altRollupPlugins.find(altPlugin => altPlugin.name === plugin.name) || plugin),
      format: 'iife',
      moduleName: 'test',
      sourceMap: 'inline',
    }),

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-mocha'),
      require('karma-sinon-chai'),
      require('karma-sourcemap-loader'),
      require('karma-mocha-reporter'),
      require('karma-coverage'),
      require('karma-rollup-plugin'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ],

    reporters: (() => {
      const reporters = ['mocha'];
      if (config.customCollectCoverage) {
        reporters.push('coverage');
      }
      return reporters;
    })(),

    coverageReporter: Object.assign({
      dir: 'tests/coverage',
      reporters: [
        { type: 'html' },
        { type: 'text' },
      ],
    }, config.customFiles ? {} : {
      check: {
        each: {
          statements: 90,
          branches: 70,
          functions: 90,
          lines: 90,
          excludes: [
            'src/polyfills/**',
          ],
        },
      },
    }),

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    concurrency: Infinity,
  });
};

