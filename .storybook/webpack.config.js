/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const customProperties = require('postcss-custom-properties');

const useExperimentalFeatures = process.env.CARBON_USE_EXPERIMENTAL_FEATURES !== 'false';
const useStyleSourceMap = process.env.CARBON_CUSTOM_ELEMENTS_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

module.exports = ({ config, mode }) => {
  config.devtool = useStyleSourceMap ? 'source-map' : '';

  if (mode === 'PRODUCTION') {
    config.optimization = {
      ...config.optimization,
      minimizer: [
        new TerserPlugin({
          sourceMap: true,
          terserOptions: {
            mangle: false,
          },
        }),
      ],
    };
  }

  // `carbon-custom-elements` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
  const htmlRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /polymer-webpack-loader/i.test(use.loader))
  );
  if (htmlRuleIndex >= 0) {
    config.module.rules.splice(htmlRuleIndex, 1);
  }

  const babelLoaderRule = config.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
  );
  if (babelLoaderRule) {
    babelLoaderRule.use.forEach(item => {
      const { presets } = item.options || {};
      if (presets) {
        const vuePresetIndex = presets.findIndex(preset => /babel-preset-vue/i.test(preset));
        if (vuePresetIndex >= 0) {
          // Prevents `babel-preset-vue` from transpiling JSX. Our Vue example doesn't use JSX
          presets.splice(vuePresetIndex, 1);
        }
      }
    });
    config.module.rules.unshift({
      use: babelLoaderRule.use,
      include: [
        path.dirname(require.resolve('lit-html')),
        path.dirname(require.resolve('lit-element')),
        path.dirname(require.resolve('@webcomponents/custom-elements')),
        // `ShadyCSS` NPM package is missing its entry point file
        path.dirname(require.resolve('@webcomponents/shadycss/scoping-shim.min.js')),
        path.dirname(require.resolve('@webcomponents/shadydom')),
      ],
    });
  }

  config.module.rules.push(
    {
      // We load Web Components polyfills by our own (See `src/polyfills/index.js`)
      test: /@webcomponents[\\/]webcomponentsjs[\\/]webcomponents-lite/i,
      use: 'null-loader',
    },
    {
      test: /@carbon[\\/]icons[\\/]/i,
      use: [...babelLoaderRule.use, require.resolve('../svg-result-carbon-icon-loader')],
    },
    {
      test: /-story(-(angular|react|vue))?\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
            parser: 'typescript',
            prettierConfig: {
              printWidth: 80,
              tabWidth: 2,
              bracketSpacing: true,
              trailingComma: 'es5',
              singleQuote: true,
            },
          },
        },
      ],
      enforce: 'pre',
    },
    {
      test: /\.ts$/,
      use: [
        {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                },
              ],
            ],
            // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
            plugins: [['@babel/plugin-transform-runtime', { version: '7.3.0' }]],
          },
        },
      ],
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
              customProperties(),
              require('../postcss-fix-host-pseudo')(),
              require('autoprefixer')({
                browsers: ['last 1 version', 'ie >= 11'],
              }),
            ],
            sourceMap: useStyleSourceMap,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
            data: `
              $storybook--carbon--theme-name: 'custom-properties';
              @import '${path.resolve(__dirname, 'theme-chooser')}';
              $feature-flags: (
                grid: ${useExperimentalFeatures},
              );
            `,
            sourceMap: useStyleSourceMap,
          },
        },
      ],
    }
  );

  config.resolve.extensions.push('.ts', '.d.ts');

  return config;
};
