/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Table batch actions.
 */
@customElement(`${prefix}-table-batch-actions`)
class BXTableBatchActions extends LitElement {
  /**
   * Handles `click` event on the Cancel button.
   */
  private _handleCancel() {
    const { eventAfterClickCancel } = this.constructor as typeof BXTableBatchActions;
    this.dispatchEvent(new CustomEvent(eventAfterClickCancel, { bubbles: true, composed: true }));
  }

  /**
   * `true` if this batch actions bar should be active. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * The formatter for selected items. Should be changed upon the locale the UI is rendered with.
   */
  @property({ attribute: false })
  formatSelectedItemsCount = ({ count }) => `${count} item${count <= 1 ? '' : 's'} selected`;

  /**
   * Numeric representation of the total number of items selected in a table.
   * This number is used to derive the selection message.
   * Corresponds to `selected-rows-count` attribute.
   */
  @property({ type: Number, attribute: 'selected-rows-count' })
  selectedRowsCount = 0;

  render() {
    const { formatSelectedItemsCount, selectedRowsCount, _handleCancel: handleCancel } = this;
    return html`
      <div class="${prefix}--action-list">
        <slot></slot>
        <button class="${prefix}--btn ${prefix}--btn--primary ${prefix}--batch-summary__cancel" @click=${handleCancel}>
          <slot name="cancel-button-content">Cancel</slot>
        </button>
      </div>
      <div class="${prefix}--batch-summary">
        <p class="${prefix}--batch-summary__para">
          ${formatSelectedItemsCount({ count: selectedRowsCount })}
        </p>
      </div>
    `;
  }

  /**
   * The name of the custom event fired after the Cancel button is clicked.
   */
  static get eventAfterClickCancel() {
    return `${prefix}-table-batch-actions-cancel-clicked`;
  }

  static styles = styles;
}

export default BXTableBatchActions;
