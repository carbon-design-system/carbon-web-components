import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import styles from './tooltip.scss';

const { prefix } = settings;

/**
 * Tooltip footer.
 * @extends HTMLElement
 */
class BXTooltipFooter extends HTMLElement {
  connectedCallback() {
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
   * The tag name of this custom element, which is, `<bx-tooltip-footer>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-tooltip-footer`;
  }
}

window.customElements.define(BXTooltipFooter.is, BXTooltipFooter);

export default BXTooltipFooter;
