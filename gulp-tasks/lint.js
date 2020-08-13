/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const filter = require('gulp-filter');
const excludeGitignore = require('gulp-exclude-gitignore');
const through2 = require('through2');
const globby = require('globby');

const config = require('./config');
const reLicenseText = require('../tools/license-text');

const promisifyStream = promisify(asyncDone);

/**
 * @returns {NodeJS.ReadWriteStream} A Gulp plugin that checks if the Vinyl file content has a license header.
 */
const gulpCheckLicense = () => {
  const filesWithError = [];
  return through2.obj(
    (file, enc, done) => {
      if (!reLicenseText.test(file.contents)) {
        filesWithError.push(file.path);
      }
      done(null, file);
    },
    done => {
      if (filesWithError.length > 0) {
        done(new Error(`Could not find license text in:\n${filesWithError.join('\n')}`));
      } else {
        done();
      }
    }
  );
};

module.exports = {
  license: {
    async src() {
      const paths = await globby(path.resolve(__dirname, '../**/.gitignore'), {
        cwd: path.resolve(__dirname, '..'),
        gitignore: true,
      });
      await promisifyStream(() =>
        paths
          .reduce(
            (stream, item) => stream.pipe(excludeGitignore(item)),
            // Exclude `node_modules` here as a fast path of `gulp-exclude-gitignore`
            gulp.src(['**/*.{js,ts,tsx,scss,html}', '!.yarn/**', '!**/node_modules/**'])
          )
          .pipe(gulpCheckLicense())
      );
    },

    dist() {
      return gulp
        .src([`${config.jsDestDir}/**/*`, '!**/*.json', '!**/*.map'])
        .pipe(filter(file => !file.stat.isDirectory()))
        .pipe(gulpCheckLicense());
    },
  },
};
