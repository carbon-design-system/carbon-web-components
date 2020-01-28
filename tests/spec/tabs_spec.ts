/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import BXTabs from '../../src/components/tabs/tabs';
import { defaultStory } from '../../src/components/tabs/tabs-story';

const template = (props?) =>
  defaultStory({
    parameters: {
      props: {
        'bx-tabs': props,
      },
    },
  });

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
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()).toBe('Option 3');
    });

    it('should update value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect((document.body.querySelector('bx-tabs') as BXTabs).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async function() {
      render(template(), document.body);
      await Promise.resolve();
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'staging';
      await Promise.resolve(); // Update cycle for `<bx-tabs>`
      await Promise.resolve(); // Update cycle for `<bx-tab>`
      const itemNodes = document.body.querySelectorAll('bx-tab');
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function() {
      render(template(), document.body);
      await Promise.resolve();
      const elem = document.body.querySelector('bx-tabs');
      const itemNodes = document.body.querySelectorAll('bx-tab');
      (document.body.querySelector('bx-tabs') as BXTabs).value = 'all';
      await Promise.resolve();
      events.on(elem!, 'bx-tabs-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(itemNodes[2]);
        event.preventDefault();
      });
      (itemNodes[2] as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(elem!.shadowRoot!.getElementById('trigger-label')!.textContent!.trim()).toBe('Option 1');
    });

    afterEach(async function() {
      events.reset();
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
