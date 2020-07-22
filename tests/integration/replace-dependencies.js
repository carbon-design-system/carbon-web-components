#!/usr/bin/env node

/**
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const fs = require('fs');
const { promisify } = require('util');
const commander = require('commander');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const deps = ['dependencies', 'peerDependencies', 'devDependencies'];
const packs = ['carbon-custom-elements'];

/**
 * Replaces `@carbon/ibmdotcom-*` dependencies in the given `package.json` files with the local directory references.
 *
 * @param {string[]} files The files.
 */
const replace = async files => {
  await Promise.all(
    files.map(async file => {
      const contents = JSON.parse(await readFile(file));
      // eslint-disable-next-line no-restricted-syntax
      for (const dep of deps) {
        const item = contents[dep];
        if (item) {
          // eslint-disable-next-line no-restricted-syntax
          for (const pack of packs) {
            if (item[pack]) {
              item[pack] = `file:../${pack}`;
            }
          }
        }
      }
      await writeFile(file, JSON.stringify(contents, null, 2));
    })
  );
};

const { args } = commander.parse(process.argv);

replace(args).then(
  () => {
    process.exit(0);
  },
  error => {
    console.error(error); // eslint-disable-line no-console
    process.exit(1);
  }
);
