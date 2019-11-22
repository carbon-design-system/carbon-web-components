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
import EventManager from '../utils/event-manager';

/* eslint-disable import/no-duplicates */
import BXTabs from '../../src/components/tabs/tabs';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../src/components/tabs/tabs';
/* eslint-enable import/no-duplicates */
import '../../src/components/tabs/tab';

const template = ({
  hasContent = true,
  disabled,
  value,
}: {
  hasContent?: boolean;
  disabled?: boolean;
  value?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-content-switcher ?disabled=${disabled} value=${ifDefined(value)}>
          ${[0, 1, 2].map(
            item => html`
              <bx-content-switcher-item value="value-${item}">Option ${item}</bx-content-switcher-item>
            `
          )}
        </bx-content-switcher>
      `;

describe('bx-content-switcher', function() {
  describe('Selecting an item', function() {
    const events = new EventManager();

    it('should add/remove "selected" attribute', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
    });

    it('should update value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('bx-content-switcher') as BXTabs).value).toBe('value-1');
    });

    it('should provide a way to switch item with a value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('bx-content-switcher') as BXTabs).value = 'value-1';
      await Promise.resolve(); // Update cycle for `<bx-content-switcher>`
      await Promise.resolve(); // Update cycle for `<bx-content-switcher-item>`
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-content-switcher');
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      (document.body.querySelector('bx-content-switcher') as BXTabs).value = 'value-0';
      await Promise.resolve();
      events.on(elem!, 'bx-content-switcher-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(itemNodes[1]);
        event.preventDefault();
      });
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
    });

    afterEach(async function() {
      events.reset();
    });
  });

  describe('Handling hover-over', function() {
    it('should add/remove "hide-divider" attribute', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-content-switcher-item');
      itemNodes[0].dispatchEvent(new CustomEvent('mouseover', { bubbles: true }));
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(true);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
      itemNodes[0].dispatchEvent(new CustomEvent('mouseout', { bubbles: true }));
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[1].hasAttribute('hide-divider')).toBe(false);
      expect(itemNodes[2].hasAttribute('hide-divider')).toBe(false);
    });
  });

  afterEach(function() {
    render(template({ hasContent: false }), document.body);
  });
});
