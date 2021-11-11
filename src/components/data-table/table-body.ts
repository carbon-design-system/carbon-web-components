/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, query, customElement, LitElement } from 'lit-element';
import { TABLE_COLOR_SCHEME } from './defs';
import BXTableRow from './table-row';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Data table body.
 * @element bx-table-body
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
    const { colorScheme, _slotNode: slotNode } = this;
    slotNode.assignedNodes().forEach(node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const odd = (node as HTMLElement).matches('*:nth-of-type(odd)');
        (node as BXTableRow).even = colorScheme === TABLE_COLOR_SCHEME.ZEBRA && !odd;
        (node as BXTableRow).odd = colorScheme === TABLE_COLOR_SCHEME.ZEBRA && odd;
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
   * The color scheme.
   */
  @property({ reflect: true, attribute: 'color-scheme' })
  colorScheme = TABLE_COLOR_SCHEME.REGULAR;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'rowgroup');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('colorScheme')) {
      this._updateZebra();
    }
  }

  render() {
    const { _handleSlotChange: handleSlotChange } = this;
    return html` <slot @slotchange="${handleSlotChange}"></slot> `;
  }

  static styles = styles;
}

export default BXTableBody;
