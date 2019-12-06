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
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './button.scss';

const { prefix } = settings;

/**
 * Button kinds.
 */
export enum BUTTON_KIND {
  /**
   * Primary button.
   */
  PRIMARY = 'primary',

  /**
   * Secondary button.
   */
  SECONDARY = 'secondary',

  /**
   * Danger button.
   */
  DANGER = 'danger',

  /**
   * Ghost button.
   */
  GHOST = 'ghost',
}

/**
 * Button.
 */
@customElement(`${prefix}-btn`)
class BXButton extends FocusMixin(LitElement) {
  private _hasIcon = false;

  private _hasMainContent = false;

  /**
   * Handles `click` event on the `<a>.
   * @param event The event.
   */
  private _handleClickLink(event: MouseEvent) {
    if (this.disabled) {
      event.preventDefault(); // Stop following the link
      event.stopPropagation(); // Stop firing `onClick`
    }
  }

  private _handleSlotChange({ target }: Event) {
    const { name } = target as HTMLSlotElement;
    const hasContent = (target as HTMLSlotElement)
      .assignedNodes()
      .some(node => node.nodeType !== Node.TEXT_NODE || node!.textContent!.trim());
    this[name === 'icon' ? '_hasIcon' : '_hasMainContent'] = hasContent;
    this.requestUpdate();
  }

  /**
   * `true` if the button should have input focus when the page loads. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  autofocus = false;

  /**
   * `true` if the button should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * The default file name, used if this button is rendered as `<a>`. Corresponds to the attribute with the same name.
   */
  @property()
  download!: string;

  /**
   * Link `href`. Corresponds to the attribute with the same name. If present, this button is rendered as `<a>`.
   * Corresponds to the attribute with the same name.
   */
  @property()
  href!: string;

  /**
   * The language of what `href` points to, if this button is rendered as `<a>`. Corresponds to the attribute with the same name.
   * @type {[type]}
   */
  @property()
  hreflang!: string;

  /**
   * Button kind. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  kind = BUTTON_KIND.PRIMARY;

  /**
   * URLs to ping, if this button is rendered as `<a>`. Corresponds to the attribute with the same name.
   */
  @property()
  ping!: string;

  /**
   * The link type, if this button is rendered as `<a>`. Corresponds to the attribute with the same name.
   */
  @property()
  rel!: string;

  /**
   * `true` if the button should be a small variant. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  small = false;

  /**
   * The link target, if this button is rendered as `<a>`. Corresponds to the attribute with the same name.
   */
  @property()
  target!: string;

  /**
   * The default behavior if the button is rendered as `<button>`. MIME type of the `target`if this button is rendered as `<a>`.
   * Corresponds to the attribute with the same name.
   */
  @property()
  type!: string;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const {
      autofocus,
      disabled,
      download,
      href,
      hreflang,
      kind,
      ping,
      rel,
      small,
      target,
      type,
      _hasIcon: hasIcon,
      _hasMainContent: hasMainContent,
      _handleSlotChange: handleSlotChange,
    } = this;
    const classes = classnames(`${prefix}--btn`, {
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--icon-only`]: hasIcon && !hasMainContent,
      [`${prefix}--btn--sm`]: small,
      [`${prefix}-ce--btn--has-icon`]: hasIcon,
    });
    return href
      ? html`
          <a
            id="button"
            role="button"
            class="${classes}"
            download="${ifNonNull(download)}"
            href="${ifNonNull(href)}"
            hreflang="${ifNonNull(hreflang)}"
            ping="${ifNonNull(ping)}"
            rel="${ifNonNull(rel)}"
            target="${ifNonNull(target)}"
            type="${ifNonNull(type)}"
            @click="${this._handleClickLink}"
          >
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </a>
        `
      : html`
          <button id="button" class="${classes}" ?autofocus="${autofocus}" ?disabled="${disabled}" type="${ifNonNull(type)}">
            <slot @slotchange="${handleSlotChange}"></slot>
            <slot name="icon" @slotchange="${handleSlotChange}"></slot>
          </button>
        `;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXButton;
