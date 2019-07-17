import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import { forEach } from '../../globals/internal/collection-helpers';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Table size.
 */
export enum TABLE_SIZE {
  /**
   * Compact size.
   */
  COMPACT = 'compact',

  /**
   * Short size.
   */
  SHORT = 'short',

  /**
   * Regular size.
   */
  REGULAR = 'regular',

  /**
   * Tall size.
   */
  TALL = 'tall',
}

/**
 * Data table.
 */
@customElement(`${prefix}-table` as any)
class BXTable extends LitElement {
  /**
   * `true` if the the table should use the compact version of the UI. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = TABLE_SIZE.REGULAR;

  /**
   * `true` if this table should support sorting. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  sort = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'table');
    }
    super.connectedCallback();
  }

  attributeChangedCallback(name, old, current) {
    if (name === 'size') {
      // Propagate `size` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll((this.constructor as typeof BXTable).selectorRowsWithHeader), elem => {
        elem.setAttribute('size', current);
      });
    }
    super.attributeChangedCallback(name, old, current);
  }

  render() {
    return html`
      <slot></slot>
    `;
  }

  /**
   * The CSS selector to find the rows, including header rows.
   */
  static selectorRowsWithHeader = `${prefix}-table-header-row,${prefix}-table-row`;

  static styles = styles;
}

export default BXTable;
