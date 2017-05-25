'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const eslint = require('gulp-eslint');

const config = require('./config');

module.exports = {
  scripts() {
    return gulp.src([
      '*.js',
      `${config.srcDir}/**/*.js`,
      `${config.tasksDir}/**/*.js`,
    ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .pipe(eslint.results((results) => {
      const count = results.warningCount;
      if (count > 0) {
        throw new gutil.PluginError('gulp-eslint', {
          name: 'ESLintWarning',
          message: `Has ${count} warning${count > 1 ? 's' : ''}`,
        });
      }
    }));
  },
};
