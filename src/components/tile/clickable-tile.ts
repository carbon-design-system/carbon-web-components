/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import FocusMixin from '../../globals/mixins/focus';
import styles from './tile.scss';

const { prefix } = settings;

/**
 * Clickable tile.
 */
@customElement(`${prefix}-clickable-tile`)
class BXClickableTile extends FocusMixin(LitElement) {
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
    const classes = classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--tile`]: true,
      [`${prefix}--tile--clickable`]: true,
    });
    return html`
      <a class="${classes}" href="${href}">
        <slot></slot>
      </a>
    `;
  }

  static styles = styles;
}

export default BXClickableTile;
