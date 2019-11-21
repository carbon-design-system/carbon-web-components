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
  triggerContent,
  value,
}: {
  hasContent?: boolean;
  disabled?: boolean;
  triggerContent?: string;
  value?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-tabs ?disabled=${disabled} trigger-content="${ifDefined(triggerContent)}" value=${ifDefined(value)}>
          ${[0, 1, 2].map(
            item => html`
              <bx-tab value="value-${item}">Option ${item}</bx-tab>
            `
          )}
        </bx-tabs>
      `;

describe('bx-tabs', function() {
  describe('Toggling', function() {
    it('should toggle "open" attribute', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--tabs-trigger--open')).toBe(true);
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      document.documentElement.click();
      expect(elem!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const inner = elem!.shadowRoot!.getElementById('trigger');
      (inner as HTMLElement).click();
      await Promise.resolve();
      (document.body.querySelector('bx-tab') as HTMLElement).click();
      expect(elem!.classList.contains('bx--tabs-trigger--open')).toBe(false);
    });
  });

  describe('Selecting an item', function() {
    const events = new EventManager();

    it('should add/remove "selected" attribute', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect(elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()).toBe('Option 1');
    });

    it('should update value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('bx-tabs') as BXTabs).value).toBe('value-1');
    });

    it('should provide a way to switch item with a value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'value-1';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'value-0';
      await Promise.resolve();
      events.on(elem!, 'bx-tabs-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(itemNodes[1]);
        event.preventDefault();
      });
      (itemNodes[1] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()).toBe('Option 0');
    });

    afterEach(async function() {
      events.reset();
    });
  });

  afterEach(function() {
    render(template({ hasContent: false }), document.body);
  });
});
