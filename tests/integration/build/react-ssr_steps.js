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

const PORT = 3001;

describe('React SSR example', () => {
  beforeAll(async () => {
    const projectRoot = path.resolve(__dirname, '../../..');
    const src = path.resolve(projectRoot, 'examples/codesandbox/react-ssr');
    const tmpDir = process.env.CCE_EXAMPLE_TMPDIR;
    await setupDevServer({
      command: [
        `cp -r ${src} ${tmpDir}`,
        `node ${projectRoot}/tests/integration/replace-dependencies.js ${tmpDir}/react-ssr/package.json`,
        `cd ${tmpDir}/react-ssr`,
        `cross-env YARN_CACHE_FOLDER=${tmpDir}/.yarn-cache yarn install`,
        `cross-env NODE_OPTIONS="--max-old-space-size=8192" PORT=${PORT} yarn start`,
      ].join(' && '),
      launchTimeout: Number(process.env.LAUNCH_TIMEOUT),
      port: PORT,
    });
    await page.goto(`http://localhost:${PORT}`);
  }, Number(process.env.LAUNCH_TIMEOUT));

  it('should show a title', async () => {
    await expect(page).toMatch('Hello World!');
  });

  it('should have dropdown interactive', async () => {
    await expect(page).toClick('bx-dropdown');
    await expect(page).toMatchElement('bx-dropdown[open]');
    await expect(page).toClick('bx-dropdown');
    await expect(page).toMatchElement('bx-dropdown:not([open])');
  });

  afterAll(async () => {
    await teardownDevServer();
  });
});
