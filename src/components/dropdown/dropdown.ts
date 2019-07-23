import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/lib/chevron--down/16';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import FocusMixin from '../../globals/mixins/focus';
import HostListenerMixin from '../../globals/mixins/host-listener';
import HostListener from '../../globals/decorators/host-listener';
import { find, forEach, indexOf } from '../../globals/internal/collection-helpers';
import BXDropdownItem from './dropdown-item';
import styles from './dropdown.scss';

const { prefix } = settings;

/**
 * Navigation direction, associated with key symbols.
 */
export const NAVIGATION_DIRECTION = {
  Up: -1,
  ArrowUp: -1,
  Down: 1,
  ArrowDown: 1,
};

/**
 * Symbols of keys that triggers opening/closing menu and selecting/deselecting menu item.
 */
export const TRIGGER_KEYS = new Set([' ', 'Enter']);

/**
 * The keyboard action categories for multi select.
 */
export enum DROPDOWN_KEYBOARD_ACTION {
  /**
   * Not doing any action.
   */
  NONE = 'none',

  /**
   * Keyboard action to close menu.
   */
  CLOSING = 'closing',

  /**
   * Keyboard action to navigate back/forward.
   */
  NAVIGATING = 'navigating',

  /**
   * Keyboard action to open/close menu on the trigger button or select/deselect a menu item.
   */
  TRIGGERING = 'triggering',
}

/**
 * Multi select types.
 */
export enum DROPDOWN_TYPE {
  /**
   * Regular type.
   */
  REGULAR = 'regular',

  /**
   * Inline type.
   */
  INLINE = 'inline',
}

/**
 * @returns A action for multi select for the given key symbol.
 */
export const getAction = (key: string) => {
  if (key === 'Escape') {
    return DROPDOWN_KEYBOARD_ACTION.CLOSING;
  }
  if (key in NAVIGATION_DIRECTION) {
    return DROPDOWN_KEYBOARD_ACTION.NAVIGATING;
  }
  if (TRIGGER_KEYS.has(key)) {
    return DROPDOWN_KEYBOARD_ACTION.TRIGGERING;
  }
  return DROPDOWN_KEYBOARD_ACTION.NONE;
};

/**
 * Dropdown.
 */
@customElement(`${prefix}-dropdown` as any)
class BXDropdown extends HostListenerMixin(FocusMixin(LitElement)) {
  /**
   * The latest status of this dropdown, for screen reader to accounce.
   */
  private _assistiveStatusText?: string;

  /**
   * The content of the selected item.
   */
  private _selectedItemContent: DocumentFragment | null = null;

  /**
   * Unique ID used for ID refs.
   */
  private _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * @param itemToSelect A dropdown item. Absense of this argument means clearing selection.
   * @returns `true` if the selection of this dropdown should change if the given item is selected upon user interaction.
   */
  protected _selectionShouldChange(itemToSelect?: BXDropdownItem) {
    return !itemToSelect || itemToSelect.value !== this.value;
  }

  /**
   * A callback that runs after change in dropdown selection upon user interaction is confirmed.
   * @param itemToSelect
   *   A dropdown item.
   *   Absense of this argument means clearing selection, which may be handled by a derived class.
   */
  protected _selectionDidChange(itemToSelect?: BXDropdownItem) {
    if (itemToSelect) {
      this.value = itemToSelect.value;
      forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemSelected), item => {
        (item as BXDropdownItem).selected = false;
      });
      itemToSelect.selected = true;
      this._assistiveStatusText = this.selectedItemAssistiveText;
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles `click` event on the top-level element in the shadow DOM.
   * @param event The event.
   */
  protected _handleClickInner(event: MouseEvent) {
    if (this.shadowRoot!.contains(event.target as Node)) {
      this._handleUserInitiatedToggle();
    } else {
      const item = (event.target as Element).closest((this.constructor as typeof BXDropdown).selectorItem) as BXDropdownItem;
      if (this.contains(item)) {
        this._handleUserInitiatedSelectItem(item);
      }
    }
  }

