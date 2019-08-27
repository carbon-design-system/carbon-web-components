import settings from 'carbon-components/es/globals/js/settings';
import { html, property, query, customElement, LitElement } from 'lit-element';
import BXTableRow from './table-row';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Data table body.
 */
@customElement(`${prefix}-table-body`)
class BXTableBody extends LitElement {
  /**
   * The `<slot>` element in the shadow DOM.
   */
  @query('slot')
  private _slotNode!: HTMLSlotElement;

  /**
   * Updates `even`/`odd` properties of the child `<bx-table-row>`s.
   */
  private _updateZebra() {
    const { zebra, _slotNode: slotNode } = this;
    slotNode.assignedNodes().forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const odd = (node as HTMLElement).matches('*:nth-of-type(odd)');
        (node as BXTableRow).even = zebra && !odd;
        (node as BXTableRow).odd = zebra && odd;
      }
    });
  }

  /**
   * Handles `slotchange` event in the `<slot>` element in the shadow DOM.
   */
  private _handleSlotChange = () => {
    this._updateZebra();
  };

  /**
   * `true` if the zebra stripe should be shown. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  zebra = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'rowgroup');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('zebra')) {
      this._updateZebra();
    }
  }

  render() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html`
      <slot @slotchange="${handleSlotChange}"></slot>
    `;
  }

  static styles = styles;
}

export default BXTableBody;
