'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const jsdoc = require('./gulp-tasks/jsdoc');
const test = require('./gulp-tasks/test');

gulp.task('build:sass', build.sass);
gulp.task('build:scripts', build.scripts);
gulp.task('build:modules:icons', build.modules.icons);
gulp.task('build:modules:sass', build.modules.sass);
gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task(
  'build:modules',
  gulp.parallel(gulp.task('build:modules:icons'), gulp.task('build:modules:sass'), gulp.task('build:modules:scripts'))
);
gulp.task('build', gulp.parallel(gulp.task('build:sass'), gulp.task('build:scripts')));

gulp.task('clean', clean);

gulp.task('jsdoc', jsdoc);

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
