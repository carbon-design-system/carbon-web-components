/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { BUTTON_KIND } from '../../src/components/button/button';

describe('bx-btn', function() {
  describe('Changing button type', function() {
    let elem: HTMLElement | null;

    beforeEach(async function() {
      elem = document.body.appendChild(document.createElement('bx-btn'));
      await Promise.resolve();
    });

    it('should choose the right template for default type', function() {
      expect(elem!.shadowRoot!.querySelectorAll('button.bx--btn').length).toBe(1);
    });

    it('should choose the right template for link type', async function() {
      elem!.setAttribute('href', 'about:blank');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('a.bx--btn').length).toBe(1);
    });

    afterEach(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing attributes', function() {
    let elem: HTMLElement | null;

    beforeAll(function() {
      elem = document.body.appendChild(document.createElement('bx-btn'));
    });

    it('should deactivate when disabled attribute is set', async function() {
      elem!.setAttribute('disabled', '');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--btn--disabled').length).toBe(1);
    });

    it('should make it small when small attribute is set', async function() {
      elem!.setAttribute('small', '');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--btn--sm').length).toBe(1);
    });

    it('should allow user to select button type', async function() {
      elem!.setAttribute('kind', BUTTON_KIND.GHOST);
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--btn--ghost').length).toBe(1);
    });

    afterAll(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });
});
