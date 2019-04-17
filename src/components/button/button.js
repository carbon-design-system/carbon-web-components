import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, render } from 'lit-html';
import styles from './button.scss';

const { prefix } = settings;

/**
 * Button.
 * @extends HTMLElement
 */
class BXButton extends HTMLElement {
  /**
   * Handles `click` event on the `<a>.
   * @param {MouseEvent} evt The event.
   * @private
   */
  #handleClickLink = evt => {
    if (this.disabled) {
      evt.preventDefault(); // Stop following the link
      evt.stopPropgation(); // Stop firing `onClick`
    }
  };

  /**
   * `true` if the button should be disabled. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(current) {
    if (current) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  /**
   * Link `href`. Corresponds to the attribute with the same name. If present, this button is rendered as `<a>`.
   * @type {string}
   */
  get href() {
    return this.getAttribute('href');
  }

  set href(current) {
    this.setAttribute('href', current);
  }

  /**
   * Button kind. Corresponds to the attribute with the same name. Choices are:
   *
   * * `primary`: Primary button.
   * * `secondary`: Secondary button.
   * * `tertiary`: Tertiary button.
   * * `danger`: Danger button.
   * * `ghost`: Ghost button.
   *
   * @type {string}
   */
  get kind() {
    return this.getAttribute('kind');
  }

  set kind(current) {
    this.setAttribute('kind', current);
  }

  /**
   * `true` if the button should be a small variant. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get small() {
    return this.hasAttribute('small');
  }

  set small(current) {
    if (current) {
      this.setAttribute('small', '');
    } else {
      this.removeAttribute('small');
    }
  }

  connectedCallback() {
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (this.constructor.explicitAttributes.includes(name)) {
        this.render();
      } else {
        const button = this.shadowRoot.getElementById('button');
        if (current === null) {
          button.removeAttribute(name);
        } else {
          button.setAttribute(name, current);
        }
      }
    }
  }

  /**
   * Renders the template.
   */
  render() {
    if (this.shadowRoot) {
      render(this.template(), this.shadowRoot);
      const button = this.shadowRoot.getElementById('button');
      const { attributes } = this;
      for (let i = 0; i < attributes.length; ++i) {
        const { name, value } = attributes[i];
        if (!this.constructor.explicitAttributes.includes(name)) {
          button.setAttribute(name, value);
        }
      }
    }
  }

  /**
   * @returns {TemplateResult} The `lit-html` template.
   */
  template() {
    const { disabled, href, kind, small } = this;
    const classes = classnames(`${prefix}--btn`, {
      [`${prefix}--btn--${kind}`]: kind,
      [`${prefix}--btn--disabled`]: disabled,
      [`${prefix}--btn--sm`]: small,
    });
    const button = href
      ? html`
          <a id="button" role="button" class="${classes}" href=${href} @click=${this.#handleClickLink}><slot></slot></a>
        `
      : html`
          <button id="button" class="${classes}" ?disabled=${disabled}><slot></slot></button>
        `;
    return html`
      <style>
        ${styles}
      </style>
      ${button}
    `;
  }

  /**
   * The list of attribute names that are not set by `lit-html` template
   * but need to be propagated from shadow host.
   * @type {string[]}
   */
  static get explicitAttributes() {
    return ['disabled', 'href', 'kind', 'small'];
  }

  static get observedAttributes() {
    return ['disabled', 'href', 'kind', 'small'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-btn>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-btn`;
  }
}

window.customElements.define(BXButton.is, BXButton);

export default BXButton;
