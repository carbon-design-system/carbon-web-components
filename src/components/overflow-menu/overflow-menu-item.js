import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import styles from './overflow-menu.scss';

const { prefix } = settings;

/**
 * Overflow menu item.
 * @extends HTMLElement
 */
class BXOverflowMenuItem extends HTMLElement {
  /**
   * `true` if the action is danger. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get danger() {
    return this.hasAttribute('danger');
  }

  set danger(current) {
    if (current) {
      this.setAttribute('danger', '');
    } else {
      this.removeAttribute('danger');
    }
  }

  /**
   * `true` if the overflow menu item should be disabled. Corresponds to the attribute with the same name.
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
   * The link href of the overflow menu item. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get href() {
    return this.getAttribute('href');
  }

  set href(current) {
    this.setAttribute('href', current);
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menuitem');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
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
    const button = this.href
      ? html`
          <a
            class="${prefix}--overflow-menu-options__btn"
            ?disabled=${this.disabled}
            href="${this.href}"
            tabindex="${this.disabled ? -1 : 0}"
            ><slot></slot
          ></a>
        `
      : html`
          <button class="${prefix}--overflow-menu-options__btn" ?disabled=${this.disabled} tabindex="${this.disabled ? -1 : 0}">
            <slot></slot>
          </button>
        `;
    return html`
      <style>
        ${styles}
      </style>
      ${button}
    `;
    /* eslint-enable no-script-url */
  }

  /**
   * The tag name of this custom element, which is, `<bx-overflow-menu-item>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-overflow-menu-item`;
  }
}

window.customElements.define(BXOverflowMenuItem.is, BXOverflowMenuItem);

export default BXOverflowMenuItem;
