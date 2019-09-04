/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const jsdoc = require('gulp-jsdoc3');
const jsdocDefaultConfig = require('gulp-jsdoc3/dist/jsdocConfig.json');

const config = require('./config');

module.exports = function runJSDoc(cb) {
  gulp.src(['README.md', `${config.srcDir}/**/*.js`], { read: false }).pipe(
    jsdoc(
      Object.assign(jsdocDefaultConfig, {
        opts: {
          destination: config.jsDocDir,
        },
      }),
      cb
    )
  );
};
