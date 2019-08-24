import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import styles from './data-table.scss';

const { prefix } = settings;

/**
 * Data table row.
 */
@customElement(`${prefix}-table-row`)
class BXTableRow extends LitElement {
  /**
   * Handles `click` event on the check box.
   * @param event The event.
   */
  private _handleClickSelectionCheckbox(event: Event) {
    const selected = (event.target as HTMLInputElement).checked;
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        selected,
      },
    };
    const constructor = this.constructor as typeof BXTableRow;
    if (!this.dispatchEvent(new CustomEvent(constructor.eventBeforeChangeSelection, init))) {
      this.selected = selected;
      event.preventDefault();
    }
  }

  /**
   * `true` if this table row should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this table row is placed at an even position in parent `<bx-table-body>`.
   * `<bx-table-body>` sets this property, _only_ in zebra stripe mode.
   * Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  even = false;

  /**
   * `true` if this table row is placed at an odd position in parent `<bx-table-body>`.
   * `<bx-table-body>` sets this property, _only_ in zebra stripe mode.
   * Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  odd = false;

  /**
   * `true` if this table row should work as an expando. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  section = false;

  /**
   * `true` if this table row should be selected. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The `aria-label` attribute for the `<label>` for selection. Corresponds to `selection-label` attribute.
   */
  @property({ attribute: 'selection-label' })
  selectionLabel = '';

  /**
   * The `name` attribute for the `<input>` for selection. Corresponds to `selection-name` attribute.
   * If present, this table row will be a selectable one.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  /**
   * The `value` attribute for the `<input>` for selection. Corresponds to `selection-value` attribute.
   */
  @property({ attribute: 'selection-value' })
  selectionValue = '';

  connectedCallback() {
    const table = this.closest((this.constructor as typeof BXTableRow).selectorTable);
    if (table) {
      // Propagate `size` attribute from `<bx-table>` until `:host-context()` gets supported in all major browsers
      this.setAttribute('size', table.getAttribute('size')!);
    }
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'row');
    }
    super.connectedCallback();
  }

  render() {
    const { disabled, section, selected, selectionLabel, selectionName, selectionValue } = this;
    const expando = !section
      ? undefined
      : html`
          <div class="${prefix}--table-expand">
            <button class="${prefix}--table-expand__button">
              ${ChevronRight16({ class: `${prefix}--table-expand__svg` })}
            </button>
          </div>
        `;
    // Using `@click` instead of `@change` to support `.preventDefault()`
    const selection = !selectionName
      ? undefined
      : html`
          <div class="${prefix}--table-column-checkbox">
            ${html`
              <input
                id="selection"
                class="${prefix}--checkbox"
                type="checkbox"
                value="${selectionValue}"
                name="${selectionName}"
                ?disabled="${disabled}"
                .checked=${selected}
                @click=${this._handleClickSelectionCheckbox}
              />
              <label for="selection" class="${prefix}--checkbox-label" aria-label="${selectionLabel}"></label>
            `}
          </div>
        `;

    return html`
      ${expando}${selection}<slot></slot>
    `;
  }

  /**
   * The name of the custom event fired before this row is selected/unselected upon a user gesture.
   * Cancellation of this event stops the user-initiated change in selection.
   */
  static get eventBeforeChangeSelection() {
    return `${prefix}-table-row-change-selection`;
  }

  /**
   * The CSS selector to find the table.
   */
  static selectorTable = `${prefix}-table`;

  static styles = styles;
}

export default BXTableRow;
