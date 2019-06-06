import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list header row.
 */
@customElement(`${prefix}-structured-list-header-row` as any)
class BXStructuredListHeaderRow extends LitElement {
  /**
   * `true` if parent structured list supports selection. Corresponds to `has-selection` attribute.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-selection' })
  hasSelection = false;

  render() {
    // We could look up in DOM for `bx-structured-list[hasSelection]`,
    // but uses `hasSelection` prop to utilize attribute change callback
    if (this.hasSelection) {
      return html`
        <slot></slot>
        <div class="${prefix}--structured-list-th"></div>
      `;
    }
    return html`
      <slot></slot>
    `;
  }

  static styles = styles;
}

export default BXStructuredListHeaderRow;
