'use strict';

const path = require('path');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const through2 = require('through2');
const log = require('fancy-log');
const autoprefixer = require('autoprefixer');
const replaceExtension = require('replace-ext');
const { rollup } = require('rollup');
const rollupConfigDev = require('../rollup.config.dev');
const rollupConfigProd = require('../rollup.config.prod');
const babelPluginCreateReactCustomElementType = require('../babel-plugin-create-react-custom-element-type');
const babelPluginResourceJSPaths = require('../babel-plugin-resource-js-paths');
const createSVGResultFromCarbonIcon = require('../tools/svg-result-carbon-icon');

const config = require('./config');

const buildProd = process.env.NODE_ENV === config.ENV_PRODUCTION;

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
            outputStyle: !buildProd ? 'nested' : 'compressed',
          }).on('error', sass.logError)
        )
        .pipe(
          postcss([
            autoprefixer({
              // TODO: Optimize for modern browsers here
              browsers: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
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
        .on('error', log)
        .pipe(gulp.dest(path.resolve(config.jsDestDir)));
    },

    react() {
      return gulp
        .src([`${config.srcDir}/components/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/*.ts`])
        .pipe(plumber())
        .pipe(
          babel({
            babelrc: false,
            plugins: [
              ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
              '@babel/plugin-syntax-typescript',
              babelPluginCreateReactCustomElementType,
            ],
          })
        )
        .on('error', log)
        .pipe(gulp.dest(`${config.jsDestDir}/components-react`));
    },

    scripts() {
      return gulp
        .src([
          `${config.srcDir}/**/*.ts`,
          `!${config.srcDir}/**/*-story*.ts*`,
          `!${config.srcDir}/**/stories/*.ts`,
          `!${config.srcDir}/**/*.d.ts`,
          `!${config.srcDir}/index-with-polyfills.ts`,
        ])
        .pipe(plumber())
        .pipe(gulpif(!buildProd, sourcemaps.init()))
        .pipe(
          babel({
            presets: [
              [
                '@babel/preset-env',
                {
                  modules: false,
                  targets: ['last 1 version', 'Firefox ESR', 'not opera > 0', 'not android > 0', 'not edge > 0', 'not ie > 0'],
                },
              ],
            ],
            // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
            plugins: [['@babel/plugin-transform-runtime', { version: '7.3.0' }], babelPluginResourceJSPaths],
          })
        )
        .on('error', log)
        .pipe(gulpif(!buildProd, sourcemaps.write()))
        .pipe(gulp.dest(config.jsDestDir));
    },

    types() {
      const tsProject = typescript.createProject(path.resolve(__dirname, '../tsconfig.json'));
      const { dts } = gulp
        .src([
          `${config.srcDir}/**/*.ts`,
          `!${config.srcDir}/**/*-story*.ts*`,
          `!${config.srcDir}/**/stories/**/*.ts*`,
          `!${config.srcDir}/index-with-polyfills.ts`,
        ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(tsProject());
      return dts
        .pipe(
          through2.obj((file, enc, done) => {
            file.contents = Buffer.from(`${file.contents.toString()}\n//# sourceMappingURL=${path.basename(file.path)}.map\n`);
            done(null, file);
          })
        )
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.jsDestDir));
    },
  },

  bundle() {
    const suffix = !buildProd ? '.js' : '.min.js';
    return Promise.all(
      Object.keys(config.bundle).map(moduleName =>
        rollup(
          Object.assign(buildProd ? rollupConfigProd : rollupConfigDev, {
            input: path.join(config.srcDir, config.bundle[moduleName]),
          })
        ).then(bundle =>
          bundle.write({
            format: 'iife',
            moduleName,
            output: {
              name: 'CarbonCustomElements',
              file: path.join(config.destDir, moduleName + suffix),
            },
            sourceMap: true,
          })
        )
      )
    );
  },
};
