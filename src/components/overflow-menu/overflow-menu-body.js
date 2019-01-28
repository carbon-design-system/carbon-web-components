import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import BXFloatingMenu from '../floating-menu/floating-menu';
import styles from './overflow-menu.scss';

/**
 * Overflow menu body.
 * @extends BXFloatingMenu
 */
class BXOverflowMenuBody extends BXFloatingMenu {
  /**
   * How the menu is aligned to the trigger button. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get alignment() {
    return this.getAttribute('alignment') || this.constructor.ALIGNMENT_START;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menu');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '-1');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
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

  /**
   * The tag name of this custom element, which is, `<bx-overflow-menu-body>`.
   * @type {string}
   */
  static get is() {
    const { prefix } = settings;
    return `${prefix}-overflow-menu-body`;
  }
}

window.customElements.define(BXOverflowMenuBody.is, BXOverflowMenuBody);

export default BXOverflowMenuBody;
