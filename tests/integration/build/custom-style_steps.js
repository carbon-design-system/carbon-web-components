/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

const path = require('path');
const { setup: setupDevServer, teardown: teardownDevServer } = require('jest-dev-server');

const PORT = 1236;

describe('Custom style example with inherited component class', () => {
  beforeAll(async () => {
    const dist = path.resolve(__dirname, '../../../es');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/styling/custom-style');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}`,
        `cd ${tmpDir}/custom-style`,
        'yarn install',
        'rm -Rf node_modules/carbon-custom-elements/es',
        `cp -r ${dist} node_modules/carbon-custom-elements`,
        `yarn parcel --port ${PORT} index.html`,
      ].join(' && '),
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have dropdown with custom color', async () => {
    const backgroundColorValue = await page.evaluate(dropdown => {
      const listBox = dropdown.shadowRoot.querySelector('.bx--list-box');
      return listBox.ownerDocument.defaultView.getComputedStyle(listBox).getPropertyValue('background-color');
    }, await expect(page).toMatchElement('my-dropdown'));
    expect(backgroundColorValue).toEqual(expect.stringMatching(/rgb\(\s*255,\s*255,\s*255\s*\)/));
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