  /**
   * Handler for the `keydown` event on the top-level element in the shadow DOM.
   */
  protected _handleKeydownInner(event: KeyboardEvent) {
    const { key } = event;
    if (!this.open) {
      switch (getAction(key)) {
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
          this._handleUserInitiatedToggle(true);
          // If this menu gets open with an arrow key, reset the highlight
          this._clearHighlight();
          break;
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          this._handleUserInitiatedToggle(true);
          break;
        default:
          break;
      }
    } else {
      switch (getAction(key)) {
        case DROPDOWN_KEYBOARD_ACTION.CLOSING:
          this._handleUserInitiatedToggle(false);
          break;
        case DROPDOWN_KEYBOARD_ACTION.NAVIGATING:
          this._navigate(NAVIGATION_DIRECTION[key]);
          break;
        case DROPDOWN_KEYBOARD_ACTION.TRIGGERING:
          {
            const constructor = this.constructor as typeof BXDropdown;
            const highlightedItem = this.querySelector(constructor.selectorItemHighlighted) as BXDropdownItem;
            if (highlightedItem) {
              this._handleUserInitiatedSelectItem(highlightedItem);
            } else {
              this._handleUserInitiatedToggle(false);
            }
          }
          break;
        default:
          break;
      }
    }
  }

  /**
   * Handles `blur` event handler on the document this element is in.
   */
  @HostListener('blur')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  protected _handleFocusOut(event) {
    if (!this.contains(event.relatedTarget)) {
      this._handleUserInitiatedToggle(false);
    }
  }

  /**
   * Handles user-initiated selection of a multi select item.
   * @param [item] The multi select item user wants to select. Absense of this argument means clearing selection.
   */
  protected _handleUserInitiatedSelectItem(item?: BXDropdownItem) {
    if (this._selectionShouldChange(item)) {
      const init = {
        bubbles: true,
        composed: true,
        detail: {
          item,
        },
      };
      const constructor = this.constructor as typeof BXDropdown;
      const beforeSelectEvent = new CustomEvent(constructor.eventBeforeSelect, {
        ...init,
        cancelable: true,
      });
      if (this.dispatchEvent(beforeSelectEvent)) {
        this._selectionDidChange(item);
        const afterSelectEvent = new CustomEvent(constructor.eventAfterSelect, init);
        this.dispatchEvent(afterSelectEvent);
      }
    }
  }

