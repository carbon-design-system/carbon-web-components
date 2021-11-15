/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

const gulp = require('gulp');
const path = require('path');
const { Server } = require('karma');

const config = require('./config');

const { cloptions, testsDir } = config;
const { browsers, debug, specs, keepalive, noPruneSnapshot, random, updateSnapshot, useExperimentalFeatures, verbose } =
  cloptions;

function unit(done) {
  new Server(
    {
      configFile: path.resolve(__dirname, '..', testsDir, 'karma.conf.js'),
      singleRun: !keepalive,
      customConfig: {
        browsers, // We'll massage browser list in `karma.config.js`
        collectCoverage: !debug,
        noPruneSnapshot,
        specs,
        random,
        updateSnapshot,
        useExperimentalFeatures,
        verbose,
      },
    },
    done
  ).start();
}

gulp.task('test:unit', unit);
gulp.task('test', gulp.task('test:unit'));
