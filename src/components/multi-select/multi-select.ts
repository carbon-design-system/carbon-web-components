/**
 * @license
 *
 * Copyright IBM Corp. 2020, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, query, customElement } from 'lit-element';
import Close16 from '@carbon/icons/lib/close/16';
import { filter, forEach } from '../../globals/internal/collection-helpers';
import BXDropdown, { DROPDOWN_KEYBOARD_ACTION } from '../dropdown/dropdown';
import BXMultiSelectItem from './multi-select-item';
import styles from './multi-select.scss';

export { DROPDOWN_COLOR_SCHEME, DROPDOWN_SIZE, DROPDOWN_TYPE } from '../dropdown/dropdown';

const { prefix } = settings;

/**
 * Multi select.
 * @element bx-multi-select
 * @fires bx-multi-select-beingselected
 *   The custom event fired before a multi select item is selected upon a user gesture.
 *   Cancellation of this event stops changing the user-initiated selection.
 * @fires bx-multi-select-selected - The custom event fired after a multi select item is selected upon a user gesture.
 * @fires bx-multi-select-beingtoggled
 *   The custom event fired before the open state of this multi select is toggled upon a user gesture.
 *   Cancellation of this event stops the user-initiated toggling.
 * @fires bx-multi-select-toggled
 *   The custom event fired after the open state of this multi select is toggled upon a user gesture.
 */
@customElement(`${prefix}-multi-select`)
class BXMultiSelect extends BXDropdown {
  /**
   * The count of selected items.
   */
  private _selectedItemsCount = 0;

  /**
   * The selection button.
   */
  @query('#selection-button')
  private _selectionButtonNode!: HTMLElement;

  /**
   * The trigger button.
   */
  @query(`.${prefix}--list-box__field`)
  private _triggerNode!: HTMLElement;

  protected _selectionShouldChange(itemToSelect?: BXMultiSelectItem) {
    // If we are selecting an item, assumes we always toggle
    return Boolean(this.value || itemToSelect);
  }

  protected _selectionDidChange(itemToSelect?: BXMultiSelectItem) {
    if (itemToSelect) {
      itemToSelect.selected = !itemToSelect.selected;
      this._assistiveStatusText = itemToSelect.selected ? this.selectedItemAssistiveText : this.unselectedItemAssistiveText;
    } else {
      forEach(this.querySelectorAll((this.constructor as typeof BXMultiSelect).selectorItemSelected), item => {
        (item as BXMultiSelectItem).selected = false;
      });
      this._handleUserInitiatedToggle(false);
      this._assistiveStatusText = this.unselectedAllAssistiveText;
    }
    // Change in `.selected` hasn't been reflected to the corresponding attribute yet
    this.value = filter(
      this.querySelectorAll((this.constructor as typeof BXMultiSelect).selectorItem),
      item => (item as BXMultiSelectItem).selected
    )
      .map(item => (item as BXMultiSelectItem).value)
      .join(',');
  }

  protected _handleClickInner(event: MouseEvent) {
    if (this._selectionButtonNode?.contains(event.target as Node)) {
      this._handleUserInitiatedSelectItem();
    } else {
      const shouldIgnoreClickInner = elem =>
        elem.closest && elem.closest((this.constructor as typeof BXMultiSelect).selectorIgnoreClickInner);
      if (!event.composedPath().some(shouldIgnoreClickInner)) {
        super._handleClickInner(event);
      }
    }
  }

  protected _handleKeydownInner(event: KeyboardEvent) {
    const { key } = event;
    if (
      this._selectionButtonNode?.contains(event.target as Node) &&
      (this.constructor as typeof BXMultiSelect).TRIGGER_KEYS.has(key)
    ) {
      this._handleUserInitiatedSelectItem();
      this._triggerNode.focus();
    } else {
      // Ensures up/down keys won't keep focus on "clear selection" button
      if (DROPDOWN_KEYBOARD_ACTION.NAVIGATING === (this.constructor as typeof BXMultiSelect).getAction(key)) {
        this._triggerNode.focus();
      }
      super._handleKeydownInner(event);
    }
  }

  protected _renderPrecedingTriggerContent() {
    const { clearSelectionLabel, _selectedItemsCount: selectedItemsCount } = this;
    return selectedItemsCount === 0
      ? undefined
      : html`
          <div
            id="selection-button"
            role="button"
            class="${prefix}--list-box__selection ${prefix}--list-box__selection--multi ${prefix}--tag--filter"
            tabindex="0"
            title="${clearSelectionLabel}"
          >
            ${selectedItemsCount} ${Close16({ 'aria-label': clearSelectionLabel })}
          </div>
        `;
  }

  /**
   * The `aria-label` attribute for the icon to clear selection.
   */
  @property({ attribute: 'clear-selection-label' })
  clearSelectionLabel = '';

  /**
   * An assistive text for screen reader to announce, telling that an item is unselected.
   */
  @property({ attribute: 'unselected-item-assistive-text' })
  unselectedItemAssistiveText = 'Unselected an item.';

  /**
   * An assistive text for screen reader to announce, telling that all items are unselected.
   */
  @property({ attribute: 'unselected-all-assistive-text' })
  unselectedAllAssistiveText = 'Unselected all items.';

  shouldUpdate(changedProperties) {
    const { selectorItem } = this.constructor as typeof BXMultiSelect;
    if (changedProperties.has('size')) {
      forEach(this.querySelectorAll(selectorItem), elem => {
        (elem as BXMultiSelectItem).size = this.size;
      });
    }
    if (changedProperties.has('value')) {
      const { value } = this;
      const values = !value ? [] : value.split(',');
      // Updates selection beforehand because our rendering logic for `<bx-multi-select>` looks for selected items via `qSA()`
      const items = this.querySelectorAll(selectorItem);
      forEach(items, elem => {
        (elem as BXMultiSelectItem).selected = values.indexOf((elem as BXMultiSelectItem).value) >= 0;
      });
      this._selectedItemsCount = filter(items, elem => values.indexOf((elem as BXMultiSelectItem).value) >= 0).length;
    }
    return true;
  }

  /**
   * A selector to ignore the `click` events from.
   * Primary for the checkbox label where the `click` event will happen from the associated check box.
   */
  private static get selectorIgnoreClickInner() {
    return `.${prefix}--checkbox-label`;
  }

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-multi-select-item[highlighted]`;
  }

  /**
   * A selector that will return multi select items.
   * We use a separate property from `.itemTagName` due to the nature in difference of tag name vs. selector.
   */
  static get selectorItem() {
    return `${prefix}-multi-select-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-multi-select-item[selected]`;
  }

  /**
   * The name of the custom event fired before this multi select item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this multi select item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-multi-select-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this multi select item is toggled upon a user gesture.
   */
  static get eventToggle() {
    return `${prefix}-multi-select-toggled`;
  }

  /**
   * The name of the custom event fired before a multi select item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-multi-select-beingselected`;
  }

  /**
   * The name of the custom event fired after a a multi select item is selected upon a user gesture.
   */
  static get eventSelect() {
    return `${prefix}-multi-select-selected`;
  }

  static styles = styles;
}

export default BXMultiSelect;
