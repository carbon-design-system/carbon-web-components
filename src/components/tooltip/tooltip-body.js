import settings from 'carbon-components/es/globals/js/settings';
import { html, render } from 'lit-html';
import BXFloatingMenu from '../floating-menu/floating-menu';
import styles from './tooltip.scss';

const { prefix } = settings;

/**
 * Tooltip body.
 * @extends BXFloatingMenu
 */
class BXTooltipBody extends BXFloatingMenu {
  /**
   * The position of this tooltip body.
   * @type {BXFloatingMenu~position}
   */
  get position() {
    const { DIRECTION_LEFT, DIRECTION_TOP } = this.constructor;
    const { direction } = this;
    const position = super.position;

    if (direction === DIRECTION_LEFT) {
      const style = this.ownerDocument.defaultView.getComputedStyle(this);
      const margin = Number((/^([\d-.]+)px$/.exec(style.getPropertyValue('margin-right')) || [])[1]);
      if (!isNaN(margin)) {
        // For direction === DIRECTION_RIGHT, the left/top margin the caret size effectively adjusts the position,
        // but for direction === DIRECTION_LEFT such thing won't happen
        return {
          ...position,
          left: position.left - margin,
        };
      }
    }

    if (direction === DIRECTION_TOP) {
      const style = this.ownerDocument.defaultView.getComputedStyle(this);
      const margin = Number((/^([\d-.]+)px$/.exec(style.getPropertyValue('margin-bottom')) || [])[1]);
      if (!isNaN(margin)) {
        // For direction === DIRECTION_BOTTOM, the left/top margin the caret size effectively adjusts the position,
        // but for direction === DIRECTION_TOP such thing won't happen
        return {
          ...position,
          top: position.top - margin,
        };
      }
    }

    return position;
  }

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'menu');
    }
    if (!this.hasAttribute('tabindex')) {
      // TODO: Should we use a property?
      this.setAttribute('tabindex', '-1');
    }
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    this.render();
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
      <span class="${prefix}--tooltip__caret"></span><slot></slot>
    `;
  }
  /* eslint-enable class-methods-use-this */

  /**
   * The tag name of this custom element, which is, `<bx-tooltip-body>`.
   * @type {string}
   */
  static get is() {
    return `${prefix}-tooltip-body`;
  }
}

window.customElements.define(BXTooltipBody.is, BXTooltipBody);

export default BXTooltipBody;
