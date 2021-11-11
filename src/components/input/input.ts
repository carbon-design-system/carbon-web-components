/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, query, customElement, LitElement } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import FormMixin from '../../globals/mixins/form';
import ValidityMixin from '../../globals/mixins/validity';
import { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE } from './defs';
import styles from './input.scss';

export { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE };

const { prefix } = settings;

/**
 * Input element. Supports all the usual attributes for textual input types
 * @element bx-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-input`)
export default class BXInput extends ValidityMixin(FormMixin(LitElement)) {
  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * The internal value.
   */
  protected _value = '';

  /**
   * Handles `oninput` event on the `<input>`.
   * @param event The event.
   */
  protected _handleInput({ target }: Event) {
    this.value = (target as HTMLInputElement).value;
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { disabled, name, value } = this;
    if (!disabled) {
      formData.append(name, value);
    }
  }

  /**
   * May be any of the standard HTML autocomplete options
   */
  @property()
  autocomplete = '';

  /**
   * Sets the input to be focussed automatically on page load. Defaults to false
   */
  @property({ type: Boolean })
  autofocus = false;

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = INPUT_COLOR_SCHEME.REGULAR;

  /**
   * Controls the disabled state of the input
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The helper text.
   */
  @property({ attribute: 'helper-text' })
  helperText = '';

  /**
   * Controls the invalid state and visibility of the `validityMessage`
   */
  @property({ type: Boolean, reflect: true })
  invalid = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * Name for the input in the `FormData`
   */
  @property()
  name = '';

  /**
   * Pattern to validate the input against for HTML validity checking
   */
  @property()
  pattern = '';

  /**
   * Value to display when the input has an empty `value`
   */
  @property({ reflect: true })
  placeholder = '';

  /**
   * Controls the readonly state of the input
   */
  @property({ type: Boolean, reflect: true })
  readonly = false;

  /**
   * Boolean property to set the required status
   */
  @property({ type: Boolean, reflect: true })
  required = false;

  /**
   * The special validity message for `required`.
   */
  @property({ attribute: 'required-validity-message' })
  requiredValidityMessage = 'Please fill out this field.';

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.REGULAR;

  /**
   * The type of the input. Can be one of the types listed in the INPUT_TYPE enum
   */
  @property({ reflect: true })
  type = INPUT_TYPE.TEXT;

  /**
   * The validity message. If present and non-empty, this input shows the UI of its invalid state.
   */
  @property({ attribute: 'validity-message' })
  validityMessage = '';

  /**
   * The value of the input.
   */
  @property({ reflect: true })
  get value() {
    // FIXME: Figure out how to deal with TS2611
    // once we have the input we can directly query for the value
    if (this._input) {
      return this._input.value;
    }
    // but before then _value will work fine
    return this._value;
  }

  set value(value) {
    const oldValue = this._value;
    this._value = value;
    // make sure that lit-element updates the right properties
    this.requestUpdate('value', oldValue);
    // we set the value directly on the input (when available)
    // so that programatic manipulation updates the UI correctly
    if (this._input) {
      this._input.value = value;
    }
  }

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  render() {
    const { _handleInput: handleInput } = this;

    const invalidIcon = WarningFilled16({ class: `${prefix}--text-input__invalid-icon` });

    const inputClasses = classMap({
      [`${prefix}--text-input`]: true,
      [`${prefix}--text-input--${this.colorScheme}`]: this.colorScheme,
      [`${prefix}--text-input--invalid`]: this.invalid,
      [`${prefix}--text-input--${this.size}`]: this.size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    return html`
      <label class="${labelClasses}" for="input">
        <slot name="label-text"> ${this.labelText} </slot>
      </label>
      <div class="${prefix}--text-input__field-wrapper" ?data-invalid="${this.invalid}">
        ${this.invalid ? invalidIcon : null}
        <input
          ?autocomplete="${this.autocomplete}"
          ?autofocus="${this.autofocus}"
          class="${inputClasses}"
          ?data-invalid="${this.invalid}"
          ?disabled="${this.disabled}"
          id="input"
          name="${ifNonEmpty(this.name)}"
          pattern="${ifNonEmpty(this.pattern)}"
          placeholder="${ifNonEmpty(this.placeholder)}"
          ?readonly="${this.readonly}"
          ?required="${this.required}"
          type="${ifNonEmpty(this.type)}"
          .value="${this._value}"
          @input="${handleInput}" />
      </div>
      <div class="${helperTextClasses}">
        <slot name="helper-text"> ${this.helperText} </slot>
      </div>
      <div class="${prefix}--form-requirement">
        <slot name="validity-message"> ${this.validityMessage} </slot>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
