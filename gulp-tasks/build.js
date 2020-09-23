/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
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
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cleanCSS = require('gulp-clean-css');
const prettier = require('gulp-prettier');
const typescript = require('gulp-typescript');
const header = require('gulp-header');
const through2 = require('through2');
const stripComments = require('strip-comments');
const autoprefixer = require('autoprefixer');
const rtlcss = require('rtlcss');
const replaceExtension = require('replace-ext');
const babelPluginCreateReactCustomElementType = require('../tools/babel-plugin-create-react-custom-element-type');
const babelPluginCreateReactCustomElementTypeDef = require('../tools/babel-plugin-create-react-custom-element-type-def');
const babelPluginResourceJSPaths = require('../tools/babel-plugin-resource-js-paths');
const fixHostPseudo = require('../tools/postcss-fix-host-pseudo');
const createSVGResultFromCarbonIcon = require('../tools/svg-result-carbon-icon');

const config = require('./config');

const readFileAsync = promisify(readFile);
const promisifyStream = promisify(asyncDone);

const cssStream = ({ banner, dir }) =>
  gulp
    .src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/*-story.scss`])
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
      })
    )
    .pipe(
      postcss([
        fixHostPseudo(),
        autoprefixer({
          // TODO: Optimize for modern browsers here
          browsers: ['last 1 version', 'Firefox ESR', 'ie >= 11'],
        }),
        ...(dir === 'rtl' ? [rtlcss] : []),
      ])
    )
    .pipe(cleanCSS())
    .pipe(
      through2.obj((file, enc, done) => {
        file.contents = Buffer.from(`
        import { css } from 'lit-element';
        export default css([${JSON.stringify(String(file.contents))}]);
      `);
        file.path = replaceExtension(file.path, dir === 'rtl' ? '.rtl.css.js' : '.css.js');
        done(null, file);
      })
    )
    .pipe(prettier())
    .pipe(header(banner))
    .pipe(gulp.dest(path.resolve(config.jsDestDir)));

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
      await Promise.all([promisifyStream(() => cssStream({ banner })), promisifyStream(() => cssStream({ banner, dir: 'rtl' }))]);
    },

    async react() {
      const banner = await readFileAsync(path.resolve(__dirname, '../tools/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
          .src([`${config.srcDir}/components/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/*.ts`])
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
          .pipe(gulp.dest(`${config.jsDestDir}/components-react`))
      );
    },

    async reactTypes() {
      const banner = await readFileAsync(path.resolve(__dirname, '../tools/license.js'), 'utf8');
      await promisifyStream(() =>
        gulp
          .src([`${config.srcDir}/components/**/*.ts`, `!${config.srcDir}/**/*-story*.ts*`, `!${config.srcDir}/**/stories/*.ts`])
          .pipe(
            babel({
              babelrc: false,
              plugins: [
                ['@babel/plugin-syntax-decorators', { decoratorsBeforeExport: true }],
                '@babel/plugin-syntax-typescript',
                '@babel/plugin-proposal-nullish-coalescing-operator',
                '@babel/plugin-proposal-optional-chaining',
                babelPluginCreateReactCustomElementTypeDef,
              ],
            })
          )
          .pipe(prettier())
          .pipe(header(banner))
          .pipe(
            rename(pathObj => {
              pathObj.extname = '.d.ts';
            })
          )
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
          .pipe(sourcemaps.init())
          .pipe(
            babel({
              presets: ['@babel/preset-modules'],
              // `version` field ensures `@babel/plugin-transform-runtime` is applied to newer helpers like decorator
              plugins: [
                ['@babel/plugin-transform-runtime', { useESModules: true, version: '7.8.0' }],
                [
                  'template-html-minifier',
                  {
                    modules: {
                      'lit-html': ['html'],
                      'lit-element': ['html'],
                    },
                    htmlMinifier: {
                      collapseWhitespace: true,
                      conservativeCollapse: true,
                      removeComments: true,
                      caseSensitive: true,
                      minifyCSS: true,
                    },
                  },
                ],
                babelPluginResourceJSPaths,
              ],
            })
          )
          // Avoids generating `.js` from interface-only `.ts` files
          .pipe(filter(file => stripComments(file.contents.toString(), { sourceType: 'module' }).replace(/\s/g, '')))
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
    return gulp.src([`${config.srcDir}/**/*.scss`, `!${config.srcDir}/**/*-story.scss`]).pipe(gulp.dest(config.sassDestDir));
  },
};
