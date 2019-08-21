'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const jsdoc = require('./gulp-tasks/jsdoc');
const test = require('./gulp-tasks/test');

gulp.task('build:modules:icons', build.modules.icons);
gulp.task('build:modules:sass', build.modules.sass);
gulp.task('build:modules:react', build.modules.react);
gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task('build:modules:types', build.modules.types);
gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:icons'),
    gulp.task('build:modules:sass'),
    gulp.task('build:modules:react'),
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:types')
  )
);
// TODO: Consider removing build:modules:sass dependency
gulp.task('build:bundle', gulp.series('build:modules:sass', build.bundle));
gulp.task('build', gulp.parallel(gulp.task('build:modules'), gulp.task('build:bundle')));

gulp.task('clean', clean);

gulp.task('jsdoc', jsdoc);

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
