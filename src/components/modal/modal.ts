/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import findLast from 'lodash-es/findLast';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, query, customElement, LitElement } from 'lit-element';
import HostListener from '../../globals/decorators/host-listener';
import HostListenerMixin from '../../globals/mixins/host-listener';
import styles from './modal.scss';
import { selectorTabbable } from '../../globals/settings';
import { find } from '../../globals/internal/collection-helpers';

const { prefix } = settings;

// eslint-disable-next-line no-bitwise
const PRECEDING = Node.DOCUMENT_POSITION_PRECEDING | Node.DOCUMENT_POSITION_CONTAINS;
// eslint-disable-next-line no-bitwise
const FOLLOWING = Node.DOCUMENT_POSITION_FOLLOWING | Node.DOCUMENT_POSITION_CONTAINED_BY;

/**
 * Modal size.
 */
export enum MODAL_SIZE {
  /**
   * Extra small size.
   */
  EXTRA_SMALL = 'xs',

  /**
   * Small size.
   */
  SMALL = 'sm',

  /**
   * Regular size.
   */
  REGULAR = '',

  /**
   * Large size.
   */
  LARGE = 'lg',
}

/**
 * Modal.
 * @element bx-modal
 * @fires bx-modal-beingclosed
 *   The custom event fired before this modal is being closed upon a user gesture.
 *   Cancellation of this event stops the user-initiated action of closing this modal.
 * @fires bx-modal-closed - The custom event fired after this modal is closed upon a user gesture.
 */
@customElement(`${prefix}-modal`)
class BXModal extends HostListenerMixin(LitElement) {
  /**
   * The element that had focus before this modal gets open.
   */
  private _launcher: Element | null = null;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#start-sentinel')
  private _startSentinelNode!: HTMLAnchorElement;

  /**
   * Node to track focus going outside of modal content.
   */
  @query('#end-sentinel')
  private _endSentinelNode!: HTMLAnchorElement;

  /**
   * Handles `click` event on this element.
   * @param event The event.
   */
  @HostListener('click')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleClick = (event: MouseEvent) => {
    if (event.composedPath().indexOf(this.shadowRoot!) < 0) {
      this._handleUserInitiatedClose(event.target);
    }
  };

  /**
   * Handles `blur` event on this element.
   * @param event The event.
   */
  @HostListener('shadowRoot:focusout')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleBlur = ({ target, relatedTarget }: FocusEvent) => {
    const oldContains = target !== this && this.contains(target as Node);
    const currentContains = relatedTarget !== this && this.contains(relatedTarget as Node);

    // Performs focus wrapping if _all_ of the following is met:
    // * This modal is open
    // * The viewport still has focus
    // * Modal body used to have focus but no longer has focus
    const { open, _startSentinelNode: startSentinelNode, _endSentinelNode: endSentinelNode } = this;
    const { selectorTabbable: selectorTabbableForModal } = this.constructor as typeof BXModal;
    if (open && relatedTarget && oldContains && !currentContains) {
      const comparisonResult = (target as Node).compareDocumentPosition(relatedTarget as Node);
      // eslint-disable-next-line no-bitwise
      if (relatedTarget === startSentinelNode || comparisonResult & PRECEDING) {
        const tabbable = findLast(this.querySelectorAll(selectorTabbableForModal), elem =>
          Boolean((elem as HTMLElement).offsetParent)
        );
        if (tabbable) {
          (tabbable as HTMLElement).focus();
        } else if (relatedTarget !== this) {
          this.focus();
        }
      }
      // eslint-disable-next-line no-bitwise
      else if (relatedTarget === endSentinelNode || comparisonResult & FOLLOWING) {
        const tabbable = find(this.querySelectorAll(selectorTabbableForModal), elem =>
          Boolean((elem as HTMLElement).offsetParent)
        );
        if (tabbable) {
          (tabbable as HTMLElement).focus();
        } else {
          this.focus();
        }
      }
    }
  };

  @HostListener('document:keydown')
  // @ts-ignore: The decorator refers to this method but TS thinks this method is not referred to
  private _handleKeydown = ({ key, target }: KeyboardEvent) => {
    if (key === 'Esc' || key === 'Escape') {
      this._handleUserInitiatedClose(target);
    }
  };

