/**
 * @license
 *
 * Copyright IBM Corp. 2019
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
import styles from './number-input.scss';
import BXInput from '../input/input';

const { prefix } = settings;

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

  protected _min = '';

  protected _max = '';

  protected _step = '1';

  /**
   * The minimum value allowed in the input
   */
  @property({ reflect: true })
  set min(value) {
    this._min = value;
  }

  get min() {
    return this._min.toString();
  }

  /**
   * The maximum value allowed in the input
   */
  @property({ reflect: true })
  set max(value) {
    this._max = value;
  }

  get max() {
    return this._max.toString();
  }

  /**
   * The amount the value should increase or decrease by
   */
  @property({ reflect: true })
  set step(value) {
    this._step = value;
  }

  get step() {
    return this._step.toString();
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
   * Set to `true` to enable the light variant for the input
   */
  @property({ type: Boolean, reflect: true })
  light = false;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { _handleInput: handleInput } = this;

    const invalidIcon = WarningFilled16({ class: `${prefix}--number__invalid` });

    const wrapperClasses = classMap(`${prefix}--number`, {
      [`${prefix}--number--light`]: this.light,
      [`${prefix}--number--mobile`]: this.mobile,
    });

    const labelClasses = classMap(`${prefix}--label`, {
      [`${prefix}--label--disabled`]: this.disabled,
    });

    const helperTextClasses = classMap(`${prefix}--form__helper-text`, {
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
        name="${this.name}"
        pattern="${this.pattern}"
        placeholder="${this.placeholder}"
        ?readonly="${this.readonly}"
        ?required="${this.required}"
        type="number"
        .value="${this.value}"
        @input="${handleInput}"
        min="${this.min}"
        max="${this.max}"
        step="${this.step}"
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
        <div class="${prefix}--form-requirement">
          <slot name="validity-message">
            ${this.validityMessage}
          </slot>
        </div>
      </div>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
