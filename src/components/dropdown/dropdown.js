import eventMatches from 'carbon-components/es/globals/js/misc/event-matches';
import on from 'carbon-components/es/globals/js/misc/on';
import BXDropdownItem from './dropdown-item.js';

import htmlDropdown from './dropdown.html';

/**
 * The navigation direction.
 * @enum {number}
 * @readonly
 * @private
 */
const NAVIGATE = {
  BACKWARD: -1,
  FORWARD: 1,
};

/**
 * The key codes.
 * @enum {number}
 * @readonly
 * @private
 */
const KEYCODE = {
  ENTER: 13,
  ESCAPE: 27,
  SPACE: 32,
  ARROWUP: 38,
  ARROWDOWN: 40,
};

/**
 * The key codes that the dropdown items should handle first.
 * @type KEYCODE[]
 * @readonly
 * @private
 */
const KEYCODES_FOR_ITEMS_FIRST = [
  KEYCODE.ENTER,
  KEYCODE.SPACE,
  KEYCODE.ARROWUP,
  KEYCODE.ARROWDOWN,
];

/**
 * Calls `forEach` for array-like.
 * @param {Array} a The array.
 * @param {Function} predicate The callback.
 * @param thisObject The object used as `this` in the callback.
 * @private
 */
function forEach(a, predicate, thisObject) {
  Array.prototype.forEach.call(a, predicate, thisObject);
}

/**
 * Calls `find` for array-like.
 * @param {Array} a The array.
 * @param {Function} predicate The callback.
 * @param thisObject The object used as `this` in the callback.
 * @returns The found array element.
 * @private
 */
function find(a, predicate, thisObject) {
  return Array.prototype.find.call(a, predicate, thisObject);
}

/**
 * Dropdown menu.
 * @extends HTMLElement
 */
class BXDropdown extends HTMLElement {
  /**
   * The handle for `click` event handler on document.
   * @type {Handle}
   * @private
   */
  _hDocumentClick;

  /**
   * The handle for `focusin` event handler on document.
   * @type {Handle}
   * @private
   */
  _hFocusIn;

  /**
   * The handle for `keydown` event handler.
   * @type {Handle}
   * @private
   */
  _hKeydown;

  /**
   * The handle for `click` event handler.
   * @type {Handle}
   * @private
   */
  _hClick;

  /**
   * The observer for child nodes.
   * @type {MutationObserver}
   * @private
   */
  _childListObserver;

  /**
   * The observer for child nodes on the slot.
   * @type {MutationObserver}
   * @private
   */
  _slotChildListObserver;

  /**
   * The dropdown item currently selected visually.
   * @type {BXDropdownItem}
   * @private
   */
  get _selectedItem() {
    return find(this.getElementsByTagName(this.constructor.Child.is), item => item._selected) || null;
  }

  set _selectedItem(item) {
    if (item && this.type !== this.constructor.constants.typeNavigation) {
      this._updateText(item);
      this._updateChildLinks(item);
    }
  }

  /**
   * Stamps out the template.
   * @private
   */
  _stamp() {
    const selectorSlot = this.constructor.constants.selectorSlot;
    if (!this.querySelector(this.constructor.constants.selectorTemplateContent)) {
      const template = this.ownerDocument.importNode(this.template, true);
      if (selectorSlot) {
        const slotInTemplate = template.querySelector(selectorSlot);
        while (this.firstChild) {
          slotInTemplate.appendChild(this.firstChild);
        }
      }
      this.appendChild(template);
    }
    if (selectorSlot) {
      const slot = this.slot;
      if (!this._childListObserver) {
        this._childListObserver = new MutationObserver((records) => {
          records.forEach((record) => {
            forEach(record.addedNodes, (node) => {
              if (node.nodeType === Node.ELEMENT_NODE && node.matches(this.constructor.Child.is)) {
                slot.appendChild(node);
                this.addedChild(node);
              }
            });
          });
        });
        this._childListObserver.observe(this, { childList: true });
      }
      if (!this._slotChildListObserver) {
        this._slotChildListObserver = new MutationObserver((records) => {
          records.forEach((record) => {
            forEach(record.removedNodes, (node) => {
              if (node.nodeType === Node.ELEMENT_NODE && node.matches(this.constructor.Child.is)) {
                this.removedChild(node);
              }
            });
          });
        });
        this._slotChildListObserver.observe(slot, { childList: true });
      }
    }
  }

  /**
   * Handles keydown event.
   * @param {Event} event The event triggering this method.
   * @private
   */
  _handleKeydown = (event) => {
    const direction = {
      [KEYCODE.ARROWUP]: NAVIGATE.BACKWARD,
      [KEYCODE.ARROWDOWN]: NAVIGATE.FORWARD,
    }[event.which];
    if (this.open && direction !== undefined) {
      this.navigate(direction);
      event.preventDefault(); // Prevents up/down keys from scrolling container
    } else {
      this._toggle(event);
    }
  };

