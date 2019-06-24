import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import classnames from 'classnames';
import { html, property, LitElement, customElement } from 'lit-element';
import ChevronDown16 from '@carbon/icons/es/chevron--down/16';
import icon from '../icon/icon';
import FocusMixin from '../../globals/mixins/focus';
import BXDropdownItem from './dropdown-item';
import styles from './dropdown.scss';

const { prefix } = settings;
const find = (a: HTMLCollectionOf<Element>, predicate: (search: Element) => boolean) => Array.prototype.find.call(a, predicate);
const forEach = (a: HTMLCollectionOf<Element>, predicate: (search: Element) => void) =>
  Array.prototype.forEach.call(a, predicate);

/**
 * Dropdown menu.
 */
@customElement(`${prefix}-dropdown` as any)
class BXDropdown extends FocusMixin(LitElement) {
  /**
   * The handle for the `focusout`/`blur` event handler on the document this element is in.on this element.
   */
  private _hFocusOut: Handle | null = null;

  /**
   * The content of the selected item.
   */
  private _selectedContent: DocumentFragment | null = null;

  /**
   * Handles `click` event on a dropdown item.
   * @param event The event.
   */
  private _handleClickItem = (event: MouseEvent) => {
    const item = event.target as HTMLElement;
    if (item.tagName === (this.constructor as typeof BXDropdown).itemTagName.toUpperCase()) {
      this._handleUserInitiatedSelectItem(item as BXDropdownItem);
    }
  };

  /**
   * Handles `click` event on the top-level element in the shadow DOM.
   * @param event The event.
   */
  private _handleClickInner = (event: MouseEvent) => {
    if (this.shadowRoot!.contains(event.target as Node)) {
      this._toggle();
    }
  };

  /**
   * Handles `focusont`/`blur` event handler on the document this element is in.
   */
  private _handleFocusOut = event => {
    if (!this.contains(event.relatedTarget)) {
      this._toggle(false);
    }
  };

  /**
   * Handler for the `keydown` event on the top-level element in the shadow DOM.
   */
  private _handleKeydownInner = (event: KeyboardEvent) => {
    if (this.shadowRoot!.contains(event.target as Node) && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      event.stopPropagation();
      this._toggle();
    }

    if (event.key === 'Escape') {
      // ensure the dropdown is closed
      this._toggle(false);
      // focus the dropdown trigger - we only want to force focus back on the trigger when the user presses `Escape`
      (this.shadowRoot!.querySelector((this.constructor as typeof BXDropdown).triggerSelector) as HTMLElement)!.focus();
    }
  };

  /**
   * Handles user-initiated toggling the open state.
   */
  private _toggle = (force: boolean = !this.open) => {
    this.open = force;
    if (this.open) {
      const item = this.querySelector((this.constructor as typeof BXDropdown).nonSelectedItemSelector) as HTMLElement;
      if (item) {
        item.focus();
      }
    }
  };

