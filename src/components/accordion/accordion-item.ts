/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { html, property, customElement, LitElement } from 'lit-element';
import ChevronRight16 from '@carbon/icons/lib/chevron--right/16';
import FocusMixin from '../../globals/mixins/focus';
import styles from './accordion.scss';

const { prefix } = settings;

/**
 * Accordion item.
 */
@customElement(`${prefix}-accordion-item`)
class BXAccordionItem extends FocusMixin(LitElement) {
  /**
   * Handles user-initiated toggle request of this accordion item.
   * @param open The new open state.
   */
  private _handleUserInitiatedToggle(open = !this.open) {
    const init = {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: {
        open,
      },
    };
    if (this.dispatchEvent(new CustomEvent((this.constructor as typeof BXAccordionItem).eventBeforeToggle, init))) {
      this.open = open;
      this.dispatchEvent(new CustomEvent((this.constructor as typeof BXAccordionItem).eventAfterToggle, init));
    }
  }

  /**
   * Handler for the `click` event on the expando button.
   */
  private _handleClickExpando() {
    this._handleUserInitiatedToggle();
  }

  /**
   * Handler for the `keydown` event on the expando button.
   */
  private _handleKeydownExpando = ({ key }: KeyboardEvent) => {
    if (this.open && (key === 'Esc' || key === 'Escape')) {
      this._handleUserInitiatedToggle(false);
    }
  };

  /**
   * The assistive text for the expando button. Corresponds to `expando-assistive-text` attribute.
   */
  @property({ attribute: 'expando-assistive-text' })
  expandoAssistiveText = 'Expand/Collapse';

  /**
   * `true` if the check box should be open. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  /**
   * The title text. Corresponds to `title-text` attribute.
   */
  @property({ attribute: 'title-text' })
  titleText = '';

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const {
      expandoAssistiveText,
      titleText,
      open,
      _handleClickExpando: handleClickExpando,
      _handleKeydownExpando: handleKeydownExpando,
    } = this;
    return html`
      <button
        type="button"
        class="${prefix}--accordion__heading"
        title="${expandoAssistiveText}"
        aria-expanded="${String(Boolean(open))}"
        @click="${handleClickExpando}"
        @keydown="${handleKeydownExpando}"
      >
        ${ChevronRight16({
          class: `${prefix}--accordion__arrow`,
          'aria-label': expandoAssistiveText,
        })}
        <div class="${prefix}--accordion__title"><slot name="title">${titleText}</slot></div>
      </button>
      <div class="${prefix}--accordion__content"><slot></slot></div>
    `;
  }

  /**
   * The name of the custom event fired before this accordion item is being toggled upon a user gesture.
   * Cancellation of this event stops the user-initiated action of toggling this accordion item.
   */
  static get eventBeforeToggle() {
    return `${prefix}-accordion-item-beingtoggled`;
  }

  /**
   * The name of the custom event fired after this accordion item is toggled upon a user gesture.
   */
  static get eventAfterToggle() {
    return `${prefix}-accordion-item-toggled`;
  }

  static styles = styles;
}

export default BXAccordionItem;
