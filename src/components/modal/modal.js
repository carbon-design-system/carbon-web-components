import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import classnames from 'classnames';
import { html, render } from 'lit-html';
import styles from './modal.scss';

class BXModal extends HTMLElement {
  /**
   * The handle for the `click` event handler of this element.
   * @type {Handle}
   * @private
   */
  #hClick;

  /**
   * Handles `click` event on this element.
   * @param {MouseEvent} evt The event.
   * @private
   */
  #handleClick = evt => {
    if (evt.composedPath().indexOf(this.shadowRoot) < 0) {
      this.#handleUserInitiatedClose(evt.target);
    }
  };

  /**
   * Handles `click` event on the modal container.
   * @param {MouseEvent} evt The event.
   * @private
   */
  #handleClickContainer = evt => {
    if (evt.target.isModalCloseButton || evt.target.hasAttribute('data-modal-close')) {
      this.#handleUserInitiatedClose(evt.target);
    }
  };

  /**
   * Handles user-initiated close request of this modal.
   * @param {Element} triggeredBy The element that triggered this close request.
   * @private
   */
  #handleUserInitiatedClose = triggeredBy => {
    const init = {
      bubbles: true,
      cancelable: true,
      detail: {
        triggeredBy,
      },
    };
    if (this.dispatchEvent(new CustomEvent(this.constructor.eventBeforeClose, init))) {
      this.open = false;
      this.dispatchEvent(new CustomEvent(this.constructor.eventAfterClose, init));
    }
  };

  /**
   * The additional CSS class names for the container <div> of the element. Corresponds to `container-class` attribute.
   * @type {string}
   */
  get containerClass() {
    return this.getAttribute('container-class');
  }

  set containerClass(current) {
    this.setAttribute('container-class', current);
  }

  /**
   * `true` if the modal should be the danger variant. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get danger() {
    return this.hasAttribute('danger');
  }

  set danger(current) {
    if (current) {
      this.setAttribute('danger', '');
    } else {
      this.removeAttribute('danger');
    }
  }

  /**
   * `true` if the modal should be open. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get open() {
    return this.hasAttribute('open');
  }

  set open(current) {
    if (current) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  /**
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  template() {
    const { prefix } = settings;
    const containerClasses = classnames(`${prefix}--modal-container`, {
      [this.containerClass]: this.containerClass,
    });
    return html`
      <style>
        ${styles}
      </style>
      <div class=${containerClasses} role="dialog" tabidnex="-1" @click=${this.#handleClickContainer}><slot></slot></div>
    `;
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.#hClick = on(this, 'click', this.#handleClick);
    this.render();
  }

  disconnectedCallback() {
    if (this.#hClick) {
      this.#hClick = this.#hClick.release();
    }
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      this.render();
    }
  }

  /**
   * Renders the template.
   */
  render() {
    if (this.shadowRoot) {
      render(this.template(), this.shadowRoot);
    }
  }

  static get observedAttributes() {
    return ['container-class', 'danger', 'open'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-modal>`.
   * @type {string}
   */
  static get is() {
    const { prefix } = settings;
    return `${prefix}-modal`;
  }

  /**
   * The name of the custom event fired before this modal is being closed upon a user gesture.
   * Cancellation of this event stops the user-initiated action of closing this modal.
   * @type {string}
   */
  static get eventBeforeClose() {
    return `${this.is.toLowerCase()}-beingclosed`;
  }

  /**
   * The name of the custom event fired after this modal is closed upon a user gesture.
   * @type {string}
   */
  static get eventAfterClose() {
    return `${this.is.toLowerCase()}-closed`;
  }
}

window.customElements.define(BXModal.is, BXModal);

export default BXModal;
