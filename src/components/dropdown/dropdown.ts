import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, property, LitElement, customElement } from 'lit-element';
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
class BXDropdown extends LitElement {
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
      this.open = !this.open;
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

  render() {
    const innerClasses = classnames(`${prefix}--dropdown`, {
      [`${prefix}--dropdown--disabled`]: this.disabled,
      [`${prefix}--dropdown--light`]: this.light,
      [`${prefix}--dropdown--open`]: this.open,
    });
    return html`
      <label for=${`${this.id}-inner`} class=${`${prefix}--label`}>${this.labelText}</label>
      <div class=${`${prefix}--form__helper-text`}>${this.helperText}</div>
      <ul id=${`${this.id}-inner`} class=${innerClasses} role="combobox" tabindex="0" @click=${this._handleClickInner}>
        <li class=${`${prefix}--dropdown-text`}>${this._selectedContent || this.triggerContent}</li>
        <li class=${`${prefix}--dropdown__arrow-container`}>
          <svg
            class=${`${prefix}--dropdown__arrow`}
            focusable="false"
            preserveAspectRatio="xMidYMid meet"
            style="will-change: transform;"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M8 11L3 6l.7-.7L8 9.6l4.3-4.3.7.7z"></path>
          </svg>
        </li>
        <li>
          <ul role="listbox" class=${`${prefix}--dropdown-list`} @click=${this._handleClickItem}>
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
