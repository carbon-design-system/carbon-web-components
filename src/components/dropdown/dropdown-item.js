import eventMatches from 'carbon-components/es/globals/js/misc/event-matches';
import on from 'carbon-components/es/globals/js/misc/on';
import BXDropdown from './dropdown.js';

import htmlDropdownItem from './dropdown-item.html';

/**
 * Dropdown menu item.
 * @extends HTMLElement
 */
class BXDropdownItem extends HTMLElement {
  /**
   * The mutation observer for child nodes.
   * @type {MutationObserver}
   * @private
   */
  _childListObserver;

  /**
   * The handle of `onclick` event listener.
   * @type {Handle}
   * @private
   */
  _hClick;

  /**
   * `true` if this dropdown item should be selected.
   * @type {boolean}
   * @private
   */
  __selected;

  /**
   * Internal selected status.
   * @type {boolean}
   * @private
   */
  get _selected() {
    return this.__selected;
  }

  set _selected(selected) {
    this.__selected = selected;
    const link = this.querySelector(this.constructor.constants.selectorLink);
    // The template may not have been stamped out yet, so cannot rely on link being existent
    if (link) {
      // TODO: Consider defining our own style
      link.classList.toggle(this.constructor.constants.classLinkSelected, selected);
    }
  }

  /**
   * Stamps out the template.
   * @private
   */
  _stamp() {
    const { selectorSlot } = this.constructor.constants;
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
    const link = this.querySelector(this.constructor.constants.selectorLink);
    if (!link) {
      throw new TypeError('The template should contain the link.');
    }
    // TODO: Consider defining our own style
    link.classList.toggle(this.constructor.constants.classLinkSelected, this.__selected);
    if (selectorSlot && !this._childListObserver) {
      const { slot } = this;
      this._childListObserver = new MutationObserver(records => {
        records.forEach(record => {
          Array.prototype.forEach.call(record.addedNodes, node => {
            slot.appendChild(node);
          });
        });
      });
      this._childListObserver.observe(this, { childList: true });
    }
  }

  /**
   * The value associated with this dropdown item.
   * @type {string}
   */
  get value() {
    return this.getAttribute('value');
  }

  set value(value) {
    this.setAttribute('value', value);
  }

  /**
   * The container for the content.
   * @type {Element}
   * @readonly
   */
  get slot() {
    return this.querySelector(this.constructor.constants.selectorSlot) || this;
  }

  /**
   * The template being used.
   * @type {DocumentFragment}
   */
  get template() {
    if (!this.constructor._template) {
      this.constructor._template = this.ownerDocument.createRange().createContextualFragment(htmlDropdownItem.trim());
    }
    return this.constructor._template;
  }

  connectedCallback() {
    if (this.parentNode.matches(this.constructor.Parent.constants.selectorSlot)) {
      this.setAttribute('role', 'listitem');
      this.classList.add(this.constructor.constants.classElement); // TODO: Consider defining our own style
      this._stamp();
      this._hClick = on(this, 'click', evt => {
        if (eventMatches(evt, this.constructor.constants.selectorLink)) {
          evt.preventDefault();
        }
      });
    }
  }

  disconnectedCallback() {
    if (this._hClick) {
      this._hClick = this._hClick.release();
    }
    if (this._childListObserver) {
      this._childListObserver.disconnect();
      this._childListObserver = null;
    }
  }

  /**
   * Focuses on the primary focusable element.
   */
  focusInner() {
    const link = this.querySelector(this.constructor.constants.selectorLink);
    if (link) {
      link.focus();
    }
  }

  /**
   * The cache of parsed template.
   * @type {DocumentFragment}
   * @private
   */
  static _template;

  /**
   * The custom element containing this custom element, which is, `<bx-dropdown>`.
   * @type {BXDropdown}
   */
  static get Parent() {
    return BXDropdown;
  }

  /**
   * The tag name of this custom element, which is, `<bx-dropdown-item>`.
   * @type {string}
   */
  static get is() {
    return 'bx-dropdown-item';
  }

  /**
   * Component constants.
   * @type {Object}
   * @property {string} [selectorTmplateContent] The CSS selector to find the stamped out template.
   * @property {string} [selectorSlot] The CSS selector to find the element where child nodes should be in.
   * @property {string} [selectorLink] The CSS selector to find the primary focusable/clickable node.
   * @property {string} [classElement] The CSS class for this custom element.
   * @property {string} [classLink] The CSS class for the primary focusable/clickable node.
   * @property {string} [classLinkSelected] The CSS class for indicating that this dropdown item is selected.
   */
  static get constants() {
    return {
      selectorTemplateContent: '.bx--dropdown-link',
      selectorSlot: '.bx--dropdown-link',
      selectorLink: '.bx--dropdown-link',
      classElement: 'bx--dropdown-item',
      classLink: 'bx--dropdown-link',
      classLinkSelected: 'bx--dropdown--selected',
    };
  }
}

export default BXDropdownItem;
