/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import FocusMixin from '../../globals/mixins/focus';
import styles from './side-nav.scss';

const { prefix } = settings;

/**
 * Side nav menu item.
 * @element bx-side-nav-menu-item
 */
@customElement(`${prefix}-side-nav-menu-item`)
class BXSideNavMenuItem extends FocusMixin(LitElement) {
  /**
   * `true` if the menu item should be active.
   */
  @property({ type: Boolean, reflect: true })
  active = false;

  /**
   * Link `href`.
   */
  @property()
  href = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { active, href } = this;
    const classes = classMap({
      [`${prefix}--side-nav__link`]: true,
      [`${prefix}--side-nav__link--current`]: active,
    });
    return html`
      <a role="menuitem" class="${classes}" href="${href}">
        <span class="${prefix}--side-nav__link-text">
          <slot></slot>
        </span>
      </a>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXSideNavMenuItem;