  /**
   * Opens and closes the dropdown menu.
   * @param {Event} [event] The event triggering this method.
   * @private
   */
  _toggle = (event) => {
    if ((KEYCODES_FOR_ITEMS_FIRST.indexOf(event.which) >= 0 && !eventMatches(event, this.constructor.Child.is))
      || event.which === KEYCODE.ESCAPE
      || event.type === 'click') {
      const isOfSelf = this.contains(event.target);
      if (isOfSelf && event.which === KEYCODE.ARROWDOWN && !this.open) {
        this.focus();
        this.open = true;
      } else if ((!isOfSelf || event.which === KEYCODE.ESCAPE) && this.open) {
        this.focus();
        this.open = false;
      } else if (isOfSelf && event.which !== KEYCODE.ESCAPE && event.which !== KEYCODE.ARROWDOWN) {
        this.focus(); // Karma unit test in Firefox seems to move focus to `<html>` with `this.focus()` call, for unknown reason
        this.open = !this.open;
      }
    }
  };

  /**
   * Updates the trigger text.
   * @param {BXDropdownItem} item The dropdown item that the trigger text should reflect.
   * @private
   */
  _updateText(item) {
    const text = this.querySelector(this.constructor.constants.selectorText);
    while (text.firstChild) {
      text.removeChild(text.firstChild);
    }
    forEach(item.slot.childNodes, (elem) => {
      text.appendChild(this.ownerDocument.importNode(elem, true));
    });
  }

  /**
   * Updates child links' selected status upon the given selected item.
   * @param {BXDropdownItem} item The selected dropdown item.
   * @private
   */
  _updateChildLinks(item) {
    item._selected = true; // eslint-disable-line no-param-reassign
    forEach(this.getElementsByTagName(this.constructor.Child.is), (elem) => {
      if (elem !== item) {
        elem._selected = false; // eslint-disable-line no-param-reassign
      }
    });
  }

  connectedCallback() {
    this.setAttribute('tabindex', '0');
    this.setAttribute('role', 'list');
    this.classList.add(this.constructor.constants.classElement); // TODO: Consider defining our own style

    this._stamp();

    this.querySelector(this.constructor.constants.selectorText).textContent = this.constructor.constants.navigationMessage;

    if (this.type !== this.constructor.constants.typeNavigation) {
      const itemWithMatchedValue = find(this.getElementsByTagName(this.constructor.Child.is), item => item.value === this.value);
      if (itemWithMatchedValue && itemWithMatchedValue !== this._selectedItem) {
        this._selectedItem = itemWithMatchedValue;
      }
    }

    this._hDocumentClick = on(this.ownerDocument, 'click', this._toggle);

    const hasFocusin = 'onfocusin' in window;
    this._hFocusIn = on(this.ownerDocument, hasFocusin ? 'focusin' : 'focus', (event) => {
      if (!this.contains(event.target)) {
        this.open = false;
      }
    }, !hasFocusin);

    this._hKeydown = on(this, 'keydown', this._handleKeydown);

    this._hClick = on(this, 'click', (event) => {
      const item = eventMatches(event, this.constructor.Child.is);
      if (item) {
        this.selectedItem = item;
      }
    });
  }

