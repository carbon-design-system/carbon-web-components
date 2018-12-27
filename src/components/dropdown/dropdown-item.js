import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import styles from './dropdown.scss';

const { prefix } = settings;

/**
 * Dropdown menu item.
 * @extends HTMLElement
 */
class BXDropdownItem extends HTMLElement {
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
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
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

  /**
   * The CSS class for the selected item.
   * @type {string}
   */
  static classSelected = `${prefix}--dropdown--selected`;
}

window.customElements.define(BXDropdownItem.is, BXDropdownItem);

export default BXDropdownItem;
