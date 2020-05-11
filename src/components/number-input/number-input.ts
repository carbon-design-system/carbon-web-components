/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { customElement, html, property, query } from 'lit-element';
import { classMap } from 'lit-html/directives/class-map';
import settings from 'carbon-components/es/globals/js/settings';
import WarningFilled16 from '@carbon/icons/lib/warning--filled/16';
import CaretUp16 from '@carbon/icons/lib/caret--up/16';
import CaretDown16 from '@carbon/icons/lib/caret--down/16';
import { FORM_ELEMENT_COLOR_SCHEME } from '../../globals/shared-enums';
import ifNonEmpty from '../../globals/directives/if-non-empty';
import styles from './number-input.scss';
import BXInput, { INPUT_SIZE } from '../input/input';

export { FORM_ELEMENT_COLOR_SCHEME as NUMBER_INPUT_COLOR_SCHEME } from '../../globals/shared-enums';

const { prefix } = settings;

/**
 * Works in conjunction with VALIDATION_STATUS
 */
export enum NUMBER_INPUT_VALIDATION_STATUS {
  EXCEEDED_MAXIMUM = 'exceeded_maximum',
  EXCEEDED_MINIMUM = 'exceeded_minimum',
}

/**
 * Number input.
 * @element bx-number-input
 * @slot helper-text - The helper text.
 * @slot label-text - The label text.
 * @slot validity-message - The validity message. If present and non-empty, this input shows the UI of its invalid state.
 */
@customElement(`${prefix}-number-input`)
export default class BXNumberInput extends BXInput {
  /**
   * The underlying input element
   */
  @query('input')
  protected _input!: HTMLInputElement;

  /**
   * Handles incrementing the value in the input
   */
  protected _handleIncrement() {
    this._input.stepUp();
  }

  /**
   * Handles decrementing the value in the input
   */
  protected _handleDecrement() {
    this._input.stepDown();
  }

  _testValidity() {
    if (this._input?.valueAsNumber > Number(this.max)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM;
    }
    if (this._input?.valueAsNumber < Number(this.min)) {
      return NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;
    }
    return super._testValidity();
  }

  _getValidityMessage(state: string) {
    if (Object.values(NUMBER_INPUT_VALIDATION_STATUS).includes(state as NUMBER_INPUT_VALIDATION_STATUS)) {
      const stateMessageMap = {
        [NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM]: this.validityMessageMax,
        [NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM]: this.validityMessageMin,
      };
      return stateMessageMap[state];
    }
    return super._getValidityMessage(state);
  }

  protected _min = '';

  protected _max = '';

  protected _step = '1';

  /**
   * The color scheme.
   */
  @property({ attribute: 'color-scheme', reflect: true })
  colorScheme = FORM_ELEMENT_COLOR_SCHEME.REGULAR;

  /**
   * The minimum value allowed in the input
   */
  @property({ reflect: true })
  get min() {
    return this._min.toString();
  }

  set min(value) {
    const oldValue = this.min;
    this._min = value;
    this.requestUpdate('min', oldValue);
  }

  /**
   * The maximum value allowed in the input
   */
  @property({ reflect: true })
  get max() {
    return this._max.toString();
  }

  set max(value) {
    const oldValue = this.max;
    this._max = value;
    this.requestUpdate('max', oldValue);
  }

  /**
   * The amount the value should increase or decrease by
   */
  @property({ reflect: true })
  get step() {
    return this._step.toString();
  }

  set step(value) {
    const oldValue = this.step;
    this._step = value;
    this.requestUpdate('step', oldValue);
  }

  /**
   * Set to `true` to enable the mobile variant of the number input
   */
  @property({ type: Boolean, reflect: true })
  mobile = false;

  /**
   * Aria text for the button that increments the value
   */
  @property({ attribute: 'increment-button-assistive-text' })
  incrementButtonAssistiveText = 'increase number input';

  /**
   * Aria text for the button that decrements the value
   */
  @property({ attribute: 'decrement-button-assistive-text' })
  decrementButtonAssistiveText = 'decrease number input';

