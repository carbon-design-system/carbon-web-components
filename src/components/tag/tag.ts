/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import TAG_TYPE from './types';
import styles from './tag.scss';

export { TAG_TYPE };

const { prefix } = settings;

/**
 * Tag.
 * @element bx-tag
 */
@customElement(`${prefix}-tag`)
export default class BXTag extends LitElement {
  /**
   * `true` if the tag should be disabled
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Specify the type of the <Tag>
   */
  @property({ reflect: true })
  type = TAG_TYPE.RED;

  render() {
    return html`
      <slot></slot>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}
