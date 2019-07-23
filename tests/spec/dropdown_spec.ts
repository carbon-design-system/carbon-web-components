import { delay } from 'bluebird';
import EventManager from '../utils/event-manager';

/* eslint-disable import/no-duplicates */
import BXDropdown from '../../src/components/dropdown/dropdown';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../src/components/dropdown/dropdown';
import BXDropdownItem from '../../src/components/dropdown/dropdown';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../src/components/dropdown/dropdown-item';
/* eslint-enable import/no-duplicates */

describe('bx-dropdown', function() {
  describe('Toggling', function() {
    let elem: HTMLElement;
    let itemNode: HTMLElement;

    beforeAll(function() {
      elem = document.createElement('bx-dropdown');
      itemNode = document.createElement('bx-dropdown-item');
      elem.appendChild(itemNode);
      document.body.appendChild(elem);
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
      elem.click();
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
      itemNode.click();
      expect(elem.classList.contains('bx--list-box--expanded')).toBe(false);
    });

    afterEach(async function() {
      (elem as BXDropdown).open = false;
      await Promise.resolve();
    });

    afterAll(function() {
      document.body.removeChild(elem);
    });
  });

  describe('Selecting an item', function() {
    let elem: HTMLElement;
    const itemNodes: HTMLElement[] = [];
    const events = new EventManager();

    beforeAll(function() {
      elem = document.createElement('bx-dropdown');

      itemNodes.push(
        ...[...new Array(2)].map((_item, i) => {
          const itemNode = document.createElement('bx-dropdown-item');
          itemNode.textContent = String(i);
          ((itemNode as unknown) as BXDropdownItem).value = `value-${i}`;
          return elem.appendChild(itemNode);
        })
      );

      document.body.appendChild(elem);
    });

    beforeEach(async function() {
      (elem as BXDropdown).open = true;
      await Promise.resolve();
    });

    it('should add/remove "selected" modifier class', async function() {
      itemNodes[1].click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
    });

    it('should update text', async function() {
      itemNodes[1].click();
      await Promise.resolve();
      expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('1');
    });

    it('should update value', async function() {
      itemNodes[1].click();
      await Promise.resolve();
      expect((elem as BXDropdown).value).toBe('value-1');
    });

    it('should provide a way to switch item with a value', async function() {
      (elem as BXDropdown).value = 'value-1';
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(false);
      expect(itemNodes[1].hasAttribute('selected')).toBe(true);
    });

    it('should provide a way to cancel switching item', async function() {
      events.on(elem, 'bx-dropdown-beingselected', (event: CustomEvent) => {
        expect(event.detail.item).toBe(itemNodes[1]);
        event.preventDefault();
      });
      itemNodes[1].click();
      await Promise.resolve();
      expect(itemNodes[0].hasAttribute('selected')).toBe(true);
      expect(itemNodes[1].hasAttribute('selected')).toBe(false);
      expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('0');
    });

    it('should reflect the added child to the selection', async function() {
      const itemNode = document.createElement('bx-dropdown-item');
      itemNode.textContent = '2';
      ((itemNode as unknown) as BXDropdownItem).value = 'value-2';
      elem.appendChild(itemNode);
      (elem as BXDropdown).value = 'value-2';
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      try {
        expect(elem.shadowRoot!.querySelector('.bx--list-box__label')!.textContent).toBe('2');
      } finally {
        itemNode.parentNode!.removeChild(itemNode);
      }
    });

    afterEach(async function() {
      await Promise.resolve();
      (elem as BXDropdown).value = 'value-0';
      events.reset();
    });

    afterAll(function() {
      document.body.removeChild(elem);
    });
  });
});