  /**
   * Handles user-initiated selection of a dropdown item.
   * @param item The dropdown item user wants to select.
   */
  private _handleUserInitiatedSelectItem = (item: BXDropdownItem) => {
    // Defining this method as private field due to:
    // https://github.com/babel/eslint-plugin-babel/issues/166
    if (item.value !== this.value) {
      const init = {
        bubbles: true,
        cancelable: true,
        detail: {
          item,
        },
      };
      if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXDropdown).eventBeforeSelect, init))) {
        this.value = item.value;
        this.dispatchEvent(new CustomEvent((this.constructor as typeof BXDropdown).eventAfterSelect, init));
        this.open = false;
        (this.shadowRoot!.querySelector((this.constructor as typeof BXDropdown).triggerSelector) as HTMLElement)!.focus();
      }
    }
  };

  /**
   * `true` if the dropdown should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text. Corresponds to the attribute with the same name.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * The unique ID for this dropdown.
   */
  @property()
  id = `__carbon-dropdown__${Math.random()
    .toString(36)
    .substr(2)}`;

  /**
   * The label text. Corresponds to the attribute with the same name.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * `true` if the dropdown should be the light variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  light = false;

  /**
   * `true` if the dropdown should be open. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The value of the selected item. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  value = '';

  /**
   * The content of the trigger button, used if there is no selected item. Corresponds to `trigger-content` attribute.
   */
  @property({ attribute: 'trigger-content' })
  triggerContent = '';

  connectedCallback() {
    super.connectedCallback();
    // Detect IE/Edge which have bubbling `window.onfocusout`
    const hasFocusOut = 'onfocusout' in this.ownerDocument!.defaultView!;
    const focusoutEventName = hasFocusOut ? 'focusout' : 'blur';
    // Use `focusout` if it's there, otherwise use "capture" mode which has similar-to-bubbling effect
    this._hFocusOut = on(this.ownerDocument!, focusoutEventName, this._handleFocusOut, !hasFocusOut);
  }

  disconnectedCallback() {
    if (this._hFocusOut) {
      this._hFocusOut = this._hFocusOut.release();
    }
    super.disconnectedCallback();
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'value') {
        const { itemTagName } = this.constructor as typeof BXDropdown;
        forEach(this.getElementsByTagName(itemTagName), elem => {
          elem.classList.toggle(
            (elem.constructor as typeof BXDropdownItem).classSelected,
            (elem as BXDropdownItem).value === this.value
          );
        });
        const item = find(this.getElementsByTagName(itemTagName), elem => (elem as BXDropdownItem).value === this.value);
        if (item) {
          const range = this.ownerDocument!.createRange();
          range.selectNodeContents(item);
          this._selectedContent = range.cloneContents();
        } else {
          this._selectedContent = null;
        }
      }
    }
    super.attributeChangedCallback(name, old, current);
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const innerClasses = classnames(`${prefix}--dropdown`, {
      [`${prefix}--dropdown--disabled`]: this.disabled,
      [`${prefix}--dropdown--light`]: this.light,
      [`${prefix}--dropdown--open`]: this.open,
    });
    const listClasses = classnames(`${prefix}--dropdown-list`, {
      // `carbon-custom-elements`-only class as an alternative approach
      // to `:host(bx-dropdown[open]) ::slotted(bx-dropdown-item)` that doesn't work with ShadyCSS
      // https://github.com/webcomponents/shadycss/issues/5#issuecomment-257351096
      [`${prefix}-ce--dropdown-list--open`]: this.open,
    });
    return html`
      <label for=${`${this.id}-inner`} class=${`${prefix}--label`}>${this.labelText}</label>
      <div class=${`${prefix}--form__helper-text`}>${this.helperText}</div>
      <ul
        id=${`${this.id}-inner`}
        class=${innerClasses}
        role="combobox"
        tabindex="0"
        @click=${this._handleClickInner}
        @keydown=${this._handleKeydownInner}
      >
        <li class=${`${prefix}--dropdown-text`}>${this._selectedContent || this.triggerContent}</li>
        <li class=${`${prefix}--dropdown__arrow-container`}>
          ${icon(ChevronDown16, {
            class: `${prefix}--dropdown__arrow`,
          })}
        </li>
        <li>
          <ul role="listbox" class=${listClasses} @click=${this._handleClickItem}>
            <slot></slot>
          </ul>
        </li>
      </ul>
    `;
  }

  /**
   * The tag name of the element working as a dropdown item, which is, `<bx-dropdown-item>`.
   */
  static get itemTagName() {
    return `${prefix}-dropdown-item`;
  }

  /**
   * The selector for the trigger element.
   */
  static get triggerSelector() {
    return `.${prefix}--dropdown`;
  }

  /**
   * A selector that will return non-selected items.
   */
  static get nonSelectedItemSelector() {
    return `${prefix}-dropdown-item:not([selected])`;
  }

  /**
   * The name of the custom event fired before a new selection (value) is set upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   */
  static get eventBeforeSelect() {
    return `${prefix}-dropdown-beingselected`;
  }

  /**
   * The name of the custom event fired after a new selection (value) is set.
   */
  static get eventAfterSelect() {
    return `${prefix}-dropdown-selected`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXDropdown;
