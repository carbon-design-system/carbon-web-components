/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const gulp = require('gulp');
const clean = require('./gulp-tasks/clean');
const build = require('./gulp-tasks/build');
const lint = require('./gulp-tasks/lint');
const test = require('./gulp-tasks/test');

gulp.task('build:modules:icons', build.modules.icons);
gulp.task('build:modules:css', build.modules.css);
gulp.task('build:modules:react', build.modules.react);
gulp.task('build:modules:react-types', build.modules.reactTypes);
gulp.task('build:modules:scripts', build.modules.scripts);
gulp.task('build:modules:types', build.modules.types);
gulp.task(
  'build:modules',
  gulp.parallel(
    gulp.task('build:modules:icons'),
    gulp.task('build:modules:css'),
    gulp.task('build:modules:react'),
    gulp.task('build:modules:react-types'),
    gulp.task('build:modules:scripts'),
    gulp.task('build:modules:types')
  )
);
gulp.task('build:sass', build.sass);
gulp.task('build', gulp.parallel(gulp.task('build:modules'), gulp.task('build:sass')));

gulp.task('clean', clean);

gulp.task('lint:license:src', lint.license.src);
gulp.task('lint:license:dist', lint.license.dist);
gulp.task('lint:license', gulp.parallel(gulp.task('lint:license:src'), gulp.task('lint:license:dist')));

gulp.task('test:unit', test.unit);
gulp.task('test', gulp.task('test:unit'));

process.once('SIGINT', () => {
  process.exit(0);
});
