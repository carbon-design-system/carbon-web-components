/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './slider.scss';

const { prefix } = settings;

/**
 * The `<input>` box for slider.
 */
@customElement(`${prefix}-slider-input`)
class BXSliderInput extends FocusMixin(LitElement) {
  /**
   * Handles `change` event to fire a normalized custom event.
   */
  private _handleChange({ target }: Event) {
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXSliderInput).eventAfterChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: (target as HTMLInputElement).value,
        },
      })
    );
  }

  /**
   * Handles `input` event to fire a normalized custom event.
   */
  private _handleInput({ target }: Event) {
    this.dispatchEvent(
      new CustomEvent((this.constructor as typeof BXSliderInput).eventAfterChange, {
        bubbles: true,
        composed: true,
        detail: {
          value: (target as HTMLInputElement).value,
          intermediate: true,
        },
      })
    );
  }

  /**
   * `true` if the check box should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if this slider input should use the light UI variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  light = false;

  /**
   * The type of the `<input>`. Corresponds to the attribute with the same name.
   */
  @property()
  type!: string;

  /**
   * The value. Corresponds to the attribute with the same name.
   */
  @property({ type: Number })
  value!: number;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { disabled, light, type, value, _handleChange: handleChange, _handleInput: handleInput } = this;
    // NOTE: Our React variant has an option to add `invalid` option here,
    // but there doesn't seem a corresponding style to the thumb.
    // Because of that, in addition to the mininum/maximum constraint enforced,
    // the code here start without `invalid` styling option for now.
    const classes = classnames(`${prefix}--text-input`, `${prefix}--slider-text-input`, {
      [`${prefix}--text-input--light`]: light,
    });
    return html`
      <input
        ?disabled="${disabled}"
        type="${ifNonNull(type)}"
        class="${classes}"
        .value="${value}"
        @change="${handleChange}"
        @input="${handleInput}"
      />
    `;
  }

  /**
   * A selector that will return the parent slider.
   */
  static get selectorParent() {
    return `${prefix}-slider`;
  }

  /**
   * The name of the custom event fired after the value is changed by user gesture.
   */
  static get eventAfterChange() {
    return `${prefix}-slider-input-changed`;
  }

  static styles = styles;
}

export default BXSliderInput;
