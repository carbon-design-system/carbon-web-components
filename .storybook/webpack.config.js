/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const rtlcss = require('rtlcss');

const useExperimentalFeatures = process.env.STORYBOOK_CARBON_USE_EXPERIMENTAL_FEATURES !== 'false';
const useStyleSourceMap = process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_STYLE_SOURCEMAP === 'true';
const useRtl = process.env.STORYBOOK_CARBON_CUSTOM_ELEMENTS_USE_RTL === 'true';

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

  const mdxStoryRule = config.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /@mdx-js\/loader/i.test(use.loader) && !item.exclude)
  );
  if (mdxStoryRule) {
    // Storybook's default assumes that MDX stories have `.story.mdx`/`.stories.mdx` suffixes.
    // We put MDX stories to docs/*-story.mdx.
    mdxStoryRule.test = /\-story(\-(angular|react|vue))?.mdx$/;
    mdxStoryRule.include = [path.resolve(__dirname, '../docs')];
  }

  const storyDocsRule = config.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /@mdx-js\/loader/i.test(use.loader) && item.exclude)
  );
  if (storyDocsRule) {
    // Storybook's default assumes that MDX stories have `.story.mdx`/`.stories.mdx` suffixes.
    // We put MDX stories to docs/*-story.mdx.
    storyDocsRule.exclude = [path.resolve(__dirname, '../docs')];
  }

  // `carbon-web-components` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
  const htmlRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /polymer-webpack-loader/i.test(use.loader))
  );
  if (htmlRuleIndex >= 0) {
    config.module.rules.splice(htmlRuleIndex, 1);
  }

  // We use `CSSResult` instead of raw CSS
  const sassLoaderRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /sass-loader/i.test(use.loader))
  );
  if (sassLoaderRuleIndex >= 0) {
    config.module.rules.splice(sassLoaderRuleIndex, 1);
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
      use: [...babelLoaderRule.use, require.resolve('../tools/svg-result-carbon-icon-loader')],
    },
    {
      test: /-story(-(angular|react|vue))?\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@storybook/source-loader'),
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
      test: /\.tsx?$/,
      use: [
        {
          // Build note: Locking down `@babel/plugin-transform-typescript` to `~7.6.0`
          // given `7.7` or later versions seems to have a problem with using decorator with fields without an initializer
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react',
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
                },
              ],
            ],
            plugins: [
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.3.0' }],
              [
                'babel-plugin-emotion',
                {
                  sourceMap: true,
                  autoLabel: true,
                },
              ],
            ],
          },
        },
      ],
    },
    {
      test: /\.scss$/,
      sideEffects: true,
      use: [
        require.resolve('../tools/css-result-loader'),
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              require('../tools/postcss-fix-host-pseudo')(),
              require('autoprefixer')({
                browsers: ['last 1 version', 'ie >= 11'],
              }),
              ...(useRtl ? [rtlcss] : []),
            ],
            sourceMap: useStyleSourceMap,
          },
        },
        {
          loader: 'fast-sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
            data: `
              $feature-flags: (
                enable-css-custom-properties: true,
                grid: ${useExperimentalFeatures},
              );
            `,
            sourceMap: useStyleSourceMap,
          },
        },
      ],
    },
    {
      test: /\.html$/,
      use: 'file-loader',
    }
  );

  config.resolve.extensions.push('.ts', '.tsx', '.d.ts');

  if (!config.resolve.alias) {
    config.resolve.alias = {};
  }
  // In our development environment (where `carbon-web-components/es/icons` may not have been built yet),
  // we load icons from `@carbon/icons` and use a WebPack loader to convert the icons to `lit-html` version
  config.resolve.alias['carbon-web-components/es/icons'] = '@carbon/icons/lib';

  return config;
};
