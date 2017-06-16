'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const rollup = require('rollup');
const rollupConfigDev = require('../rollup.config.dev');
const rollupConfigProd = require('../rollup.config.prod');

const config = require('./config');

module.exports = {
  sass() {
    return gulp
      .src(`${config.srcDir}/**/*.scss`)
      .pipe(gulpif(process.env.NODE_ENV !== config.ENV_PRODUCTION, sourcemaps.init()))
      .pipe(
        sass({
          outputStyle: process.env.NODE_ENV !== config.ENV_PRODUCTION ? 'nested' : 'compressed',
        }).on('error', sass.logError)
      )
      .pipe(postcss([autoprefixer(config.autoprefixer)]))
      .pipe(concat('carbon-custom-elements.css'))
      .pipe(gulpif(process.env.NODE_ENV !== config.ENV_PRODUCTION, sourcemaps.write()))
      .pipe(gulp.dest(config.destDir));
  },

  scripts() {
    return Promise.all(
      Object.keys(config.bundle).map(moduleName =>
        rollup
          .rollup(
            Object.assign(process.env.NODE_ENV === config.ENV_PRODUCTION ? rollupConfigProd : rollupConfigDev, {
              entry: path.join(config.srcDir, config.bundle[moduleName]),
            })
          )
          .then(bundle =>
            bundle.write({
              format: 'iife',
              moduleName,
              dest: path.join(config.destDir, `${moduleName}.js`),
              sourceMap: true,
            })
          )
      )
    );
  },
};
