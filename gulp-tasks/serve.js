'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const nodemon = require('gulp-nodemon');

const config = require('./config');

const cloptions = config.cloptions;
const browserSyncInstance = browserSync.create();

const serve = {
  browserSyncInstance,

  browserSync() {
    browserSyncInstance.init({
      browser: cloptions.browser,
      logPrefix: 'carbon-custom-elements',
      open: !!cloptions.browser,
      port: cloptions.port,
      proxy: `localhost:${cloptions.serverport}`,
      reloadDelay: 500,
    });
  },

  nodemon() {
    let started;
    return new Promise((resolve) => {
      nodemon({
        script: 'server.js',
        ext: 'dust html js',
        watch: [
          './views',
          'server.js',
        ],
        env: {
          PORT: cloptions.serverport,
        },
      })
      .on('start', () => {
        if (!started) {
          started = true;
          resolve();
        }
      })
      .on('restart', () => {
        setTimeout(() => browserSyncInstance.reload({ stream: false }), 1000);
      });
    });
  },

  watch() {
    gulp.watch(`${config.srcDir}/**/*.js`, ['build:scripts']);
    gulp.watch([
      `${config.destDir}/**/*`,
    ]).on('change', browserSyncInstance.reload);
  },
};

module.exports = serve;
