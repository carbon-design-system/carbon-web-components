/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, svg, property, query, customElement, LitElement } from 'lit-element';
import CheckmarkFilled16 from '@carbon/icons/lib/checkmark--filled/16';
import FocusMixin from '../../globals/mixins/focus';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Multi-selectable tile.
 */
@customElement(`${prefix}-selectable-tile`)
class BXSelectableTile extends FocusMixin(LitElement) {
  @query('input')
  protected _inputNode!: HTMLInputElement;

  /**
   * The `type` attribute of the `<input>`.
   */
  protected _inputType = 'checkbox';

  /**
   * Unique ID used for form elements.
   */
  protected _uniqueId = Math.random()
    .toString(36)
    .slice(2);

  /**
   * The element ID for the check box.
   */
  protected get _inputId() {
    const { id: elementId, _uniqueId: uniqueId } = this;
    return `__bx-ce-selectable-tile_${elementId || uniqueId}`;
  }

  /**
   * Handles `change` event on the `<input>` in the shadow DOM.
   */
  protected _handleChange() {
    this.selected = this._inputNode.checked;
  }

  /**
   * The a11y text for the checkmark icon of the selected state. Corresponds to `checkmark-label` attribute.
   */
  @property({ attribute: 'checkmark-label' })
  checkmarkLabel!: string;

  /**
   * The form name. Corresponds to the attribute with the same name.
   */
  @property()
  name!: string;

  /**
   * `true` to show the selected state. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The form value. Corresponds to the attribute with the same name.
   */
  @property()
  value!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { checkmarkLabel, name, selected, value, _inputId: inputId, _inputType: inputType, _handleChange: handleChange } = this;
    return html`
      <input
        type="${inputType}"
        id="${inputId}"
        class="${prefix}--tile-input"
        tabindex="-1"
        name="${ifDefined(name == null ? undefined : name)}"
        value="${ifDefined(value == null ? undefined : value)}"
        .checked=${selected}
        @change=${handleChange}
      />
      <label for="${inputId}" class="${prefix}--tile ${prefix}--tile--selectable" tabindex="0">
        <div class="${prefix}--tile__checkmark">
          ${CheckmarkFilled16({
            children: !checkmarkLabel ? undefined : svg`<title>${checkmarkLabel}</title>`,
          })}
        </div>
        <div class="${prefix}--tile-content"><slot></slot></div>
      </label>
    `;
  }

  static styles = styles;
}

export default BXSelectableTile;
