/**
 * @license
 *
 * Copyright IBM Corp. 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

describe('bx-tile', () => {
  beforeAll(async () => {
    await page.goto(`http://localhost:${process.env.PORT}/iframe.html?id=components-tile--expandable`);
  });

  it('should have the expando interactive', async () => {
    await page.click('bx-expandable-tile button');
    expect((await (await page.$('bx-expandable-tile')).boundingBox()).height).toBeGreaterThan(300);
    await page.click('bx-expandable-tile button');
    expect((await (await page.$('bx-expandable-tile')).boundingBox()).height).toBeLessThan(300);
  });
});
