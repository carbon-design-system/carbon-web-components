import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, render } from 'lit-html';
import BXDropdownItem from './dropdown-item';
import styles from './dropdown.scss';

const { prefix } = settings;
const find = (a, predicate) => Array.prototype.find.call(a, predicate);
const forEach = (a, predicate) => Array.prototype.forEach.call(a, predicate);

// qick prototype of more functional icons
const dropdownArrow = ({ classNames }) => html`
  <svg
    class=${classNames}
    focusable="false"
    preserveAspectRatio="xMidYMid meet"
    style="will-change: transform;"
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
    aria-hidden="true"
  >
    <path d="M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z"></path>
  </svg>
`;

/**
 * Dropdown menu.
 * @extends HTMLElement
 */
class BXDropdown extends HTMLElement {
  /**
   * The content of the selected item.
   * @type {DocumentFragment}
   * @private
   */
  #selectedContent;

  /**
   * An internal unique ID for this dropdown. Used if `id` attribute is not given.
   * @type {string}
   * @private
   */
  #uniqueId = `__carbon-dropdown__${Math.random()
    .toString(36)
    .substr(2)}`;

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

  #handleClickInner = event => {
    if (this.shadowRoot.contains(event.target)) {
      this.#toggle();
    }
  };

  #handleFocusOut = event => {
    if (!this.contains(event.relatedTarget)) {
      this.#toggle(false);
    }
  };

  #handleKeydownInner = event => {
    if (this.shadowRoot.contains(event.target) && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopPropagation();
      this.#toggle();
    }

    if (event.key === 'Escape') {
      // ensure the dropdown is closed
      this.#toggle(false);
      // focus the dropdown trigger - we only want to force focus back on the trigger when the user presses `Escape`
      this.shadowRoot.querySelector(BXDropdown.triggerSelector).focus();
    }
  };

  #toggle = (force = !this.open) => {
    this.open = force;
    if (this.open) {
      const item = this.querySelector(BXDropdown.nonSelectedItemSelector);
      item.focus();
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

    this.shadowRoot.querySelector(BXDropdown.triggerSelector).focus();
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
   * The helper text. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get helperText() {
    return this.getAttribute('helper-text');
  }

  set helperText(current) {
    this.setAttribute('helper-text', current);
  }

  /**
   * The unique ID for this dropdown.
   * @return {string}
   */
  get id() {
    return !this.hasAttribute('id') ? this.#uniqueId : this.getAttribute('id');
  }

  /**
   * The label text. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get labelText() {
    return this.getAttribute('label-text');
  }

  set labelText(current) {
    this.setAttribute('label-text', current);
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
    this.attachShadow({ mode: 'open' });
    this.render();

    // Detect IE/Edge which have bubbling `window.onfocusout`
    const hasFocusOut = 'onfocusout' in this.ownerDocument.defaultView;
    const focusoutEventName = hasFocusOut ? 'focusout' : 'blur';
    // Use `focusout` if it's there, otherwise use "capture" mode which has similar-to-bubbling effect
    this.ownerDocument.addEventListener(focusoutEventName, this.#handleFocusOut, !hasFocusOut);
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

  disconnectedCallback() {
    // clean up our listener
    this.ownerDocument.removeEventListener('blur', this.#handleFocusOut, true);
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
    const innerClasses = classnames(`${prefix}--dropdown`, {
      [`${prefix}--dropdown--disabled`]: this.disabled,
      [`${prefix}--dropdown--light`]: this.light,
      [`${prefix}--dropdown--open`]: this.open,
    });
    return html`
      <style>
        ${styles}
      </style>
      <label for=${`${this.id}-inner`} class=${`${prefix}--label`}>${this.labelText}</label>
      <div class=${`${prefix}--form__helper-text`}>${this.helperText}</div>
      <ul
        id=${`${this.id}-inner`}
        class=${innerClasses}
        role="combobox"
        tabindex="0"
        @click=${this.#handleClickInner}
        @keydown=${this.#handleKeydownInner}
      >
        <li class=${`${prefix}--dropdown-text`}>${this.#selectedContent || this.triggerContent}</li>
        <li class=${`${prefix}--dropdown__arrow-container`}>${dropdownArrow({ classNames: `${prefix}--dropdown__arrow` })}</li>
        <li>
          <ul role="listbox" class=${`${prefix}--dropdown-list`} @click=${this.#handleClickItem}>
            <slot></slot>
          </ul>
        </li>
      </ul>
    `;
  }

  static get observedAttributes() {
    return ['disabled', 'helper-text', 'id', 'label-text', 'light', 'open', 'value', 'trigger-content'];
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

  /**
   * The selector for the trigger element
   */
  static get triggerSelector() {
    return `.${prefix}--dropdown`;
  }

  /**
   * A selector that will return non-selected items
   */
  static get nonSelectedItemSelector() {
    return `${BXDropdownItem.is}:not(.bx--dropdown--selected)`;
  }
}

window.customElements.define(BXDropdown.is, BXDropdown);

export default BXDropdown;
