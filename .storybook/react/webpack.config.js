'use strict';

const path = require('path');
const babelPluginCreateReactCustomElementType = require('../../babel-plugin-create-react-custom-element-type');
const configure = require('../webpack.config');

const regexComponentsReactPath = /carbon-custom-elements[\\/]es[\\/]components-react[\\/](.*)$/;

class CreateReactCustomElementTypeProxyPlugin {
  /**
   * A WebPack resolver plugin that proxies module request for:
   *
   * * `carbon-custom-elements/es/components-react/**` to the corresponsing local path in this project
   * * `es/components`/`es/globals` to the corresponding source code, given the former may not have been built yet
   */
  constructor() {
    this.source = 'before-described-relative';
  }

  apply(resolver) {
    resolver.plugin(this.source, (request, callback) => {
      request.path = request.path.replace(/[\\/]es[\\/](components|globals)[\\/]/i, '/src/$1/');
      const tokens = regexComponentsReactPath.exec(request.path);
      if (tokens) {
        // Remaps the path to the one in our code if the request is of the React wrapper module
        request.path = path.resolve(__dirname, '../../es/components-react', `${tokens[1]}.js`);
      }
      callback();
    });
  }
}

module.exports = ({ config, mode }) => {
  const massagedConfig = configure({ config, mode });
  const babelLoaderRule = massagedConfig.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
  );
  if (babelLoaderRule) {
    massagedConfig.module.rules.push({
      test: /\.tsx$/,
      use: babelLoaderRule.use.map(item => {
        const { presets } = item.options || {};
        return !presets || presets.indexOf('@babel/preset-react') >= 0
          ? item
          : {
              ...item,
              options: {
                ...item.options,
                presets: [...item.options.presets, '@babel/preset-react'],
              },
            };
      }),
    });
    if (process.env.NODE_ENV !== 'production') {
      massagedConfig.module.rules.push(
        {
          test: /[\\/]es[\\/]components-react[\\/]/i,
          enforce: 'pre',
          use: [require.resolve('../../react-custom-element-type-source-loader')],
        },
        {
          test: /[\\/]es[\\/]components-react[\\/]/i,
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                plugins: [
                  ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
                  '@babel/plugin-syntax-typescript',
                  babelPluginCreateReactCustomElementType,
                ],
              },
            },
          ],
        }
      );
    }
  }
  if (!massagedConfig.resolve.plugins) {
    massagedConfig.resolve.plugins = [];
  }
  massagedConfig.resolve.plugins.push(new CreateReactCustomElementTypeProxyPlugin());
  return massagedConfig;
};
