'use strict';

const nodeResolve = require('rollup-plugin-node-resolve');
const string = require('rollup-plugin-string');
const babel = require('rollup-plugin-babel');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');

module.exports = {
  plugins: [
    nodeResolve({
      jsnext: true,
      browser: true,
      main: true,
    }),
    string({
      include: '**/*.html',
    }),
    babel({
      exclude: 'node_modules/**',
      plugins: [
        require.resolve('./babel-plugin-supercall'),
        'external-helpers',
      ],
    }),
    commonjs(),
    uglify(),
  ],
};
