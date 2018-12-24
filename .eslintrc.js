'use strict';

const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'script',
  },
  extends: ['carbon-base'],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-restricted-globals': ['error', 'isFinite'].concat(restrictedGlobals),
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
  },
};
