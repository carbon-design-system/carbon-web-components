import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list header.
 */
@customElement(`${prefix}-structured-list-head`)
class BXStructuredListHeader extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXStructuredListHeader;
