import settings from 'carbon-components/es/globals/js/settings';
import { ifDefined } from 'lit-html/directives/if-defined';
import { html, svg, property, customElement, LitElement } from 'lit-element';
import Close20 from '@carbon/icons/lib/close/20';
import CheckmarkFilled20 from '@carbon/icons/lib/checkmark--filled/20';
import WarningFilled20 from '@carbon/icons/lib/warning--filled/20';
import ErrorFilled20 from '@carbon/icons/lib/error--filled/20';
import styles from './inline-notification.scss';

const { prefix } = settings;

/**
 * Notification kinds.
 */
export enum NOTIFICATION_KIND {
  /**
   * Notification to represent success state.
   */
  SUCCESS = 'success',

  /**
   * Informational notification.
   */
  INFO = 'info',

  /**
   * Warning notification.
   */
  WARNING = 'warning',

  /**
   * Error notification.
   */
  ERROR = 'error',
}

/**
 * Notification types.
 */
export enum NOTIFICATION_TYPE {
  /**
   * Inline notification, which show up in task flows, to notify users of the status of an action.
   * They usually appear at the top of the primary content area.
   */
  INLINE = 'inline',

  /**
   * Toast notification, which is a non-modal, time-based window elements used to display short messages.
   * They usually appear at the bottom of the screen and disappear after a few seconds.
   */
  TOAST = 'toast',
}

/**
 * The default icons, keyed by notification kind.
 */
const iconsForKinds = {
  [NOTIFICATION_KIND.SUCCESS]: CheckmarkFilled20,
  [NOTIFICATION_KIND.INFO]: undefined,
  [NOTIFICATION_KIND.WARNING]: WarningFilled20,
  [NOTIFICATION_KIND.ERROR]: ErrorFilled20,
};

/**
 * Inline notification.
 */
@customElement(`${prefix}-inline-notification`)
class BXInlineNotification extends LitElement {
  /**
   * Notification type.
   */
  protected _type = NOTIFICATION_TYPE.INLINE;

  /**
   * Handles `click` event on the close button.
   * @param event The event.
   */
  protected _handleClickCloseButton({ target }: MouseEvent) {
    this._handleUserInitiatedClose(target);
  }

  /**
   * Handles user-initiated close request of this modal.
   * @param triggeredBy The element that triggered this close request.
   */
  protected _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXInlineNotification).eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent((this.constructor as typeof BXInlineNotification).eventAfterClose, init));
      }
    }
  }

  /**
   * @returns The template part for the close button.
   */
  protected _renderButton() {
    const { closeButtonLabel, _type: type, _handleClickCloseButton: handleClickCloseButton } = this;
    return html`
      <button
        type="button"
        class="${prefix}--${type}-notification__close-button"
        aria-label=${ifDefined(closeButtonLabel)}
        title=${ifDefined(closeButtonLabel)}
        @click="${handleClickCloseButton}"
      >
        ${Close20({
          class: `${prefix}--${type}-notification__close-icon`,
        })}
      </button>
    `;
  }

  /**
   * @returns The template part for the text contents.
   */
  protected _renderText() {
    const { subtitle, title, _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__text-wrapper">
        <p class="${prefix}--${type}-notification__title">${title}<slot name="title"></slot></p>
        <div class="${prefix}--${type}-notification__subtitle">${subtitle}<slot name="subtitle"></slot></div>
        <slot></slot>
      </div>
    `;
  }

  /**
   * @returns The template part for the icon.
   */
  protected _renderIcon() {
    const { iconLabel, kind, _type: type } = this;
    const { [kind]: icon } = iconsForKinds;
    return !icon
      ? undefined
      : icon({
          class: `${prefix}--${type}-notification__icon`,
          children: !iconLabel ? undefined : svg`<title>${iconLabel}</title>`,
        });
  }

  /**
   * The a11y text for the close button. Corresponds to `close-button-label` attribute.
   */
  @property({ attribute: 'close-button-label' })
  closeButtonLabel!: string;

  /**
   * The a11y text for the icon. Corresponds to `icon-label` attribute.
   */
  @property({ attribute: 'icon-label' })
  iconLabel!: string;

  /**
   * Notification kind. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  kind = NOTIFICATION_KIND.SUCCESS;

  /**
   * `true` if the notification should be open. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  open = true;

  /**
   * The subtitle.
   */
  @property()
  subtitle = '';

  /**
   * The title.
   */
  @property()
  title = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'alert');
    }
    super.connectedCallback();
  }

  render() {
    const { _type: type } = this;
    return html`
      <div class="${prefix}--${type}-notification__details">
        ${this._renderIcon()}${this._renderText()}
      </div>
      ${this._renderButton()}
    `;
  }

  /**
   * The name of the custom event fired before this notification is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this notification.
   */
  static get eventBeforeClose() {
    return `${prefix}-notification-beingclosed`;
  }

  /**
   * The name of the custom event fired after this notification is closed upon a user gesture.
   */
  static get eventAfterClose() {
    return `${prefix}-notification-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXInlineNotification;
