import { delay } from 'bluebird';
import EventManager from '../utils/event-manager.js';

import Dropdown from '../../src/components/dropdown/dropdown.js';
import DropdownItem from '../../src/components/dropdown/dropdown-item.js';

customElements.define(Dropdown.is, Dropdown);
customElements.define(DropdownItem.is, DropdownItem);

describe('bx-dropdown', function () {
  describe('The lifecycle logic', function () {
    let elem;

    beforeEach(function () {
      elem = document.createElement('bx-dropdown');
      elem.appendChild(document.createElement('bx-dropdown-item'));
      document.body.appendChild(elem);
    });

    it('should set the right set of attributes', function () {
      expect(elem.getAttribute('tabindex'), 'tabindex').to.equal('0');
      expect(elem.getAttribute('role'), 'role').to.equal('list');
      expect(elem.getAttribute('class'), 'class').to.equal('bx--dropdown');
    });

    it('should stamp out the template', function () {
      expect(elem.querySelector('.bx--dropdown-text'), 'The UI showing the selected item').to.be.ok;
      expect(elem.querySelector('.bx--dropdown__arrow'), 'The trigger arrow').to.be.ok;
      expect(elem.querySelector('.bx--dropdown-list'), 'The container for the dropdown item').to.be.ok;
      expect(elem.querySelector('.bx--dropdown-list').querySelector('bx-dropdown-item'), 'The dropdown item').to.be.ok;
    });

    it('should put the dropdown items and dropdown item text into the appropriate slots when they are added', async function () {
      const item = document.createElement('bx-dropdown-item');
      elem.appendChild(item);
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      const text = document.createTextNode('text-foo');
      item.appendChild(text); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      await delay(0);
      try {
        expect(elem.querySelector('.bx--dropdown-list').contains(item), 'Dropdown item').to.be.true;
        expect(item.querySelector('.bx--dropdown-link').textContent, 'Dropdown item text').to.equal('text-foo');
      } finally {
        elem.querySelector('.bx--dropdown-list').removeChild(item);
      }
    });

    it('should reflect the attributes set before the element gets into DOM tree', async function () {
      const elemWithAttrs = document.createElement('bx-dropdown');
      elemWithAttrs.setAttribute('open', true);
      elemWithAttrs.setAttribute('value', 'value-foo');
      const item = document.createElement('bx-dropdown-item');
      item.setAttribute('value', 'value-foo');
      item.textContent = 'text-foo';
      elemWithAttrs.appendChild(item);
      document.body.appendChild(elemWithAttrs);
      await Promise.resolve();
      try {
        expect(elemWithAttrs._selectedItem, 'Selected item').to.equal(item);
        expect(elemWithAttrs.querySelector('.bx--dropdown-text').textContent, 'Selected text').to.equal('text-foo');
        expect(elemWithAttrs.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
        expect(item.querySelector('.bx--dropdown-link').classList.contains('bx--dropdown--selected'), 'Selected state')
          .to.be.true;
      } finally {
        document.body.removeChild(elemWithAttrs);
      }
    });

    it('should release the global click listener when the element gets out of render tree', async function () {
      elem.open = true;
      await Promise.resolve();
      const spyFocus = sinon.spy(elem, 'focus');
      elem.parentNode.removeChild(elem);
      document.body.click();
      expect(spyFocus).not.have.been.called;
    });

    it('should release the global focusin listener when the element gets out of render tree', async function () {
      elem.open = true;
      await Promise.resolve();
      elem.parentNode.removeChild(elem);
      const focusinEventName = 'onfocusin' in window ? 'focusin' : 'focus';
      document.body.dispatchEvent(new CustomEvent(focusinEventName));
      expect(elem.open).to.be.true;
    });

    it('should stop moving dropdown items into the container once the element gets out of render tree', async function () {
      elem.parentNode.removeChild(elem);
      const dropdownItem = document.createElement('bx-dropdown-item');
      elem.appendChild(dropdownItem);
      await Promise.resolve();
      expect(dropdownItem.parentNode).to.equal(elem);
    });

    afterEach(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Toggling', function () {
    let elem;
    let itemNode;
    let stubFocus;

    before(function () {
      elem = document.createElement('bx-dropdown');
      itemNode = document.createElement('bx-dropdown-item');
      elem.appendChild(itemNode);
      document.body.appendChild(elem);
    });

    it('should add "open" stateful modifier class', async function () {
      elem.click();
      await Promise.resolve();
      expect(elem.classList.contains('bx--dropdown--open')).to.be.true;
    });

    it('should remove "open" stateful modifier class (closed default state)', async function () {
      elem.open = true;
      await Promise.resolve();
      elem.click();
      expect(elem.classList.contains('bx--dropdown--open')).to.be.false;
    });

    it('should always close dropdown when clicking document', async function () {
      elem.open = true;
      await Promise.resolve();
      document.documentElement.click();
      expect(elem.classList.contains('bx--dropdown--open')).to.be.false;
    });

    it('should close dropdown when clicking on an item', async function () {
      elem.open = true;
      await Promise.resolve();
      itemNode.click();
      expect(elem.classList.contains('bx--dropdown--open')).to.be.false;
    });

    it('should open dropdown with enter key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 13 }));
      await Promise.resolve();
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should close dropdown with enter key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.open = true;
      await Promise.resolve();
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 13 }));
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should open dropdown with space key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));
      await Promise.resolve();
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should close dropdown with space key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.open = true;
      await Promise.resolve();
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 32 }));
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should not close dropdown with space key on an item', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.open = true;
      await Promise.resolve();
      itemNode.dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { which: 32 }));
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.true;
      expect(stubFocus, 'Focus requested').not.to.have.been.called;
    });

    it('should close dropdown with ESC key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.open = true;
      await Promise.resolve();
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should close dropdown with ESC key on an item', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.open = true;
      await Promise.resolve();
      itemNode.dispatchEvent(Object.assign(new CustomEvent('keydown', { bubbles: true }), { which: 27 }));
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').to.have.been.calledOnce;
    });

    it('should not open dropdown with ESC key', async function () {
      stubFocus = sinon.stub(elem, 'focus');
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 27 }));
      await Promise.resolve();
      expect(elem.classList.contains('bx--dropdown--open'), 'Open state').to.be.false;
      expect(stubFocus, 'Focus requested').not.to.have.been.called;
    });

    afterEach(async function () {
      if (stubFocus) {
        stubFocus.restore();
        stubFocus = null;
      }
      elem.open = false;
      await Promise.resolve();
    });

    after(function () {
      document.body.removeChild(elem);
    });
  });

  describe('Selecting an item', function () {
    let elem;
    const itemNodes = [];
    const events = new EventManager();

    before(function () {
      elem = document.createElement('bx-dropdown');

      itemNodes.push(...[...new Array(2)].map((item, i) => {
        const itemNode = document.createElement('bx-dropdown-item');
        itemNode.textContent = i;
        itemNode.value = `value-${i}`;
        itemNode._selected = i === 0;
        return elem.appendChild(itemNode);
      }));

      document.body.appendChild(elem);
    });

    it('should add/remove "selected" modifier class', function () {
      itemNodes[1].click();
      expect(itemNodes[0].querySelector('.bx--dropdown--selected'), 'Unselected item').not.to.be.ok;
      expect(itemNodes[1].querySelector('.bx--dropdown--selected'), 'Selected item').to.be.ok;
    });

    it('should change "selected" state', function () {
      itemNodes[1].click();
      expect(itemNodes[0]._selected, 'Unselected item').not.to.be.ok;
      expect(itemNodes[1]._selected, 'Selected item').to.be.ok;
    });

    it('should prevent link from being followed', function () {
      const link = itemNodes[1].querySelector('.bx--dropdown-link');
      const defaultPrevented = !link.dispatchEvent(new CustomEvent('click', { bubbles: true, cancelable: true }));
      expect(defaultPrevented, 'Preventing link from being followed').to.be.true;
      expect(itemNodes[0].querySelector('.bx--dropdown--selected'), 'Unselected item').not.to.be.ok;
      expect(itemNodes[1].querySelector('.bx--dropdown--selected'), 'Selected item').to.be.ok;
    });

    it('should update text', function () {
      itemNodes[1].click();
      expect(elem.querySelector('.bx--dropdown-text').textContent).to.equal('1');
    });

    it('should update value', function () {
      itemNodes[1].click();
      expect(elem.value).to.equal('value-1');
    });

    it('should not update text if dropdown type is navigation', function () {
      elem.type = 'navigation';
      itemNodes[1].click();
      expect(elem.querySelector('.bx--dropdown-text').textContent).to.equal('0');
    });

    it('should not add "selected" modifier class if dropdown type is navigation', function () {
      elem.type = 'navigation';
      itemNodes[1].click();
      expect(itemNodes[0].querySelector('.bx--dropdown--selected'), 'Unselected item').to.be.ok;
      expect(itemNodes[1].querySelector('.bx--dropdown--selected'), 'Selected item').not.to.be.ok;
    });

    it('should provide a way to switch item with a value', function () {
      elem.value = 'value-1';
      expect(itemNodes[0].querySelector('.bx--dropdown--selected'), 'Unselected item').not.to.be.ok;
      expect(itemNodes[1].querySelector('.bx--dropdown--selected'), 'Selected item').to.be.ok;
    });

    it('should provide a way to cancel switching item', function () {
      events.on(elem, 'bx-dropdown-selected-item-beingchanged', (e) => {
        expect(e.detail.item).to.equal(itemNodes[1]);
        e.preventDefault();
      });
      itemNodes[1].click();
      expect(itemNodes[0].querySelector('.bx--dropdown--selected'), 'Other item').to.be.ok;
      expect(itemNodes[1].querySelector('.bx--dropdown--selected'), 'Clicked item').not.to.be.ok;
      expect(elem.querySelector('.bx--dropdown-text').textContent, 'Selection text').to.equal('0');
    });

    it('should reflect the added child to the selection', async function () {
      itemNodes[0]._selected = false;
      elem.value = 'value-2';
      const itemNode = document.createElement('bx-dropdown-item');
      itemNode.textContent = '2';
      itemNode.value = 'value-2';
      elem.appendChild(itemNode);
      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot
      try {
        expect(elem.selectedItem, 'Selected item').to.equal(itemNode);
        expect(itemNode._selected, 'Selected state of the item').to.be.true;
        expect(elem.querySelector('.bx--dropdown-text', 'Selection text').textContent).to.equal('2');
      } finally {
        itemNode.parentNode.removeChild(itemNode);
      }
    });

    it('should update the selection upon child being removed', async function () {
      elem.value = null;
      itemNodes[0]._selected = false;
      itemNodes[1]._selected = false;

      const extraItemNodes = [...new Array(2)].map((item, i) => {
        const index = i + 2;
        const itemNode = document.createElement('bx-dropdown-item');
        itemNode.textContent = index;
        itemNode._selected = true;
        return elem.appendChild(itemNode);
      });

      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot

      const extraItemNode = extraItemNodes.shift();
      extraItemNode.parentNode.removeChild(extraItemNode);

      await delay(0); // Workaround for IE MutationObserver scheduling bug for moving elements to slot

      try {
        expect(elem.selectedItem, 'Selected item').to.equal(extraItemNodes[0]);
        expect(extraItemNodes[0]._selected, 'Selected state of the item').to.be.true;
        expect(elem.querySelector('.bx--dropdown-text', 'Selection text').textContent).to.equal('3');
      } finally {
        for (let itemNode = extraItemNodes.pop(); itemNode; itemNode = extraItemNodes.pop()) {
          itemNode.parentNode.removeChild(itemNode);
        }
      }
    });

    afterEach(async function () {
      elem.type = '';
      itemNodes[0]._selected = true;
      itemNodes[1]._selected = false;
      await Promise.resolve();
      elem.querySelector('.bx--dropdown-text').textContent = '0';
      events.reset();
    });

    after(function () {
      document.body.removeChild(elem);
    });
  });

  describe('Navigating focus', function () {
    let elem;
    const itemNodes = [];
    const events = new EventManager();
    const stubsFocus = [];
    let stubGetCurrentNavigation;

    before(function () {
      elem = document.createElement('bx-dropdown');

      itemNodes.push(...[...new Array(3)].map((item, i) => {
        const itemNode = document.createElement('bx-dropdown-item');
        itemNode.textContent = i;
        itemNode._selected = i === 0;
        return elem.appendChild(itemNode);
      }));

      document.body.appendChild(elem);
    });

    beforeEach(async function () {
      itemNodes.forEach((itemNode) => {
        itemNode._selected = false; // eslint-disable-line no-param-reassign
      });
      elem.open = true;
      await Promise.resolve();
      elem.focus();
    });

    it('should select the first one for forward navigation if there is no selection', function () {
      stubsFocus.push(...itemNodes.map(itemNode => sinon.stub(itemNode.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').to.have.been.calledOnce;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should select the last one for backward navigation if there is no selection', function () {
      stubsFocus.push(...itemNodes.map(itemNode => sinon.stub(itemNode.querySelector('.bx--dropdown-link'), 'focus')));
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('should start with selection for forward navigation', async function () {
      itemNodes[0]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(itemNode => sinon.stub(itemNode.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should start with selection for backward navigation', async function () {
      itemNodes[2]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(itemNode => sinon.stub(itemNode.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 38 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should handle overflow for forward navigation', async function () {
      itemNodes[2]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(itemNode => sinon.stub(itemNode.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').to.have.been.calledOnce;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should handle underflow for backward navigation', async function () {
      itemNodes[0]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item.querySelector('.bx--dropdown-link'), 'focus')));
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('should start with focused element over selection for forward navigation', async function () {
      stubGetCurrentNavigation = sinon.stub(elem, 'currentNavigation').get(function () { return itemNodes[0]; });
      itemNodes[2]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should start with focused element over selection for backward navigation', async function () {
      itemNodes[0]._selected = true;
      await Promise.resolve();
      stubGetCurrentNavigation = sinon.stub(elem, 'currentNavigation').get(function () { return itemNodes[2]; });
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item.querySelector('.bx--dropdown-link'), 'focus')));
      elem.dispatchEvent(Object.assign(new CustomEvent('keydown'), { which: 38 }));
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').to.have.been.calledOnce;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    it('should skip selected items', async function () {
      stubGetCurrentNavigation = sinon.stub(elem, 'currentNavigation').get(function () { return itemNodes[0]; });
      itemNodes[1]._selected = true;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').to.have.been.calledOnce;
    });

    it('should not navigate unless dropdown is open', async function () {
      elem.open = false;
      await Promise.resolve();
      stubsFocus.push(...itemNodes.map(item => sinon.stub(item.querySelector('.bx--dropdown-link'), 'focus')));
      const defaultPrevented
        = !elem.dispatchEvent(Object.assign(new CustomEvent('keydown', { cancelable: true }), { which: 40 }));
      expect(defaultPrevented, 'Canceling event').not.to.be.true;
      expect(stubsFocus[0], 'Focus on 1st item').not.to.have.been.called;
      expect(stubsFocus[1], 'Focus on 2nd item').not.to.have.been.called;
      expect(stubsFocus[2], 'Focus on 3rd item').not.to.have.been.called;
    });

    afterEach(function () {
      if (stubGetCurrentNavigation) {
        stubGetCurrentNavigation.restore();
        stubGetCurrentNavigation = null;
      }
      for (let stub = stubsFocus.pop(); stub; stub = stubsFocus.pop()) {
        stub.restore();
      }
      events.reset();
    });

    after(function () {
      document.body.removeChild(elem);
    });
  });

  describe('Close on blur', function () {
    let elem;
    let itemNode;
    let input;

    before(function () {
      elem = document.createElement('bx-dropdown');
      itemNode = document.createElement('bx-dropdown-item');
      itemNode.textContent = 'foo';
      elem.appendChild(itemNode);
      document.body.appendChild(elem);

      input = document.createElement('input');
      input.type = 'text';
      document.body.appendChild(input);
    });

    beforeEach(async function () {
      elem.open = true;
      await Promise.resolve();
      itemNode.querySelector('.bx--dropdown-link').focus();
    });

    it('should close when dropdown loses focus', function () {
      input.focus();
      expect(elem.classList.contains('bx--dropdown--open')).to.be.false;
    });

    after(function () {
      if (document.body.contains(input)) {
        document.body.removeChild(input);
      }
      document.body.removeChild(elem);
    });
  });
});
