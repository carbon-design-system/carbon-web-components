import { html, render } from 'lit-html';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './modal.scss';

/**
 * Modal close button.
 * @extends HTMLElement
 */
class BXModalCloseButton extends HTMLElement {
  /**
   * A boolean value to indicate that this element is a modal close button.
   * @type {boolean}
   */
  isModalCloseButton = true;

  /* eslint-disable class-methods-use-this */
  /**
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  template() {
    return html`
      <style>
        ${styles}
      </style>
      <svg class="bx--modal-close__icon" width="10" height="10" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <title>Close Modal</title>
        <path
          d="M6.32 5L10 8.68 8.68 10 5 6.32 1.32 10 0 8.68 3.68 5 0 1.32 1.32 0 5 3.68 8.68 0 10 1.32 6.32 5z"
          fill-rule="nonzero"
        />
      </svg>
    `;
  }
  /* eslint-enable class-methods-use-this */

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    this.attachShadow({ mode: 'open' });
    this.render();
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
   * The tag name of this custom element, which is, `<bx-modal-close-button>`.
   * @type {string}
   */
  static get is() {
    const { prefix } = settings;
    return `${prefix}-modal-close-button`;
  }
}

window.customElements.define(BXModalCloseButton.is, BXModalCloseButton);

export default BXModalCloseButton;
