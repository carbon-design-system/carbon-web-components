/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('bx-accordion', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-accordion--default-story`);
  });

  it('should have accordion interactive', async () => {
    await page.click('bx-accordion-item:nth-of-type(1) button');
    await expect(page).toHaveSelector('bx-accordion-item:nth-of-type(1) #content', { state: 'visible' });
    await page.click('bx-accordion-item:nth-of-type(1) button');
    await expect(page).toHaveSelector('bx-accordion-item:nth-of-type(1) #content', { state: 'hidden' });
  });
});
