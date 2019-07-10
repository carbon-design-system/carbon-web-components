'use strict';

const webpack = require('webpack');

module.exports = {
  async managerWebpack(config) {
    const babelLoaderRuleIndex = config.module.rules.findIndex(
      item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
    );
    if (babelLoaderRuleIndex >= 0) {
      const babelLoaderRule = config.module.rules[babelLoaderRuleIndex];
      config.module.rules.splice(babelLoaderRuleIndex, 1, {
        ...babelLoaderRule,
        use:
          babelLoaderRule.use &&
          babelLoaderRule.use.map &&
          babelLoaderRule.use.map(item => ({
            ...item,
            options: {
              ...item.options,
              presets: ['@babel/preset-react', ...item.options.presets],
            },
          })),
      });
    }
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        CARBON_CUSTOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    return config;
  },
};
