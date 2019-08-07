'use strict';

const webpack = require('webpack');

module.exports = {
  async managerWebpack(config) {
    // `@storybook/react` NPM installation seems to add `@babel/preset-react` automatically
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        CARBON_CUSTOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    return config;
  },
};
