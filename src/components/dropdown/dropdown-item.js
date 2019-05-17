import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import { tabbableSelector } from '../../settings';
import styles from './dropdown.scss';

const { prefix } = settings;

// mixin to polyfill delegatesFocus
const focusMixin = Parent =>
  class extends Parent {
    focus() {
      if (this.shadowRoot.delegatesFocus) {
        super.focus();
      } else {
        this.shadowRoot.querySelector(tabbableSelector).focus();
      }
    }
  };

/**
 * Dropdown menu item.
 * @extends HTMLElement
 */
class BXDropdownItem extends focusMixin(HTMLElement) {
  #handleKeydown = event => {
    if (event.key === 'ArrowDown') {
      const next = BXDropdownItem.getSibling(this, 'nextElementSibling');
      if (next) {
        next.focus();
      }
    }

    if (event.key === 'ArrowUp') {
      const prev = BXDropdownItem.getSibling(this, 'previousElementSibling');
      if (prev) {
        prev.focus();
      }
    }
  };

  /**
   * The link href of the dropdown item. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get href() {
    return this.getAttribute('href');
  }

  set href(current) {
    this.setAttribute('href', current);
  }

  /**
   * The value of the dropdown item. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get value() {
    return this.getAttribute('value');
  }

  set value(current) {
    this.setAttribute('value', current);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'option');
    }
    this.attachShadow({ mode: 'open', delegatesFocus: true });
    this.render();

    // listen to keydowns on the host element
    // that way we can find and focus siblings easier
    this.addEventListener('keydown', this.#handleKeydown);
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      this.render();
    }
  }

  disconnectedCallback() {
    this.removeEventListener('keydown', this.#handleKeydown);
  }

  /**
   * Renders the template.
   */
  render() {
    if (this.shadowRoot) {
      render(this.template(), this.shadowRoot);
    }
  }

  /**
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  template() {
    /* eslint-disable no-script-url */
    return html`
      <style>
        ${styles}
      </style>
      <a href=${this.href || 'javascript:void 0'} class=${`${prefix}--dropdown-link`}><slot></slot></a>
    `;
    /* eslint-enable no-script-url */
  }

  static get observedAttributes() {
    return ['href', 'value'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-dropdown-item>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-dropdown-item`;
  }

  // static helper method to get the next immediate non-selected sibling dropdown item
  static getSibling(element, direction) {
    let next = element[direction];
    if (next) {
      while (next.classList.contains(BXDropdownItem.classSelected)) {
        next = next[direction];
      }
      return next;
    }
    return null;
  }

  /**
   * The CSS class for the selected item.
   * @type {string}
   */
  static classSelected = `${prefix}--dropdown--selected`;
}

focusMixin(BXDropdownItem);

window.customElements.define(BXDropdownItem.is, BXDropdownItem);

export default BXDropdownItem;