  /**
   * Handles user-initiated toggling the open state.
   * @param [force] If specified, forces the open state to the given one.
   */
  private _handleUserInitiatedToggle(force: boolean = !this.open) {
    this.open = force;
    if (this.open) {
      this._assistiveStatusText = this.selectingItemsAssistiveText;
    } else {
      const {
        selectedItemAssistiveText,
        triggerContent,
        _assistiveStatusText: assistiveStatusText,
        _selectedItemContent: selectedItemContent,
      } = this;
      const selectedItemText = (selectedItemContent && selectedItemContent.textContent) || triggerContent;
      if (selectedItemText && assistiveStatusText !== selectedItemAssistiveText) {
        this._assistiveStatusText = selectedItemText;
      }
      forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemHighlighted), item => {
        (item as BXDropdownItem).highlighted = false;
      });
    }
    this.requestUpdate();
  }

  /**
   * Clears the selection of multi select items.
   */
  protected _clearHighlight() {
    forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItem), item => {
      (item as BXDropdownItem).highlighted = false;
    });
  }

  /**
   * Navigate through multi select items.
   * @param direction `-1` to navigate backward, `1` to navigate forward.
   */
  protected _navigate(direction: number) {
    const constructor = this.constructor as typeof BXDropdown;
    const items = this.querySelectorAll(constructor.selectorItem);
    const highlightedItem = this.querySelector(constructor.selectorItemHighlighted);
    const highlightedIndex = indexOf(items, highlightedItem!);
    let nextIndex = highlightedIndex + direction;
    if (nextIndex < 0) {
      nextIndex = items.length - 1;
    }
    if (nextIndex >= items.length) {
      nextIndex = 0;
    }
    forEach(items, (item, i) => {
      (item as BXDropdownItem).highlighted = i === nextIndex;
    });

    const nextItem = items[nextIndex];
    // Using `{ block: 'nearest' }` to prevent scrolling unless scrolling is absolutely necessary.
    // `scrollIntoViewOptions` seems to work in latest Safari despite of MDN/caniuse table.
    // IE falls back to the old behavior.
    nextItem.scrollIntoView({ block: 'nearest' });

    const nextItemText = nextItem.textContent;
    if (nextItemText) {
      this._assistiveStatusText = nextItemText;
    }
    this.requestUpdate();
  }

  /* eslint-disable class-methods-use-this */
  /**
   * @returns The content preceding the trigger button.
   */
  protected _renderPrecedingTriggerContent() {
    return undefined;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * `true` if this multi select should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text. Corresponds to `helper-text` attribute.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * `true` if this multi select should use the light UI variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  light = false;

  /**
   * `true` if this multi select should be open. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * An assistive text for screen reader to announce, telling the open state.
   */
  @property({ attribute: 'selecting-items-assistive-text' })
  selectingItemsAssistiveText = 'Selecting items. Use up and down arrow keys to navigate.';

  /**
   * An assistive text for screen reader to announce, telling that an item is selected.
   */
  @property({ attribute: 'selected-item-assistive-text' })
  selectedItemAssistiveText = 'Selected an item.';

  /**
   * The `aria-label` attribute for the UI indicating the closed state. Corresponds to `toggle-label-closed` attribute.
   */
  @property({ attribute: 'toggle-label-closed' })
  toggleLabelClosed = '';

  /**
   * The `aria-label` attribute for the UI indicating the open state. Corresponds to `toggle-label-open` attribute.
   */
  @property({ attribute: 'toggle-label-open' })
  toggleLabelOpen = '';

  /**
   * The content of the trigger button. Corresponds to `trigger-content` attribute.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  /**
   * `true` if this multi select should use the inline UI variant. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  type = DROPDOWN_TYPE.REGULAR;

  /**
   * The validity message. Corresponds to `validity-message` attribute.
   * If present and non-empty, this multi select shows the UI of its invalid state.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the selected item. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  value = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'disabled') {
        // Propagate `disabled` attribute to descendants until `:host-context()` gets supported in all major browsers
        forEach(this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItem), elem => {
          if (current === null) {
            elem.removeAttribute('disabled');
          } else {
            elem.setAttribute('disabled', current);
          }
        });
      } else if (name === 'value') {
        const { itemTagName } = this.constructor as typeof BXDropdown;
        forEach(this.getElementsByTagName(itemTagName), elem => {
          elem.toggleAttribute('selected', (elem as BXDropdownItem).value === this.value);
        });
        const item = find(this.getElementsByTagName(itemTagName), elem => (elem as BXDropdownItem).value === this.value);
        if (item) {
          const range = this.ownerDocument!.createRange();
          range.selectNodeContents(item);
          this._selectedItemContent = range.cloneContents();
        } else {
          this._selectedItemContent = null;
        }
      }
    }
    super.attributeChangedCallback(name, old, current);
  }

  updated(changedProperties) {
    const { helperText, type } = this;
    const inline = type === DROPDOWN_TYPE.INLINE;
    if ((changedProperties.has('helperText') || changedProperties.has('type')) && helperText && inline) {
      // eslint-disable-next-line no-console
      console.warn('Found `helperText` property/attribute usage in inline mode, that is not supported, at:', this);
    }
  }

  render() {
    const {
      id: elementId,
      disabled,
      helperText,
      labelText,
      light,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      triggerContent,
      type,
      validityMessage,
      _handleClickInner: handleClickInner,
      _handleKeydownInner: handleKeydownInner,
      _assistiveStatusText: assistiveStatusText,
    } = this;
    const selectedItemContent = this._selectedItemContent || triggerContent;
    const inline = type === DROPDOWN_TYPE.INLINE;
    const hasValidity = Boolean(validityMessage);
    const selectedItemsCount = this.querySelectorAll((this.constructor as typeof BXDropdown).selectorItemSelected).length;
    const classes = classnames(`${prefix}--dropdown`, `${prefix}--list-box`, {
      [`${prefix}--list-box--disabled`]: disabled,
      [`${prefix}--list-box--inline`]: inline,
      [`${prefix}--list-box--light`]: light,
      [`${prefix}--list-box--expanded`]: open,
      [`${prefix}--dropdown--invalid`]: hasValidity,
      [`${prefix}--dropdown--inline`]: inline,
      [`${prefix}--dropdown--selected`]: selectedItemsCount > 0,
    });
    const labelClasses = classnames(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: disabled,
    });
    const helperClasses = classnames(`${prefix}--form__helper-text`, {
      [`${prefix}--form__helper-text--disabled`]: disabled,
    });
    const iconContainerClasses = classnames(`${prefix}--list-box__menu-icon`, {
      [`${prefix}--list-box__menu-icon--open`]: open,
    });
    const toggleLabel = (open ? toggleLabelOpen : toggleLabelClosed) || undefined;
    const label = !labelText
      ? undefined
      : html`
          <label class="${labelClasses}">${labelText}</label>
        `;
    const helper =
      !helperText || inline
        ? undefined
        : html`
            <div class="${helperClasses}">${helperText}</div>
          `;
    const validity = !hasValidity
      ? undefined
      : html`
          <div class=${`${prefix}--form-requirement`}>${validityMessage}</div>
        `;
    const validityIcon = !hasValidity
      ? undefined
      : WarningFilled16({ class: `${prefix}--list-box__invalid-icon`, 'aria-label': toggleLabel });
    const menuBodyId = `__bx-ce-dropdown_menu_${elementId || this._uniqueId}`;
    const menuBody = !open
      ? undefined
      : html`
          <div id="${menuBodyId}" class="${prefix}--list-box__menu" role="listbox" tabindex="-1">
            <slot></slot>
          </div>
        `;
    const triggerLabelId = `__bx-ce-dropdown_trigger-label_${elementId || this._uniqueId}`;
    return html`
      ${label} ${helper}
      <div
        role="listbox"
        class="${classes}"
        ?data-invalid=${hasValidity}
        @click=${handleClickInner}
        @keydown=${handleKeydownInner}
      >
        ${validityIcon}
        <div
          role="button"
          class="${prefix}--list-box__field"
          tabindex="0"
          aria-labelledby="${triggerLabelId}"
          aria-expanded="${String(open)}"
          aria-haspopup="listbox"
          aria-owns="${menuBodyId}"
          aria-controls="${menuBodyId}"
        >
          ${this._renderPrecedingTriggerContent()}
          <span id="${triggerLabelId}" class="${prefix}--list-box__label">${selectedItemContent}</span>
          <div class="${iconContainerClasses}">
            ${ChevronDown16({ 'aria-label': toggleLabel })}
          </div>
        </div>
        ${menuBody}
      </div>
      ${validity}
      <div class="${prefix}--assistive-text" role="status" aria-live="assertive" aria-relevant="additions text">
        ${assistiveStatusText}
      </div>
    `;
  }

  /**
   * The tag name of the element working as a multi select item, which is, `<bx-dropdown-item>`.
   * We use a separate property from `.selectorItem` due to the nature in difference of tag name vs. selector.
   */
  static get itemTagName() {
    return `${prefix}-dropdown-item`;
  }

  /**
   * A selector that will return highlighted items.
   */
  static get selectorItemHighlighted() {
    return `${prefix}-dropdown-item[highlighted]`;
  }

  /**
   * A selector that will return multi select items.
   * We use a separate property from `.itemTagName` due to the nature in difference of tag name vs. selector.
   */
  static get selectorItem() {
    return `${prefix}-dropdown-item`;
  }

  /**
   * A selector that will return selected items.
   */
  static get selectorItemSelected() {
    return `${prefix}-dropdown-item[selected]`;
  }

  /**
   * The name of the custom event fired before a multi select item is selected upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-dropdown-beingselected`;
  }

  /**
   * The name of the custom event fired after a a multi select item is selected upon a user gesture.
   */
  static get eventAfterSelect() {
    return `${prefix}-dropdown-selected`;
  }

  static styles = styles;
}

export default BXDropdown;
