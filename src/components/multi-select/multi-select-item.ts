import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, customElement } from 'lit-element';
import BXDropdownItem from '../dropdown/dropdown-item';
import styles from './multi-select.scss';

const { prefix } = settings;

/**
 * Multi select item.
 */
@customElement(`${prefix}-multi-select-item` as any)
class BXMultiSelectItem extends BXDropdownItem {
  /**
   * Unique ID used for form elements.
   */
  protected _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * `true` if this multi select should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The `name` attribute for the `<input>` for selection. Corresponds to `selection-name` attribute.
   */
  @property({ attribute: 'selection-name' })
  selectionName = '';

  connectedCallback() {
    const list = this.closest((this.constructor as typeof BXMultiSelectItem).selectorList);
    if (list) {
      // Propagate `disabled` attribute from `<multi-select>` until `:host-context()` gets supported in all major browsers
      if (!list.hasAttribute('disabled')) {
        this.removeAttribute('disabled');
      } else {
        this.setAttribute('disabled', list.getAttribute('disabled')!);
      }
    }
    super.connectedCallback();
  }

  render() {
    const { id: elementId, disabled, selected, selectionName, value } = this;
    return html`
      <div class="${prefix}--list-box__menu-item__option">
        <div class="${prefix}--form-item ${prefix}--checkbox-wrapper">
          <input
            id="__bx-multi-select-item_checkbox_${elementId || this._uniqueId}"
            type="checkbox"
            class="${prefix}--checkbox"
            tabindex="-1"
            readonly
            ?disabled=${disabled}
            .checked=${selected}
            name="${ifDefined(selectionName || undefined)}"
            value="${value}"
          />
          <label for="__bx-multi-select-item_checkbox_${elementId || this._uniqueId}" class="${prefix}--checkbox-label">
            <span class="${prefix}--checkbox-label-text"><slot></slot></span>
          </label>
        </div>
      </div>
    `;
  }

  /**
   * A selector that will return multi select.
   */
  static get selectorList() {
    return `${prefix}-multi-select`;
  }

  static styles = styles;
}

export default BXMultiSelectItem;
