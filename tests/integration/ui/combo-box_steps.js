/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('bx-combo-box', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-combo-box--default-story`);
  });

  it('should have combo box interactive', async () => {
    await page.click('bx-combo-box .bx--list-box__field');
    await expect(page).toHaveSelector('bx-combo-box .bx--list-box__menu', { state: 'visible' });
    await page.click('bx-combo-box .bx--list-box__field');
    await expect(page).toHaveSelector('bx-combo-box .bx--list-box__menu', { state: 'hidden' });
  });
});
