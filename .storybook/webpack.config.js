const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const useExperimentalFeatures = process.env.CARBON_USE_EXPERIMENTAL_FEATURES !== 'false';

const useStyleSourceMap = process.env.CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

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
      test: /-story\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve('@storybook/addon-storysource/loader'),
          options: {
            prettierConfig: {
              parser: 'babylon',
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
      use: ['babel-loader', 'ts-loader'],
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
            sourceMap: useStyleSourceMap,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            includePaths: [path.resolve(__dirname, '..', 'node_modules')],
            data: `
            $feature-flags: (
              components-x: ${useExperimentalFeatures},
              grid: ${useExperimentalFeatures},
              ui-shell: true,
            );
          `,
            sourceMap: useStyleSourceMap,
          },
        },
      ],
    }
  );

  // TODO: Do we really need this?
  config.resolve.extensions.push('.ts');

  return config;
};
