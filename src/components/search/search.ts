/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, property, query, customElement, LitElement } from 'lit-element';
import Close16 from '@carbon/icons/lib/close/16';
import Close20 from '@carbon/icons/lib/close/20';
import Search16 from '@carbon/icons/lib/search/16';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './search.scss';

const { prefix } = settings;

/**
 * Search box size.
 */
export enum SEARCH_SIZE {
  /**
   * Small size.
   */
  SMALL = 'small',

  /**
   * Regular size.
   */
  REGULAR = 'regular',
}

/**
 * Search box.
 */
@customElement(`${prefix}-search`)
class BXSearch extends FocusMixin(LitElement) {
  @query('input')
  private _inputNode!: HTMLInputElement;

  /**
   * Handles `input` event on the `<input>` in the shadow DOM.
   */
  private _handleInput(event: Event) {
    const { target } = event;
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXSearch).eventAfterInput, {
        bubbles: true,
        composed: true,
        cancelable: false,
        detail: {
          value: (target as HTMLInputElement).value,
        },
      })
    );
    this.requestUpdate();
  }

  /**
   * Handles `click` event on the button to clear search box content.
   */
  private _handleClearInputButtonClick() {
    const { _inputNode: inputNode } = this;
    if (inputNode.value) {
      this.dispatchEvent(
        new CustomEvent((this.constructor as typeof BXSearch).eventAfterInput, {
          bubbles: true,
          composed: true,
          cancelable: false,
          detail: {
            value: '',
          },
        })
      );
      inputNode.value = '';
      this.requestUpdate();
    }
  }

  /**
   * The assistive text for the close button. Corresponds to `close-button-assistive-text` attribute.
   */
  @property({ attribute: 'close-button-assistive-text' })
  closeButtonAssistiveText = '';

  /**
   * `true` if the search box should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The label text. Corresponds to `label-text` attribute.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name. Corresponds to the attribute with the same name.
   */
  @property()
  name!: string;

  /**
   * The placeholder text. Corresponds to the attribute with the same name.
   */
  @property()
  placeholder!: string;

  /**
   * The search box size. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  size = SEARCH_SIZE.REGULAR;

  /**
   * The `<input>` name. Corresponds to the attribute with the same name.
   */
  @property()
  type!: string;

  /**
   * The value. Corresponds to the attribute with the same name.
   */
  @property({ type: String })
  value!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const {
      closeButtonAssistiveText,
      disabled,
      labelText,
      name,
      placeholder,
      size,
      type,
      value = '',
      _inputNode: inputNode,
      _handleInput: handleInput,
      _handleClearInputButtonClick: handleClearInputButtonClick,
    } = this;
    const clearClasses = classnames(`${prefix}--search-close`, {
      [`${prefix}--search-close--hidden`]: !inputNode || !inputNode.value,
    });
    return html`
      ${Search16({
        class: `${prefix}--search-magnifier`,
        role: 'img',
      })}
      <label for="input" class="${prefix}--label">
        ${labelText}
      </label>
      <input
        id="input"
        type="${ifDefined(type == null ? undefined : type)}"
        class="${prefix}--search-input"
        ?disabled="${disabled}"
        name="${ifDefined(name == null ? undefined : name)}"
        placeholder="${ifDefined(placeholder == null ? undefined : placeholder)}"
        .value="${value}"
        @input="${handleInput}"
      />
      <button
        class="${clearClasses}"
        @click="${handleClearInputButtonClick}"
        type="button"
        aria-label="${closeButtonAssistiveText}"
      >
        ${(size === SEARCH_SIZE.SMALL ? Close16 : Close20)({
          'aria-label': closeButtonAssistiveText,
          role: 'img',
        })}
      </button>
    `;
  }

  static get observedAttributes() {
    const attributes = super.observedAttributes;
    return ['id', ...attributes];
  }

  /**
   * The name of the custom event fired after the search content is changed upon a user gesture.
   */
  static get eventAfterInput() {
    return `${prefix}-search-input`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSearch;
