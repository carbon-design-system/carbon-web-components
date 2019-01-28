import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import styles from './overflow-menu.scss';

const { prefix } = settings;
const find = (a, predicate) => Array.prototype.find.call(a, predicate);

/**
 * Overflow menu.
 * @extends HTMLElement
 */
class BXOverflowMenu extends HTMLElement {
  /**
   * The menu body.
   * @private
   */
  #menuBody;

  /**
   * Handles `click` event on the trigger button.
   * @private
   */
  #handleClickTrigger = () => {
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
    return this.getBoundingClientRect();
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
    this.render();
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
      <svg
        id="trigger"
        aria-hidden="true"
        class="${prefix}--overflow-menu__icon"
        width="3"
        height="15"
        viewBox="0 0 3 15"
        @click=${this.#handleClickTrigger}
      >
        <g fill-rule="evenodd">
          <circle cx="1.5" cy="1.5" r="1.5" />
          <circle cx="1.5" cy="7.5" r="1.5" />
          <circle cx="1.5" cy="13.5" r="1.5" />
        </g>
      </svg>
    `;
  }
  /* eslint-enable class-methods-use-this */

  static get observedAttributes() {
    return ['open'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-overflow-menu>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-overflow-menu`;
  }

  /**
   * The CSS selector to find the trigger button.
   * @type {string}
   */
  static selectorTrigger = '#trigger';
}

window.customElements.define(BXOverflowMenu.is, BXOverflowMenu);

export default BXOverflowMenu;
