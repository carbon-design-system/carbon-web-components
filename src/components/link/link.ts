/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './link.scss';

const { prefix } = settings;

/**
 * Link.
 * @element bx-link
 */
@customElement(`${prefix}-link`)
class BXLink extends FocusMixin(LitElement) {
  /**
   * The CSS class list for the link node.
   */
  protected get _classes() {
    const { disabled } = this;
    return classMap({
      [`${prefix}--link`]: true,
      [`${prefix}--link--disabled`]: disabled,
    });
  }

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name.
   */
  @property()
  download!: string;

  /**
   * Link `href`.
   */
  @property()
  href!: string;

  /**
   * The language of what `href` points to.
   */
  @property()
  hreflang!: string;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole!: string;

  /**
   * URLs to ping.
   */
  @property()
  ping!: string;

  /**
   * The link type.
   */
  @property()
  rel!: string;

  /**
   * The link target.
   */
  @property()
  target!: string;

  /**
   * MIME type of the `target`.
   */
  @property()
  type!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { disabled, download, href, hreflang, linkRole, ping, rel, target, type, _classes: classes } = this;
    return disabled
      ? html`
          <p id="link" class="${classes}"><slot></slot></p>
        `
      : html`
          <a
            id="link"
            role="${ifNonNull(linkRole)}"
            class="${classes}"
            download="${ifNonNull(download)}"
            href="${ifNonNull(href)}"
            hreflang="${ifNonNull(hreflang)}"
            ping="${ifNonNull(ping)}"
            rel="${ifNonNull(rel)}"
            target="${ifNonNull(target)}"
            type="${ifNonNull(type)}"
          >
            <slot></slot>
          </a>
        `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXLink;
