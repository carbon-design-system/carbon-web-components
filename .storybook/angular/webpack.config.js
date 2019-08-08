'use strict';

const configure = require('../webpack.config');

module.exports = ({ config, mode }) => {
  const massagedConfig = configure({ config, mode });
  const babelLoaderRule = massagedConfig.module.rules.find(
    item => item.use && item.use.some && item.use.some(use => /babel-loader/i.test(use.loader))
  );
  if (babelLoaderRule) {
    massagedConfig.module.rules.push({
      test: /@carbon[\\/]icons-angular/i,
      use: babelLoaderRule.use,
    });
  }
  return massagedConfig;
};
