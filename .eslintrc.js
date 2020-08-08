/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const restrictedGlobals = require('eslint-restricted-globals');

module.exports = {
  plugins: ['babel'],
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
    'no-unused-expressions': 0,
    'babel/no-unused-expressions': 2,
    'import/extensions': 0,
    'import/no-extraneous-dependencies': [
      2,
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': [2, { ignore: ['^carbon-web-components/es/icons/'] }],
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.ts', '.d.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
      },
    },
    {
      files: ['**/*-react.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint', 'react'],
      rules: {
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars': 2,
        'import/no-unresolved': [2, { ignore: ['^carbon-web-components/es/(components-react|icons)/'] }],
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
      },
    },
    {
      files: ['examples/codesandbox/**/*.js', 'examples/codesandbox/**/*.ts'],
      parserOptions: {
        sourceType: 'module',
      },
      rules: {
        'import/no-unresolved': 0,
      },
    },
    {
      files: ['examples/codesandbox/**/babel-plugin-*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      rules: {
        'import/no-unresolved': 2,
      },
    },
    {
      files: ['examples/codesandbox/{react,form/redux-form}/**/*.js'],
      plugins: ['react'],
      rules: {
        'react/jsx-uses-react': 2,
        'react/jsx-uses-vars': 2,
      },
    },
    {
      files: ['examples/codesandbox/**/*.config.js'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
};
