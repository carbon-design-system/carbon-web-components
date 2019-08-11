import settings from 'carbon-components/es/globals/js/settings';
import { TemplateResult } from 'lit-html';
import { html, property, query, customElement } from 'lit-element';
import Close16 from '@carbon/icons/lib/close/16';
import { findIndex, forEach } from '../../globals/internal/collection-helpers';
import BXDropdown, { DROPDOWN_KEYBOARD_ACTION } from '../dropdown/dropdown';
import BXComboBoxItem from './combo-box-item';
import styles from './combo-box.scss';

const { prefix } = settings;

/**
 * Combo box.
 */
@customElement(`${prefix}-combo-box`)
class BXComboBox extends BXDropdown {
  /**
   * The text content that should be set to the `<input>` for filtering.
   */
  protected _filterInputValue = '';

  protected _shouldTriggerBeFocusable = false;

  /**
   * The `<input>` for filtering.
   */
  @query('input')
  protected _filterInput!: HTMLInputElement;

  /**
   * @param item A combo box item.
   * @returns `true` if the given combo box item matches the query text user types.
   */
  protected _testItemWithQueryText(item) {
    return (this.itemMatches || this._defaultItemMatches)(item, this._filterInput.value);
  }

  /* eslint-disable class-methods-use-this */
  /**
   * The default item matching callback.
   * @param item The combo box item.
   * @param queryText The query text user types.
   * @returns `true` if the given combo box item matches the given query text.
   */
  protected _defaultItemMatches(item: BXComboBoxItem, queryText: string): boolean {
    return item.textContent!.toLowerCase().indexOf(queryText.toLowerCase()) >= 0;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * Handles `input` event on the `<input>` for filtering.
   */
  protected _handleInput() {
    const items = this.querySelectorAll((this.constructor as typeof BXComboBox).selectorItem);
    const index = !this._filterInput.value ? -1 : findIndex(items, this._testItemWithQueryText, this);
    if (index >= 0) {
      forEach(items, (item, i) => {
        (item as BXComboBoxItem).highlighted = i === index;
      });
    }
    const { _filterInput: filterInput } = this;
    this._filterInputValue = !filterInput ? '' : filterInput.value;
    this.open = true;
    this.requestUpdate(); // If the only change is to `_filterInputValue`, auto-update doesn't happen
  }

  protected _handleClickInner(event: MouseEvent) {
    if ((event.target as Element).closest((this.constructor as typeof BXComboBox).selectorSelectionButton)) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleClickInner(event);
    }
  }

  protected _handleKeydownInner(event: KeyboardEvent) {
    const { key } = event;
    const action = (this.constructor as typeof BXDropdown).getAction(key);
    const { NAVIGATING, TRIGGERING } = DROPDOWN_KEYBOARD_ACTION;
    if (
      (event.target as Element).closest((this.constructor as typeof BXComboBox).selectorSelectionButton) &&
      action === TRIGGERING
    ) {
      this._handleUserInitiatedClearInput();
    } else {
      super._handleKeydownInner(event);
      if (action === NAVIGATING) {
        event.preventDefault(); // Prevents default behavior in `<input>`
      }
    }
  }

  /**
   * Handles user-initiated clearing the `<input>` for filtering.
   */
  protected _handleUserInitiatedClearInput() {
    this._filterInputValue = '';
    this._filterInput.focus();
    this.open = false;
    this.requestUpdate();
  }

  protected _handleUserInitiatedSelectItem(item?: BXComboBoxItem) {
    if (item && !this._selectionShouldChange(item)) {
      // Escape hatch for `attributeChangedCallback()` logic that updates `._filterInputValue()` when selection changes,
      // given we want to update the `<input>` even if selection doesn't update
      this._filterInputValue = item.textContent || '';
      this.requestUpdate();
    }
    super._handleUserInitiatedSelectItem(item);
  }

  protected _renderTriggerContent(): TemplateResult {
    const {
      disabled,
      inputLabel,
      triggerContent,
      _filterInputValue: filterInputValue,
      _menuBodyId: menuBodyId,
      _triggerLabelId: triggerLabelId,
      _handleInput: handleInput,
    } = this;
    return html`
      <input
        id="${triggerLabelId}"
        class="${prefix}--text-input"
        ?disabled=${disabled}
        placeholder="${triggerContent}"
        .value=${filterInputValue}
        role="combobox"
        aria-label="${inputLabel}"
        aria-controls="${menuBodyId}"
        aria-autocomplete="list"
        @input=${handleInput}
      />
    `;
  }

  protected _renderFollowingTriggerContent(): TemplateResult | void {
    const { clearSelectionLabel, _filterInputValue: filterInputValue } = this;
    return filterInputValue.length === 0
      ? undefined
      : html`
          <div role="button" class="${prefix}--list-box__selection" tabindex="0" title="${clearSelectionLabel}">
            ${Close16({ 'aria-label': clearSelectionLabel })}
          </div>
        `;
  }

  /**
   * The `aria-label` attribute for the icon to clear selection. Corresponds to `clear-selection-label` attribute.
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel = '';

  /**
   * The `aria-label` attribute for the `<input>` for filtering. Corresponds to `input-label` attribute.
   */
  @property({ attribute: 'input-label' })
  inputLabel = '';

  /**
   * The custom item matching callback.
   */
  @property({ attribute: false })
  itemMatches!: (item: BXComboBoxItem, queryText: string) => boolean;

  attributeChangedCallback(name, old, current) {
    super.attributeChangedCallback(name, old, current);
    const { _selectedItemContent: selectedItemContent } = this;
    if (old !== current && name === 'value' && selectedItemContent) {
      this._filterInputValue = selectedItemContent!.textContent || '';
    }
  }

  // For combo box, open/selection with space key is disabled given the input box should take it over
  static TRIGGER_KEYS = new Set(['Enter']);

  /**
   * The tag name of the element working as a combo box item, which is, `<bx-combo-box-item>`.
   * We use a separate property from `.selectorItem` due to the nature in difference of tag name vs. selector.
   */
  static get itemTagName() {
    return `${prefix}-combo-box-item`;
  }

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-combo-box-item[highlighted]`;
  }

  /**
   * A selector to ignore the `click` events from.
   * Primary for the checkbox label where the `click` event will happen from the associated check box.
   */
  static get selectorIgnoreClickInner() {
    return `.${prefix}--checkbox-label`;
  }

  /**
   * A selector that will return combo box items.
   * We use a separate property from `.itemTagName` due to the nature in difference of tag name vs. selector.
   */
  static get selectorItem() {
    return `${prefix}-combo-box-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-combo-box-item[selected]`;
  }

  /**
   * A selector that will return the UI to clear selected items.
   */
  static get selectorSelectionButton() {
    return `.${prefix}--list-box__selection`;
  }

  /**
   * The name of the custom event fired before a combo box item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-combo-box-beingselected`;
  }

  /**
   * The name of the custom event fired after a a combo box item is selected upon a user gesture.
   */
  static get eventAfterSelect() {
    return `${prefix}-combo-box-selected`;
  }

  static styles = styles;
}

export default BXComboBox;
