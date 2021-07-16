/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, LitElement } from 'lit-element';
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import { BUTTON_KIND, BUTTON_SIZE, BUTTON_ICON_LAYOUT } from './defs';
import styles from './button.scss';

export { BUTTON_KIND, BUTTON_SIZE, BUTTON_ICON_LAYOUT };

const { prefix } = settings;

/**
 * Button.
 * @element bx-btn
 * @csspart button The button.
 */
class BXButton extends FocusMixin(LitElement) {
  /**
   * `true` if there is an icon.
   */
  private _hasIcon = false;

  /**
   * `true` if there is a non-icon content.
   */
  private _hasMainContent = false;

  /**
   * Handles `slotchange` event.
   */
  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  /**
   * `true` if the button should have input focus when the page loads.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * `true` if the button should be disabled.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name, used if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  download!: string;

  /**
   * Link `href`. If present, this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  href!: string;

  /**
   * The language of what `href` points to, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  hreflang!: string;

  /**
   * Button icon layout.
   */
  @property({ reflect: true, attribute: 'icon-layout' })
  iconLayout = BUTTON_ICON_LAYOUT.REGULAR;

  /**
   * Button kind.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  /**
   * The a11y role for `<a>`.
   */
  @property({ attribute: 'link-role' })
  linkRole = 'button';

  /**
   * URLs to ping, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  ping!: string;

  /**
   * The link type, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  rel!: string;

  /**
   * Button size.
   */
  @property({ reflect: true })
  size = BUTTON_SIZE.REGULAR;

  /**
   * The link target, if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  target!: string;

  /**
   * The default behavior if the button is rendered as `<button>`. MIME type of the `target`if this button is rendered as `<a>`.
   */
  @property({ reflect: true })
  type!: string;

  createRenderRoot() {
    return this.attachShadow({
      mode: 'open',
      delegatesFocus: Number((/Safari\/(\d+)/.exec(navigator.userAgent) ?? ['', 0])[1]) <= 537,
    });
  }

  render() {
    const {
      autofocus,
      disabled,
      download,
      href,
      hreflang,
      linkRole,
      kind,
      ping,
      rel,
      size,
      target,
      type,
      _hasIcon: hasIcon,
      _hasMainContent: hasMainContent,
      _handleSlotChange: handleSlotChange,
    } = this;
    const classes = classMap({
      [`${prefix}--btn`]: true,
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--${size}`]: size,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
    });
    if (href) {
      return disabled
        ? html`
            <p id="button" part="button" class="${classes}">
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </p>
          `
        : html`
            <a
              id="button"
              part="button"
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
              <slot @slotchange="${handleSlotChange}"></slot>
              <slot name="icon" @slotchange="${handleSlotChange}"></slot>
            </a>
          `;
    }
    return html`
      <button
        id="button"
        part="button"
        class="${classes}"
        ?autofocus="${autofocus}"
        ?disabled="${disabled}"
        type="${ifNonNull(type)}"
      >
        <slot @slotchange="${handleSlotChange}"></slot>
        <slot name="icon" @slotchange="${handleSlotChange}"></slot>
      </button>
    `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

if (!customElements.get(`${prefix}-btn`)) {
  customElements.define(`${prefix}-btn`, BXButton);
}

export default BXButton;
