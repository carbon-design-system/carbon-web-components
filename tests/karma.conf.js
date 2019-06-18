'use strict';

/* eslint-disable global-require */

const path = require('path');

function normalizeBrowser(browser) {
  return (
    {
      chrome: `Chrome${process.env.TRAVIS ? '_Travis' : ''}`,
      firefox: 'Firefox',
      safari: 'Safari',
      ie: 'IE',
    }[browser.toLowerCase()] || browser
  );
}

module.exports = function setupKarma(config) {
  const { browsers, collectCoverage, specs, random, useExperimentalFeatures, verbose } = config.customConfig;

  config.set({
    basePath: '..',

    browsers: (browsers.length > 0 ? browsers : ['ChromeHeadless']).map(normalizeBrowser),

    frameworks: ['jasmine'],

    client: {
      jasmine: {
        random: !!random,
      },
    },

    files: ['src/polyfills/index.js'].concat(specs.length > 0 ? specs : ['tests/karma-test-shim.js']),

    preprocessors: {
      'src/**/*.[jt]s': ['webpack'], // For generatoring coverage report for untested files
      'tests/karma-test-shim.js': ['webpack'],
      'tests/spec/**/*.ts': ['webpack'],
    },

    webpack: {
      mode: 'development',
      devtool: 'inline-source-maps',
      resolve: {
        extensions: ['.js', '.ts'],
      },
      module: {
        rules: [
          {
            test: /\.ts$/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(__dirname, '..', '.babelrc'),
                },
              },
              {
                loader: 'ts-loader',
                options: {
                  ignoreDiagnostics: [6133],
                  compilerOptions: {
                    sourceMap: false,
                    inlineSourceMap: true,
                  },
                },
              },
            ],
          },
          !collectCoverage
            ? {}
            : {
                test: /\.[jt]s$/,
                exclude: [__dirname, path.resolve(__dirname, '../node_modules')],
                enforce: 'post',
                use: {
                  loader: 'istanbul-instrumenter-loader',
                  options: {
                    esModules: true,
                  },
                },
              },
          {
            test: /\.js$/,
            include: [
              __dirname,
              path.dirname(require.resolve('lit-html')),
              path.dirname(require.resolve('lit-element')),
              path.dirname(require.resolve('@webcomponents/custom-elements')),
              // `ShadyCSS` NPM package is missing its entry point file
              path.dirname(require.resolve('@webcomponents/shadycss/scoping-shim.min.js')),
              path.dirname(require.resolve('@webcomponents/shadydom')),
              path.resolve(__dirname, '..', 'src/polyfills'),
            ],
            use: {
              loader: 'babel-loader',
              options: {
                configFile: path.resolve(__dirname, '..', '.babelrc'),
              },
            },
          },
          {
            test: /\.scss$/,
            sideEffects: true,
            use: [
              require.resolve('../css-result-loader'),
              {
                loader: 'postcss-loader',
                options: {
                  plugins: () => [
                    require('autoprefixer')({
                      browsers: ['last 1 version', 'ie >= 11'],
                    }),
                  ],
                },
              },
              {
                loader: 'sass-loader',
                options: {
                  includePaths: [path.resolve(__dirname, '..', 'node_modules')],
                  data: `
                  $feature-flags: (
                    grid: ${useExperimentalFeatures},
                    ui-shell: true,
                  );
                `,
                },
              },
            ],
          },
        ],
      },
    },

    webpackMiddleware: {
      noInfo: !verbose,
    },

    customLaunchers: {
      Chrome_Travis: {
        base: 'ChromeHeadless',
        flags: ['--no-sandbox'],
      },
    },

    plugins: [
      require('karma-jasmine'),
      require('karma-spec-reporter'),
      require('karma-coverage-istanbul-reporter'),
      require('karma-webpack'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-safari-launcher'),
      require('karma-ie-launcher'),
    ],

    reporters: ['spec', ...(!collectCoverage ? [] : ['coverage-istanbul'])],

    coverageIstanbulReporter: {
      reports: ['html', 'text'],
      dir: path.join(__dirname, 'coverage'),
      combineBrowserReports: true,
      fixWebpackSourcePaths: true,
      verbose,
    },

    port: 9876,

    colors: true,

    browserNoActivityTimeout: 60000,

    autoWatch: true,
    autoWatchBatchDelay: 400,

    logLevel: verbose ? config.LOG_DEBUG : config.LOG_INFO,

    concurrency: Infinity,
  });
};
