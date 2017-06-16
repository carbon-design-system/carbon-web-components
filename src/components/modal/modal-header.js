import { html, render } from 'lit-html';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './modal.scss';

const { prefix } = settings;

/**
 * Modal header.
 * @extends HTMLElement
 */
class BXModalHeader extends HTMLElement {
  /* eslint-disable class-methods-use-this */
  /**
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  template() {
    return html`
      <style>
        ${styles}
      </style>
      <slot></slot>
    `;
  }
  /* eslint-enable class-methods-use-this */

  connectedCallback() {
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
   * The tag name of this custom element, which is, `<bx-modal-header>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-modal-header`;
  }
}

window.customElements.define(BXModalHeader.is, BXModalHeader);

export default BXModalHeader;
