/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Clickable tile.
 */
@customElement(`${prefix}-clickable-tile`)
class BXClickableTile extends LitElement {
  /**
   * Link `href`. Corresponds to the attribute with the same name.
   */
  @property()
  href = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { href } = this;
    const classes = classnames(`${prefix}--link`, `${prefix}--tile`, `${prefix}--tile--clickable`);
    return html`
      <a class="${classes}" href="${href}">
        <slot></slot>
      </a>
    `;
  }

  static styles = styles;
}

export default BXClickableTile;
