/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './modal.scss';

const { prefix } = settings;

/**
 * Modal label.
 * @element bx-modal-label
 */
@customElement(`${prefix}-modal-label`)
class BXModalLabel extends LitElement {
  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXModalLabel;