  disconnectedCallback() {
    if (this._slotChildListObserver) {
      this._slotChildListObserver.disconnect();
      this._slotChildListObserver = null;
    }
    if (this._childListObserver) {
      this._childListObserver.disconnect();
      this._childListObserver = null;
    }
    if (this._hClick) {
      this._hClick = this._hClick.release();
    }
    if (this._hKeydown) {
      this._hKeydown = this._hKeydown.release();
    }
    if (this._hFocusIn) {
      this._hFocusIn = this._hFocusIn.release();
    }
    if (this._hDocumentClick) {
      this._hDocumentClick = this._hDocumentClick.release();
    }
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'open') {
        this.classList.toggle(this.constructor.constants.classOpen, current !== null); // TODO: Consider defining our own style
      } else if (name === 'value') {
        // TODO: Document that this path won't trigger before/after events
        const item = find(this.getElementsByTagName(this.constructor.Child.is), elem => elem.value === current);
        if (item) {
          this._selectedItem = item;
        }
      }
    }
  }

  /**
   * A callback called when a managed child node is added.
   * @param {BXDropdownItem} child The added child.
   */
  addedChild(child) {
    if (this.type !== this.constructor.constants.typeNavigation) {
      const itemWithMatchedValue = find(this.getElementsByTagName(this.constructor.Child.is), item => item.value === this.value);
      if (itemWithMatchedValue === child && itemWithMatchedValue !== this._selectedItem) {
        this._selectedItem = child;
      }
    }
  }

  /**
   * A callback called when a managed child node is removed.
   * @param {BXDropdownItem} child The removed child.
   */
  removedChild(child) {
    if (this.type !== this.constructor.constants.typeNavigation && child._selected) {
      const selectedItem = this._selectedItem;
      if (selectedItem) {
        this._updateText(selectedItem);
      }
    }
  }

  /**
   * Moves up/down the focus.
   * @param {number} direction The direction of navigating.
   */
  navigate(direction) {
    const items = this.getElementsByTagName(this.constructor.Child.is);
    const start = this.currentNavigation || this.selectedItem;
    const getNextItem = (old) => {
      const handleUnderflow = (i, l) => i + (i >= 0 ? 0 : l);
      const handleOverflow = (i, l) => i - (i < l ? 0 : l);
      // `items.indexOf(old)` may be -1 (Scenario of no previous focus)
      const index = Math.max(Array.prototype.indexOf.call(items, old) + direction, -1);
      return items[handleUnderflow(handleOverflow(index, items.length), items.length)];
    };
    for (let current = getNextItem(start); current && current !== start; current = getNextItem(current)) {
      if (!current._selected) {
        current.focusInner();
        break;
      }
    }
  }

  /**
   * `true` if the dropdown should be open. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get open() {
    return this.hasAttribute('open');
  }

  set open(current) {
    if (current) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  /**
   * The dropdown type.
   * Using `navigation` prevents trigger text from reflecting selection.
   * @type {string}
   */
  get type() {
    return this.getAttribute('type');
  }

  set type(type) {
    this.setAttribute('type', type);
  }

  /**
   * Currently selected element.
   * @type {BXDropdownItem}
   */
  get selectedItem() {
    return this._selectedItem;
  }

  set selectedItem(item) {
    const eventStart = new CustomEvent(this.constructor.constants.eventBeforeChangeSelectedItem, {
      bubbles: true,
      cancelable: true,
      detail: { item },
    });

    if (this.dispatchEvent(eventStart)) {
      this._selectedItem = item;
      if (item.value) {
        this.setAttribute('value', item.value);
      }

      this.dispatchEvent(new CustomEvent(this.constructor.constants.eventAfterSelected, {
        bubbles: true,
        cancelable: true,
        detail: { item },
      }));
    }
  }

  /**
   * The value of the currently selected element.
   * @type {string}
   */
  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    const item = find(this.getElementsByTagName(this.constructor.Child.is), elem => elem.value === String(value));
    if (item) {
      this.selectedItem = item;
    } else if (value == null) { // eslint-disable-line eqeqeq
      this.removeAttribute('value');
    } else {
      this.setAttribute('value', String(value));
    }
  }

  /**
   * Currently highlighted element.
   * TODO: Consider adding setter.
   * @type {BXDropdownItem}
   */
  get currentNavigation() {
    const focused = this.ownerDocument.activeElement;
    const found = focused && find(this.getElementsByTagName(this.constructor.Child.is), item => item.contains(focused));
    return found || null;
  }

  /**
   * The container for the content.
   * @type {Element}
   * @readonly
   */
  get slot() {
    return this.querySelector(this.constructor.constants.selectorSlot);
  }

  /**
   * The template being used.
   * @type {DocumentFragment}
   */
  get template() {
    return this.constructor._template
      || (this.constructor._template = this.ownerDocument.createRange().createContextualFragment(htmlDropdown.trim()));
  }

  /**
   * The cache of parsed template.
   * @type {DocumentFragment}
   * @private
   */
  static _template;

  static get observedAttributes() {
    return [
      'open',
      'value',
    ];
  }

  /**
   * The custom element this custom element contains, which is, `<bx-dropdown-item>`.
   * @type {BXDropdownItem}
   */
  static get Child() {
    return BXDropdownItem;
  }

  /**
   * The tag name of this custom element, which is, `<bx-dropdown>`.
   * @type {string}
   */
  static get is() {
    return 'bx-dropdown';
  }

  /**
   * Component constants.
   * @type {Object}
   * @property {string} [selectorSlot] The CSS selector to find the container for the dropdown items.
   * @property {string} [selectorText] The CSS selector to find the DOM node showing the selected dropdown item.
   * @property {string} [classElement] The CSS class for this custom element.
   * @property {string} [eventBeforeChangeSelectedItem]
   *   The name of the custom event fired before the selected dropdown item is changed.
   *   Cancellation of this event stops changing the selected dropdown item.
   * @property {string} [eventAfterChangeSelectedItem]
   *   The name of the custom event telling that the selected dropdown item is sure changed
   *   without being canceled by the event handler named by `eventBeforeventBeforeChangeSelectedItemeShown` option
   *   (typically `bx-dropdown-selected-item-beingchanged`).
   * @property {string} [navigationMessage]
   *   The message shown when no dropdown item is selected.
   *   Application should set this property based on the locale in use.
   */
  static get constants() {
    return {
      selectorTemplateContent: '.bx--dropdown-list',
      selectorSlot: '.bx--dropdown-list',
      selectorText: '.bx--dropdown-text',
      classElement: 'bx--dropdown', // TODO: Consider defining our own style
      classOpen: 'bx--dropdown--open',
      typeNavigation: 'navigation',
      eventBeforeChangeSelectedItem: 'bx-dropdown-selected-item-beingchanged',
      eventAfterChangeSelectedItem: 'bx-dropdown-selected-item-changed',
      navigationMessage: 'Choose an option',
    };
  }
}

export default BXDropdown;
