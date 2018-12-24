'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const jsdoc = require('./gulp-tasks/jsdoc');
const test = require('./gulp-tasks/test');

gulp.task('build:scripts', build.scripts);
gulp.task('build', ['build:scripts']);

gulp.task('clean', clean);

gulp.task('jsdoc', jsdoc);

gulp.task('test:unit', test.unit);
gulp.task('test', ['test:unit']);

process.once('SIGINT', () => {
  process.exit(0);
});
