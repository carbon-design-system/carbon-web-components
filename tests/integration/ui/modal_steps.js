/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('bx-modal', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-modal--default-story`);
  });

  it('should have modal closable', async () => {
    await page.click('bx-modal-close-button');
    await expect(page).toHaveSelector('bx-modal .bx--modal-container', { state: 'hidden' });
  });
});
