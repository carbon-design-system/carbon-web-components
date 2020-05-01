#!/usr/bin/env node

/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
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
const writeFile = promisify(fs.writeFile);
const { currentYear, reLicenseTextCurrentYear, reLicenseTextSingleYear, reLicenseTextRange } = reLicense;

const check = (paths, { testCurrentYear, writeCurrentYear }) =>
  Promise.all(
    paths.map(async item => {
      const contents = await readFile(item, 'utf8');
      const result = (testCurrentYear || writeCurrentYear ? reLicenseTextCurrentYear : reLicense).test(contents);
      if (!result) {
        if (writeCurrentYear) {
          const newContents = contents
            .replace(reLicenseTextSingleYear, match => `${match}, ${currentYear}`)
            .replace(reLicenseTextRange, (match, token) => `${token}${currentYear}`);
          if (!reLicenseTextCurrentYear.test(newContents)) {
            throw new Error(`Could not find license text in: ${item}`);
          }
          await writeFile(item, newContents, 'utf8');
        } else {
          throw new Error(`Could not find license text in: ${item}`);
        }
      }
    })
  );

const { args, ...options } = commander
  .option('-c, --test-current-year', 'Ensures the license header represents the current year')
  .option('-w, --write-current-year', 'Updates the license header to represent the current year')
  .parse(process.argv);
check(args, options).then(
  () => {
    process.exit(0);
  },
  error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
);
