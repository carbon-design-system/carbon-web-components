#!/usr/bin/env node

/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const { promisify } = require('util');
const commander = require('commander');
const reLicense = require('./license-text');

const readFile = promisify(fs.readFile);

const check = paths =>
  Promise.all(
    paths.map(async item => {
      if (!reLicense.test(await readFile(item, 'utf8'))) {
        throw new Error(`Could not find license text in: ${item}`);
      }
    })
  );

check(commander.parse(process.argv).args).then(
  () => {
    process.exit(0);
  },
  error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
);
