'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const through2 = require('through2');
const autoprefixer = require('autoprefixer');
const replaceExtension = require('replace-ext');
const rollup = require('rollup');
const rollupConfigDev = require('../rollup.config.dev');
const rollupConfigProd = require('../rollup.config.prod');
const createSVGResultFromCarbonIcon = require('../tools/svg-result-carbon-icon');
const babelPluginResourceJSPaths = require('../babel-plugin-resource-js-paths');

const config = require('./config');

module.exports = {
  modules: {
    icons() {
      return gulp
        .src([`${config.iconsDir}/**/*.js`, `!${config.iconsDir}/index.js`])
        .pipe(
          through2.obj((file, enc, done) => {
            const descriptor = require(file.path); // eslint-disable-line global-require,import/no-dynamic-require
            const iconsESPath = path.resolve(config.jsDestDir, 'icons', path.relative(config.iconsDir, file.path));
            const spreadModulePath = path.resolve(__dirname, '../es/globals/directives/spread');
            file.contents = Buffer.from(`
              import { svg } from 'lit-html';
              import spread from '${path.relative(path.dirname(iconsESPath), spreadModulePath)}';
              const svgResultCarbonIcon = ${createSVGResultFromCarbonIcon(descriptor)};
              export default svgResultCarbonIcon;
            `);
            done(null, file);
          })
        )
        .pipe(prettier())
        .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')));
    },

    sass() {
      return gulp
        .src(`${config.srcDir}/**/*.scss`)
        .pipe(
          sass({
            includePaths: ['node_modules'],
            outputStyle: process.env.NODE_ENV !== config.ENV_PRODUCTION ? 'nested' : 'compressed',
          }).on('error', sass.logError)
        )
        .pipe(
          postcss([
            autoprefixer({
              browsers: ['> 1%', 'last 2 versions'],
            }),
          ])
        )
        .pipe(
          through2.obj((file, enc, done) => {
            file.contents = Buffer.from(`
              import { css } from 'lit-element';
              export default css([${JSON.stringify(String(file.contents))}]);
            `);
            file.path = replaceExtension(file.path, '.css.js');
            done(null, file);
          })
        )
        .pipe(prettier())
        .pipe(gulp.dest(path.resolve(config.jsDestDir)));
    },

    scripts() {
      const tsProject = typescript.createProject(path.resolve(__dirname, '../tsconfig.json'), {
        isolatedModules: true,
      });
      return gulp
        .src([`${config.srcDir}/**/*.ts`, `!${config.srcDir}/**/*.d.ts`, `!${config.srcDir}/index-with-polyfills.ts`])
        .pipe(plumber())
        .pipe(gulpif(process.env.NODE_ENV !== config.ENV_PRODUCTION, sourcemaps.init()))
        .pipe(tsProject())
        .pipe(
          babel({
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: {
                    browsers: ['last 1 version', 'Firefox ESR', 'not edge > 0', 'not ie > 0'],
                  },
                  exclude: ['transform-classes'],
                },
              ],
            ],
            plugins: [babelPluginResourceJSPaths],
          })
        )
        .pipe(gulpif(process.env.NODE_ENV !== config.ENV_PRODUCTION, sourcemaps.write()))
        .pipe(gulp.dest(config.jsDestDir));
    },
  },

  sass() {
    return gulp
      .src(`${config.srcDir}/**/*.scss`)
      .pipe(gulpif(process.env.NODE_ENV !== config.ENV_PRODUCTION, sourcemaps.init()))
      .pipe(
        sass({
          includePaths: ['node_modules'],
          outputStyle: process.env.NODE_ENV !== config.ENV_PRODUCTION ? 'nested' : 'compressed',
        }).on('error', sass.logError)
      )
      .pipe(
        postcss([
          autoprefixer({
            browsers: ['> 1%', 'last 2 versions'],
          }),
        ])
      )
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
