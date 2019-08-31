import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './accordion.scss';

const { prefix } = settings;

/**
 * Accordion container.
 */
@customElement(`${prefix}-accordion`)
class BXAccordion extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXAccordion;
