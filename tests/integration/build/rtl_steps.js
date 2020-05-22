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

const PORT = 8083;

describe('RTL example', () => {
  beforeAll(async () => {
    const dist = path.resolve(__dirname, '../../../es');
    const src = path.resolve(__dirname, '../../../examples/codesandbox/rtl');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}`,
        `cd ${tmpDir}/rtl`,
        'yarn install',
        'rm -Rf node_modules/carbon-custom-elements/es',
        `cp -r ${dist} node_modules/carbon-custom-elements`,
        `yarn webpack-dev-server --mode=development --open=false --port=${PORT}`,
      ].join(' && '),
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.setExtraHTTPHeaders({
      'Accept-Language': 'ar',
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have RTL style applied', async () => {
    const transformValue = await page.evaluate(slider => {
      const filledTrackContainer = slider.shadowRoot.querySelector('.bx-ce--slider__filled-track-container');
      return filledTrackContainer.ownerDocument.defaultView.getComputedStyle(filledTrackContainer).getPropertyValue('transform');
    }, await expect(page).toMatchElement('bx-slider'));
    expect(transformValue).toEqual(expect.stringMatching(/matrix\( *-1/));
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
