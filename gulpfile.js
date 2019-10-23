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
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const jsdoc = require('./gulp-tasks/jsdoc');
const lint = require('./gulp-tasks/lint');
const test = require('./gulp-tasks/test');

gulp.task('build:modules:icons', build.modules.icons);
gulp.task('build:modules:sass', build.modules.sass);
gulp.task('build:modules:angular', build.modules.angular);
gulp.task('build:modules:react', build.modules.react);
gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task('build:modules:types', build.modules.types);
gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:icons'),
    gulp.task('build:modules:sass'),
    gulp.task('build:modules:angular'),
    gulp.task('build:modules:react'),
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:types')
  )
);
gulp.task('build', gulp.task('build:modules'));

gulp.task('clean', clean);

gulp.task('jsdoc', jsdoc);

gulp.task('lint:license:src', lint.license.src);
gulp.task('lint:license:dist', lint.license.dist);
gulp.task('lint:license', gulp.parallel(gulp.task('lint:license:src'), gulp.task('lint:license:dist')));

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
