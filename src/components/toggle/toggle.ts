/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import BXCheckbox from '../checkbox/checkbox';
import styles from './toggle.scss';

const { prefix } = settings;

/**
 * Basic toggle.
 */
@customElement(`${prefix}-toggle`)
class BXToggle extends BXCheckbox {
  protected _renderCheckmark() {
    if (!this.small) {
      return undefined;
    }
    return html`
      <svg class="${prefix}--toggle__check" width="6px" height="5px" viewBox="0 0 6 5">
        <path d="M2.2 2.7L5 0 6 1 2.2 5 0 2.7 1 1.5z" />
      </svg>
    `;
  }

  /**
   * The text for the checked state. Corresponds to `checked-text` attribute.
   */
  @property({ attribute: 'checked-text' })
  checkedText = '';

  /**
   * `true` to use the small variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  small = false;

  /**
   * The text for the unchecked state. Corresponds to `unchecked-text` attribute.
   */
  @property({ attribute: 'unchecked-text' })
  uncheckedText = '';

  render() {
    const { checked, checkedText, disabled, labelText, name, small, uncheckedText, value, _handleChange: handleChange } = this;
    const inputClasses = classMap({
      [`${prefix}--toggle-input`]: true,
      [`${prefix}--toggle-input--small`]: small,
    });
    return html`
      <input
        id="checkbox"
        type="checkbox"
        class="${inputClasses}"
        aria-checked="${String(Boolean(checked))}"
        .checked="${checked}"
        ?disabled="${disabled}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @change="${handleChange}"
      />
      <label for="checkbox" class="${prefix}--toggle-input__label">
        <slot name="label-text">${labelText}</slot>
        <span class="${prefix}--toggle__switch">
          ${this._renderCheckmark()}
          <span class="${prefix}--toggle__text--off" aria-hidden="true">
            <slot name="unchecked-text">${uncheckedText}</slot>
          </span>
          <span class="${prefix}--toggle__text--on" aria-hidden="true">
            <slot name="checked-text">${checkedText}</slot>
          </span>
        </span>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this changebox changes its checked state.
   */
  static get eventAfterChange() {
    return `${prefix}-toggle-changed`;
  }

  static styles = styles;
}

export default BXToggle;
