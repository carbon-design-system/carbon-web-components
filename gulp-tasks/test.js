'use strict';

const path = require('path');
const Server = require('karma').Server;

const config = require('./config');

const cloptions = config.cloptions;

module.exports = {
  unit(done) {
    new Server({
      configFile: path.resolve(__dirname, '..', config.testsDir, 'karma.conf.js'),
      browsers: !cloptions.browser || Array.isArray(cloptions.browser) ? cloptions.browser : [cloptions.browser],
      singleRun: !cloptions.keepalive,
      customCollectCoverage: !cloptions.debug,
      customFiles: !cloptions.files || Array.isArray(cloptions.files) ? cloptions.files : [cloptions.files],
    }, done).start();
  },
};
