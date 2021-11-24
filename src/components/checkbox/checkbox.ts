/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, query, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import FormMixin from '../../globals/mixins/form';
import styles from './checkbox.scss';

const { prefix } = settings;

/**
 * Check box.
 * @element bx-checkbox
 * @fires bx-checkbox-changed - The custom event fired after this changebox changes its checked state.
 * @csspart input The checkbox.
 * @csspart label The label.
 */
@customElement(`${prefix}-checkbox`)
class BXCheckbox extends FocusMixin(FormMixin(LitElement)) {
  @query('input')
  protected _checkboxNode!: HTMLInputElement;

  /**
   * Handles `click` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    const { checked, indeterminate } = this._checkboxNode;
    this.checked = checked;
    this.indeterminate = indeterminate;
    const { eventChange } = this.constructor as typeof BXCheckbox;
    this.dispatchEvent(
      new CustomEvent(eventChange, {
        bubbles: true,
        composed: true,
        detail: {
          indeterminate,
        },
      })
    );
  }

  _handleFormdata(event: Event) {
    const { formData } = event as any; // TODO: Wait for `FormDataEvent` being available in `lib.dom.d.ts`
    const { checked, disabled, name, value = 'on' } = this;
    if (!disabled && checked) {
      formData.append(name, value);
    }
  }

  /**
   * `true` if the check box should be checked.
   */
  @property({ type: Boolean, reflect: true })
  checked = false;

  /**
   * `true` if the check box should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` if the label should be hidden.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-label' })
  hideLabel = false;

  /**
   * `true` if the check box should show its UI of the indeterminate state.
   */
  @property({ type: Boolean, reflect: true })
  indeterminate = false;

  /**
   * The label text.
   */
  @property({ attribute: 'label-text' })
  labelText = '';

  /**
   * The form name.
   */
  @property()
  name!: string;

  /**
   * The value.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  render() {
    const { checked, disabled, hideLabel, indeterminate, labelText, name, value, _handleChange: handleChange } = this;
    const labelClasses = classMap({
      [`${prefix}--checkbox-label`]: true,
      [`${prefix}--visually-hidden`]: hideLabel,
    });
    return html`
      <input
        id="checkbox"
        type="checkbox"
        part="input"
        class="${`${prefix}--checkbox`}"
        aria-checked="${indeterminate ? 'mixed' : String(Boolean(checked))}"
        .checked="${checked}"
        ?disabled="${disabled}"
        .indeterminate="${indeterminate}"
        name="${ifNonNull(name)}"
        value="${ifNonNull(value)}"
        @change="${handleChange}" />
      <label for="checkbox" part="label" class="${labelClasses}">
        <span class="${prefix}--checkbox-label-text"><slot>${labelText}</slot></span>
      </label>
    `;
  }

  /**
   * The name of the custom event fired after this changebox changes its checked state.
   */
  static get eventChange() {
    return `${prefix}-checkbox-changed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXCheckbox;
