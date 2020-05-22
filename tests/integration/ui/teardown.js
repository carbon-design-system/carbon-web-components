/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const { teardown: teardownDevServer } = require('jest-dev-server');
const teardown = require('jest-playwright-preset/teardown');

module.exports = async config => {
  await teardown(config);
  await teardownDevServer();
};
