/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { readFile } = require('fs');
const path = require('path');
const { promisify } = require('util');
const asyncDone = require('async-done');
const gulp = require('gulp');
const filter = require('gulp-filter');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const header = require('gulp-header');
const through2 = require('through2');
const log = require('fancy-log');
const stripComments = require('strip-comments');
const autoprefixer = require('autoprefixer');
const replaceExtension = require('replace-ext');
const babelPluginCreateReactCustomElementType = require('../babel-plugin-create-react-custom-element-type');
const babelPluginResourceJSPaths = require('../babel-plugin-resource-js-paths');
const createSVGResultFromCarbonIcon = require('../tools/svg-result-carbon-icon');

const config = require('./config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

module.exports = {
  modules: {
    async icons() {
      const banner = await readFileAsync(path.resolve(__dirname, '../tools/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
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
          .pipe(header(banner))
          .pipe(gulp.dest(path.resolve(config.jsDestDir, 'icons')))
      );
    },

    async css() {
      const banner = await readFileAsync(path.resolve(__dirname, '../tools/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
          .src(`${config.srcDir}/**/*.scss`)
          .pipe(
            header(`
              $feature-flags: (
                enable-css-custom-properties: true
              );
            `)
          )
          .pipe(
            sass({
              includePaths: ['node_modules'],
              outputStyle: 'compressed',
            })
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
          .pipe(header(banner))
          .on('error', log)
          .pipe(gulp.dest(path.resolve(config.jsDestDir)))
      );
    },

    async react() {
      const banner = await readFileAsync(path.resolve(__dirname, '../tools/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
          .src([`${config.srcDir}/components/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/*.ts`])
          .pipe(plumber())
          .pipe(
            babel({
              babelrc: false,
              plugins: [
                ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
                '@babel/plugin-syntax-typescript',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                babelPluginCreateReactCustomElementType,
              ],
            })
          )
          .pipe(prettier())
          .pipe(header(banner))
          .on('error', log)
          .pipe(gulp.dest(`${config.jsDestDir}/components-react`))
      );
    },

    scripts() {
      return (
        gulp
          .src([
            `${config.srcDir}/**/*.ts`,
            `!${config.srcDir}/directives-angular/**/*.ts`,
            `!${config.srcDir}/**/*-story*.ts*`,
            `!${config.srcDir}/**/stories/*.ts`,
            `!${config.srcDir}/**/*.d.ts`,
            `!${config.srcDir}/index-with-polyfills.ts`,
          ])
          .pipe(plumber())
          .pipe(sourcemaps.init())
          .pipe(
            babel({
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: [
                      'last 1 version',
                      'Firefox ESR',
                      'not opera > 0',
                      'not op_mini > 0',
                      'not op_mob > 0',
                      'not android > 0',
                      'not edge > 0',
                      'not ie > 0',
                      'not ie_mob > 0',
                    ],
                  },
                ],
              ],
              // `version: '7.3.0'` ensures `@babel/plugin-transform-runtime` is applied to decorator helper
              plugins: [
                ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.3.0' }],
                babelPluginResourceJSPaths,
              ],
            })
          )
          // Avoids generating `.js` from interface-only `.ts` files
          .pipe(filter(file => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
          .on('error', log)
          .pipe(sourcemaps.write('.'))
          .pipe(gulp.dest(config.jsDestDir))
      );
    },

    types() {
      const tsProject = typescript.createProject(path.resolve(__dirname, '../tsconfig.json'));
      const { dts } = gulp
        .src([
          `${config.srcDir}/**/*.ts`,
          `!${config.srcDir}/directives-angular/**/*.ts`,
          `!${config.srcDir}/**/*-story*.ts*`,
          `!${config.srcDir}/**/stories/**/*.ts*`,
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

  sass() {
    return gulp.src(`${config.srcDir}/**/*.scss`).pipe(gulp.dest(config.sassDestDir));
  },
};
