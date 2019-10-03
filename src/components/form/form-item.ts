/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { customElement, LitElement, html } from 'lit-element';
import styles from './form-item.scss';

const { prefix } = settings;

/**
 * Presentational element for form items
 */
@customElement(`${prefix}-form-item`)
export default class BXFormItem extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
