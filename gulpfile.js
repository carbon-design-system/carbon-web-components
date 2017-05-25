'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const jsdoc = require('./gulp-tasks/jsdoc');
const lint = require('./gulp-tasks/lint');
const serve = require('./gulp-tasks/serve');
const test = require('./gulp-tasks/test');

gulp.task('build:scripts', build.scripts);
gulp.task('build', ['build:scripts']);

gulp.task('clean', clean);

gulp.task('jsdoc', jsdoc);

gulp.task('lint:scripts', lint.scripts);
gulp.task('lint', ['lint:scripts']);

gulp.task('browser-sync', ['nodemon'], serve.browserSync);
gulp.task('nodemon', serve.nodemon);
gulp.task('watch', ['build'], serve.watch);
gulp.task('serve', ['browser-sync', 'watch']);

gulp.task('test:unit', test.unit);
gulp.task('test', ['test:unit']);

process.once('SIGINT', () => {
  process.exit(0);
});
