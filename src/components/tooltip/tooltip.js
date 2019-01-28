import settings from 'carbon-components/es/globals/js/settings';
import on from 'carbon-components/es/globals/js/misc/on';
import { html, render } from 'lit-html';
import styles from './tooltip.scss';

const { prefix } = settings;
const find = (a, predicate) => Array.prototype.find.call(a, predicate);

/**
 * Trigger button of tooltip.
 * @extends HTMLElement
 */
class BXTooltip extends HTMLElement {
  /**
   * The handle for `click` event listener.
   * @private
   */
  #hClick;

  /**
   * The menu body.
   * @private
   */
  #menuBody;

  /**
   * Handles `click` event on this element.
   * @private
   */
  #handleClick = () => {
    this.open = !this.open;
  };

  /**
   * `true` if the dropdown should be open. Corresponds to the attribute with the same name.
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
   * @returns {DOMRect} The position of the trigger button in the viewport.
   */
  get triggerPosition() {
    const triggerNode = this.shadowRoot.querySelector(this.constructor.selectorTrigger);
    if (!triggerNode) {
      throw new TypeError('Cannot find the trigger button.');
    }
    return triggerNode.getBoundingClientRect();
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'button');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '0');
    }
    if (!this.hasAttribute('aria-haspopup')) {
      this.setAttribute('aria-haspopup', 'true');
    }
    if (!this.hasAttribute('aria-expanded')) {
      this.setAttribute('aria-expanded', 'false');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    if (!this.#hClick) {
      this.#hClick = on(this, 'click', this.#handleClick);
    }
    this.render();
  }

  disconnectedCallback() {
    if (this.#hClick) {
      this.#hClick = this.#hClick.release();
    }
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'open' && !this.#menuBody) {
        this.#menuBody = find(this.childNodes, elem => elem.constructor.FLOATING_MENU);
      }
      if (this.#menuBody) {
        this.#menuBody.open = this.open;
      }
      this.setAttribute('aria-expanded', Boolean(this.open));
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

  /* eslint-disable class-methods-use-this */
  /**
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  template() {
    return html`
      <style>
        ${styles}
      </style>
      <svg id="trigger" width="16" height="16" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
        <g fill-rule="evenodd">
          <path d="M8 14.5a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM8 16A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" fill-rule="nonzero" />
          <path fill-rule="nonzero" d="M9 13H7V7h2z" />
          <circle cx="8" cy="4" r="1" />
        </g>
      </svg>
      <slot></slot>
    `;
  }
  /* eslint-enable class-methods-use-this */

  static get observedAttributes() {
    return ['open'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-tooltip>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-tooltip`;
  }

  /**
   * The CSS selector to find the trigger button.
   * @type {string}
   */
  static selectorTrigger = '#trigger';
}

window.customElements.define(BXTooltip.is, BXTooltip);

export default BXTooltip;
