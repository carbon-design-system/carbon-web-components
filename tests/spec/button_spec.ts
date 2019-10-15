/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
import { BUTTON_KIND } from '../../src/components/button/button';

const template = ({
  hasContent = true,
  autofocus,
  disabled,
  download,
  href,
  hreflang,
  kind,
  ping,
  rel,
  small,
  target,
  type,
}: {
  hasContent?: boolean;
  autofocus?: boolean;
  disabled?: boolean;
  download?: string;
  href?: string;
  hreflang?: string;
  kind?: BUTTON_KIND;
  ping?: string;
  rel?: string;
  small?: boolean;
  target?: string;
  type?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-btn
          ?autofocus="${autofocus}"
          ?disabled="${disabled}"
          download="${ifDefined(download)}"
          href="${ifDefined(href)}"
          hreflang="${ifDefined(hreflang)}"
          kind="${ifDefined(kind)}"
          ping="${ifDefined(ping)}"
          rel="${ifDefined(rel)}"
          ?small="${small}"
          target="${ifDefined(target)}"
          type="${ifDefined(type)}"
        ></bx-btn>
      `;

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

  describe('Misc attributes', function() {
    it('should render with minimum attributes for <button>', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-btn')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes for <button>', async function() {
      render(
        template({
          autofocus: true,
          disabled: true,
          kind: BUTTON_KIND.SECONDARY,
          small: true,
          type: 'submit',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-btn')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with minimum attributes for <a>', async function() {
      render(template({ href: 'about:blank' }), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-btn')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes for <a>', async function() {
      render(
        template({
          disabled: true,
          download: 'file-name-foo',
          href: 'about:blank',
          hreflang: 'en',
          kind: BUTTON_KIND.SECONDARY,
          ping: 'about:blank',
          rel: 'noopener',
          small: true,
          target: '_blank',
          type: 'text/plain',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-btn')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  afterEach(function() {
    render(template({ hasContent: false }), document.body);
  });
});
