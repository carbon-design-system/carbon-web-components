import settings from 'carbon-components/es/globals/js/settings';
import { html, customElement, LitElement } from 'lit-element';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Data table container.
 */
@customElement(`${prefix}-data-table`)
class BXDataTable extends LitElement {
  render() {
    return html`
      <section class="${prefix}--data-table_inner-container"><slot></slot></section>
    `;
  }

  static styles = styles;
}

export default BXDataTable;
