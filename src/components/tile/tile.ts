import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Basic tile.
 */
@customElement(`${prefix}-tile`)
class BXTile extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXTile;
