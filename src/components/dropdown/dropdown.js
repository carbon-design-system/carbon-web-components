import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import { html, render } from 'lit-html';
import BXDropdownItem from './dropdown-item';
import styles from './dropdown.scss';

const { prefix } = settings;
const find = (a, predicate) => Array.prototype.find.call(a, predicate);
const forEach = (a, predicate) => Array.prototype.forEach.call(a, predicate);

/**
 * Dropdown menu.
 * @extends HTMLElement
 */
class BXDropdown extends HTMLElement {
  /**
   * The handle for the `click` event handler of the shadow root.
   * @type {Handle}
   * @private
   */
  #hClickShadowRoot;

  /**
   * The content of the selected item.
   * @type {DocumentFragment}
   * @private
   */
  #selectedContent;

  /**
   * Handles `click` event on a dropdown item.
   * @param {MouseEvent} evt The event.
   * @private
   */
  #handleClickItem = evt => {
    const item = evt.target;
    if (item.tagName === BXDropdownItem.is.toUpperCase()) {
      this.#handleUserInitiatedSelectItem(item);
    }
  };

  #handleClickShadowRoot = evt => {
    if (this.shadowRoot.contains(evt.target)) {
      this.open = !this.open;
    }
  };

  /**
   * Handles user-initiated selection of a dropdown item.
   * @param {BXDropdownItem} item The dropdown item user wants to select.
   * @private
   */
  #handleUserInitiatedSelectItem = item => {
    // Defining this method as private field due to:
    // https://github.com/babel/eslint-plugin-babel/issues/166
    if (item.value !== this.value) {
      const init = {
        bubbles: true,
        cancelable: true,
        detail: {
          item,
        },
      };
      if (this.dispatchEvent(new CustomEvent(this.constructor.eventBeforeSelect, init))) {
        this.value = item.value;
        this.dispatchEvent(new CustomEvent(this.constructor.eventAfterSelect, init));
        this.open = false;
      }
    }
  };

  /**
   * `true` if the dropdown should be disabled. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(current) {
    if (current) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * `true` if the dropdown should be the light variant. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get light() {
    return this.hasAttribute('light');
  }

  set light(current) {
    if (current) {
      this.setAttribute('light', '');
    } else {
      this.removeAttribute('light');
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
   * The value of the selected item. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get value() {
    return this.getAttribute('value');
  }

  set value(current) {
    this.setAttribute('value', current);
  }

  /**
   * The content of the trigger button, used if there is no selected item. Corresponds to `trigger-content` attribute.
   * @type {string}
   */
  get triggerContent() {
    return this.getAttribute('trigger-content');
  }

  set triggerContent(current) {
    this.setAttribute('trigger-content', current);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'combobox');
    }
    this.attachShadow({ mode: 'open' });
    this.#hClickShadowRoot = on(this.shadowRoot, 'click', this.#handleClickShadowRoot);
    this.render();
  }

  disconnectedCallback() {
    if (this.#hClickShadowRoot) {
      this.#hClickShadowRoot = this.#hClickShadowRoot.release();
    }
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'value') {
        forEach(this.getElementsByTagName(BXDropdownItem.is), elem => {
          elem.classList.toggle(elem.constructor.classSelected, elem.value === this.value);
        });
        const item = find(this.getElementsByTagName(BXDropdownItem.is), elem => elem.value === this.value);
        if (item) {
          const range = this.ownerDocument.createRange();
          range.selectNodeContents(item);
          this.#selectedContent = range.cloneContents();
        } else {
          this.#selectedContent = null;
        }
      }
      this.render();
    }
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
    return html`
      <style>
        ${styles}
      </style>
      <li class=${`${prefix}--dropdown-text`}>${this.#selectedContent || this.triggerContent}</li>
      <li>
        <svg class=${`${prefix}--dropdown__arrow`} width="10" height="5" viewBox="0 0 10 5" fill-rule="evenodd">
          <path d="M10 0L5 5 0 0z"></path>
        </svg>
      </li>
      <li>
        <ul role="listbox" class=${`${prefix}--dropdown-list`} aria-label="inner dropdown menu" @click=${this.#handleClickItem}>
          <slot></slot>
        </ul>
      </li>
    `;
  }

  static get observedAttributes() {
    return ['disabled', 'light', 'open', 'value', 'trigger-content'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-dropdown>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-dropdown`;
  }

  /**
   * The name of the custom event fired before a new selection (value) is set upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   * @type {string}
   */
  static get eventBeforeSelect() {
    return `${this.is.toLowerCase()}-beingselected`;
  }

  /**
   * The name of the custom event fired after a new selection (value) is set.
   * @type {string}
   */
  static get eventAfterSelect() {
    return `${this.is.toLowerCase()}-selected`;
  }
}

window.customElements.define(BXDropdown.is, BXDropdown);

export default BXDropdown;
