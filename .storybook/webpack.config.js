const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const useExperimentalFeatures = process.env.CARBON_USE_EXPERIMENTAL_FEATURES === 'true';

const useStyleSourceMap =
  process.env.CARBON_REACT_STORYBOOK_USE_STYLE_SOURCEMAP === 'true';

module.exports = ({ config }) => {
  config.devtool = useStyleSourceMap ? 'source-map' : '';
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

  // `carbon-custom-elements` does not use `polymer-webpack-loader` as it does not use full-blown Polymer
  const htmlRuleIndex = config.module.rules.findIndex(
    item => item.use && item.use.some && item.use.some(use => /polymer-webpack-loader/i.test(use.loader))
  );
  if (htmlRuleIndex >= 0) {
    config.module.rules.splice(htmlRuleIndex, 1);
  }

  config.module.rules.push({
    test: /-story\.jsx?$/,
    loaders: [
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
  });

  config.module.rules.push({
    test: /\.html$/,
    use: 'raw-loader',
  }, {
    test: /\.scss$/,
    sideEffects: true,
    use: [
      'to-string-loader',
      {
        loader: 'css-loader',
        options: {
          importLoaders: 2,
          sourceMap: useStyleSourceMap,
        },
      },
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
  });

  return config;
};
