/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { delay } from 'bluebird';
import { render } from 'lit-html';
import EventManager from '../utils/event-manager';

import BXDropdown from '../../src/components/dropdown/dropdown';
import BXDropdownItem from '../../src/components/dropdown/dropdown-item';
import { defaultStory } from '../../src/components/dropdown/dropdown-story';

const template = (props?) =>
  defaultStory({
    parameters: {
      props: {
        'bx-dropdown': props,
      },
    },
  });

describe('bx-dropdown', function() {
  describe('Misc attributes', function() {
    it('should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-dropdown')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('should render with various attributes', async function() {
      render(
        template({
          disabled: true,
          light: true,
          helperText: 'helper-text-foo',
          labelText: 'label-text-foo',
          open: true,
          triggerContent: 'trigger-content-foo',
          value: 'staging',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-dropdown')).toMatchSnapshot({ mode: 'shadow' });
    });
  });

  describe('Toggling', function() {
    let elem: Element;
    let itemNode: Element;

    beforeEach(async function() {
      render(template(), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-dropdown')!;
      itemNode = elem.querySelector('bx-dropdown-item')!;
    });

    it('should add "open" stateful modifier class', async function() {
      const inner = elem.shadowRoot!.querySelector('div[role="listbox"]');
      (inner as HTMLElement).click();
      await Promise.resolve();
      expect(inner!.classList.contains('bx--list-box--expanded')).toBe(true);
    });

    it('should remove "open" stateful modifier class (closed default state)', async function() {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      (elem as HTMLElement).click();
      expect(elem.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should always close dropdown when clicking document', async function() {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      document.documentElement.click();
      expect(elem.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    it('should close dropdown when clicking on an item', async function() {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
      (itemNode as HTMLElement).click();
      expect(elem.classList.contains('bx--list-box--expanded')).toBe(false);
    });
  });

  describe('Selecting an item', function() {
    let elem: Element;
    let itemNodes: NodeListOf<Element>;
    const events = new EventManager();

    beforeEach(async function() {
      render(template({ open: true, value: 'all' }), document.body);
      await Promise.resolve();
      elem = document.body.querySelector('bx-dropdown')!;
      itemNodes = elem.querySelectorAll('bx-dropdown-item');
    });

    it('should add/remove "selected" modifier class', async function() {
      (document.body.querySelector('bx-dropdown-item[value="staging"]') as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should update text', async function() {
      (document.body.querySelector('bx-dropdown-item[value="staging"]') as HTMLElement).click();
      await Promise.resolve();
      expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('Option 3');
    });

    it('should update value', async function() {
      (document.body.querySelector('bx-dropdown-item[value="staging"]') as HTMLElement).click();
      await Promise.resolve();
      expect((elem as BXDropdown).value).toBe('staging');
    });

    it('should provide a way to switch item with a value', async function() {
      (elem as BXDropdown).value = 'staging';
      await Promise.resolve(); // Update cycle for `<bx-dropdown>`
      await Promise.resolve(); // Update cycle for `<bx-dropdown-item>`
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(true);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
    });

    it('should provide a way to cancel switching item', async function() {
      events.on(elem, 'bx-dropdown-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(document.body.querySelector('bx-dropdown-item[value="staging"]'));
        event.preventDefault();
      });
      (document.body.querySelector('bx-dropdown-item[value="staging"]') as HTMLElement).click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(itemNodes[2].hasAttribute('selected')).toBe(false);
      expect(itemNodes[3].hasAttribute('selected')).toBe(false);
      expect(itemNodes[4].hasAttribute('selected')).toBe(false);
      expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('Option 1');
    });

    it('should reflect the added child to the selection', async function() {
      const itemNode = document.createElement('bx-dropdown-item');
      itemNode.textContent = 'text-added';
      ((itemNode as unknown) as BXDropdownItem).value = 'value-added';
      elem.appendChild(itemNode);
      (elem as BXDropdown).value = 'value-added';
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      try {
        expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('text-added');
      } finally {
        itemNode.parentNode!.removeChild(itemNode);
      }
    });

    afterEach(async function() {
      events.reset();
    });
  });

  afterEach(async function() {
    await render(undefined!, document.body);
  });
});