  /**
   * Handles `click` event on the modal container.
   * @param event The event.
   */
  private _handleClickContainer(event: MouseEvent) {
    if ((event.target as Element).matches((this.constructor as typeof BXModal).selectorCloseButton)) {
      this._handleUserInitiatedClose(event.target);
    }
  }

  /**
   * Handles user-initiated close request of this modal.
   * @param triggeredBy The element that triggered this close request.
   */
  private _handleUserInitiatedClose(triggeredBy: EventTarget | null) {
    if (this.open) {
      const init = {
        bubbles: true,
        cancelable: true,
        composed: true,
        detail: {
          triggeredBy,
        },
      };
      if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXModal).eventBeforeClose, init))) {
        this.open = false;
        this.dispatchEvent(new CustomEvent((this.constructor as typeof BXModal).eventClose, init));
      }
    }
  }

  /**
   * The additional CSS class names for the container <div> of the element.
   */
  @property({ attribute: 'container-class' })
  containerClass = '';

  /**
   * `true` if the modal should be open.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * Modal size.
   */
  @property({ reflect: true })
  size = MODAL_SIZE.REGULAR;

  render() {
    const { size } = this;
    const containerClass = this.containerClass
      .split(' ')
      .filter(Boolean)
      .reduce((acc, item) => ({ ...acc, [item]: true }), {});
    const containerClasses = classMap({
      [`${prefix}--modal-container`]: true,
      [`${prefix}--modal-container--${size}`]: size,
      ...containerClass,
    });
    return html`
      <a id="start-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
      <div class=${containerClasses} role="dialog" tabidnex="-1" @click=${this._handleClickContainer}>
        <slot></slot>
      </div>
      <a id="end-sentinel" class="${prefix}--visually-hidden" href="javascript:void 0" role="navigation"></a>
    `;
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.setAttribute('tabindex', '0');
    }
    super.connectedCallback();
  }

  async updated(changedProperties) {
    if (changedProperties.has('open')) {
      if (this.open) {
        this._launcher = this.ownerDocument!.activeElement;
        const primaryFocusNode = this.querySelector((this.constructor as typeof BXModal).selectorPrimaryFocus);
        if (primaryFocusNode) {
          // For cases where a `carbon-web-components` component (e.g. `<bx-btn>`) being `primaryFocusNode`,
          // where its first update/render cycle that makes it focusable happens after `<bx-modal>`'s first update/render cycle
          await 0;
          (primaryFocusNode as HTMLElement).focus();
        } else {
          const tabbable = find(this.querySelectorAll((this.constructor as typeof BXModal).selectorTabbable), elem =>
            Boolean((elem as HTMLElement).offsetParent)
          );
          if (tabbable) {
            // For cases where a `carbon-web-components` component (e.g. `<bx-btn>`) being `tabbable`,
            // where its first update/render cycle that makes it focusable happens after `<bx-modal>`'s first update/render cycle
            await 0;
            (tabbable as HTMLElement).focus();
          } else {
            this.focus();
          }
        }
      } else if (this._launcher && typeof (this._launcher as HTMLElement).focus === 'function') {
        (this._launcher as HTMLElement).focus();
        this._launcher = null;
      }
    }
  }

  /**
   * A selector selecting buttons that should close this modal.
   */
  static get selectorCloseButton() {
    return `[data-modal-close],${prefix}-modal-close-button`;
  }

  /**
   * A selector selecting tabbable nodes.
   */
  static get selectorTabbable() {
    return selectorTabbable;
  }

  /**
   * A selector selecting the nodes that should be focused when modal gets open.
   */
  static get selectorPrimaryFocus() {
    return `[data-modal-primary-focus],${prefix}-modal-footer ${prefix}-btn[kind="primary"]`;
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   */
  static get eventBeforeClose() {
    return `${prefix}-modal-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   */
  static get eventClose() {
    return `${prefix}-modal-closed`;
  }

  static styles = styles; // `styles` here is a `CSSResult` generated by custom WebPack loader
}

export default BXModal;
