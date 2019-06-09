'use strict';

const path = require('path');
const { Server } = require('karma');

const config = require('./config');

const { cloptions, testsDir } = config;
const { browsers, debug, specs, keepalive, random, useExperimentalFeatures, verbose } = cloptions;

module.exports = {
  unit(done) {
    new Server(
      {
        configFile: path.resolve(__dirname, '..', testsDir, 'karma.conf.js'),
        singleRun: !keepalive,
        customConfig: {
          browsers, // We'll massage browser list in `karma.config.js`
          collectCoverage: !debug,
          specs,
          random,
          useExperimentalFeatures,
          verbose,
        },
      },
      done
    ).start();
  },
};