  /**
   * The input box size.
   */
  @property({ reflect: true })
  size = INPUT_SIZE.REGULAR;

  /**
   * The validity message shown when the value is greater than the maximum
   *
   * Also available via the `validity-message-max` slot
   */
  @property({ attribute: 'validity-message-max' })
  validityMessageMax = '';

  /**
   * The validity message shown when the value is less than the minimum
   *
   * Also available via the `validity-message-min` slot
   */
  @property({ attribute: 'validity-message-min' })
  validityMessageMin = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { _handleInput: handleInput } = this;

    const invalidIcon = WarningFilled16({ class: `${prefix}--number__invalid` });

    const validity = this._testValidity();

    const isGenericallyInvalid = () =>
      this.invalid &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM &&
      validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM;

    const wrapperClasses = classMap({
      [`${prefix}--number`]: true,
      [`${prefix}--number--${this.colorScheme}`]: this.colorScheme,
      [`${prefix}--number--mobile`]: this.mobile,
      [`${prefix}--number--${this.size}`]: this.size,
    });

    const labelClasses = classMap({
      [`${prefix}--label`]: true,
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classMap({
      [`${prefix}--form__helper-text`]: true,
      [`${prefix}--form__helper-text--disabled`]: this.disabled,
    });

    const incrementButton = html`
      <button
        class="${prefix}--number__control-btn up-icon"
        aria-label="${this.incrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleIncrement}
      >
        ${CaretUp16()}
      </button>
    `;
    const decrementButton = html`
      <button
        class="${prefix}--number__control-btn down-icon"
        aria-label="${this.decrementButtonAssistiveText}"
        aria-live="polite"
        aria-atomic="true"
        type="button"
        ?disabled=${this.disabled}
        @click=${this._handleDecrement}
      >
        ${CaretDown16()}
      </button>
    `;

    const input = html`
      <input
        ?autocomplete="${this.autocomplete}"
        ?autofocus="${this.autofocus}"
        ?data-invalid="${this.invalid}"
        ?disabled="${this.disabled}"
        id="input"
        name="${ifNonEmpty(this.name)}"
        pattern="${ifNonEmpty(this.pattern)}"
        placeholder="${ifNonEmpty(this.placeholder)}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${this.value}"
        @input="${handleInput}"
        min="${ifNonEmpty(this.min)}"
        max="${ifNonEmpty(this.max)}"
        step="${ifNonEmpty(this.step)}"
        role="alert"
        aria-atomic="true"
      />
    `;

    const defaultLayout = html`
      ${this.invalid ? invalidIcon : null} ${input}
      <div class="${prefix}--number__controls">
        ${incrementButton} ${decrementButton}
      </div>
    `;

    const mobileLayout = html`
      ${decrementButton} ${input} ${incrementButton}
    `;

    return html`
      <div class="${wrapperClasses}" ?data-invalid=${this.invalid}>
        <label class="${labelClasses}" for="input">
          <slot name="label-text">
            ${this.labelText}
          </slot>
        </label>
        <div class="${helperTextClasses}">
          <slot name="helper-text">
            ${this.helperText}
          </slot>
        </div>
        <div class="${prefix}--number__input-wrapper">
          ${this.mobile ? mobileLayout : defaultLayout}
        </div>
        <div class="${prefix}--form-requirement" ?hidden="${!isGenericallyInvalid()}">
          <slot name="validity-message">
            ${this.validityMessage}
          </slot>
        </div>
        <div class="${prefix}--form-requirement" ?hidden="${validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MAXIMUM}">
          <slot name="validity-message-max">
            ${this.validityMessageMax}
          </slot>
        </div>
        <div class="${prefix}--form-requirement" ?hidden="${validity !== NUMBER_INPUT_VALIDATION_STATUS.EXCEEDED_MINIMUM}">
          <slot name="validity-message-min">
            ${this.validityMessageMin}
          </slot>
        </div>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
