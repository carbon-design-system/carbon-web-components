/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const webpack = require('webpack');

module.exports = {
  async managerWebpack(config) {
    const babelLoaderRule = config.module.rules.find(
      item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
    );
    if (babelLoaderRule) {
      babelLoaderRule.use.forEach(item => {
        const { presets } = item.options || {};
        if (presets) {
          const vuePresetIndex = presets.findIndex(preset => /babel-preset-vue/i.test(preset));
          if (vuePresetIndex >= 0) {
            presets.splice(vuePresetIndex, 1);
          }
          // Cover our custom Storybook add-ons written in React
          if (!presets.find(preset => /@babel\/preset-react/i.test(preset))) {
            presets.push('@babel/preset-react');
          }
        }
      });
    }
    // `@storybook/react` NPM installation seems to add `@babel/preset-react` automatically
    config.plugins.push(
      new webpack.EnvironmentPlugin({
        CARBON_CUSTOM_ELEMENTS_STORYBOOK_USE_CUSTOM_PROPERTIES: 'false',
      })
    );
    return config;
  },
};
