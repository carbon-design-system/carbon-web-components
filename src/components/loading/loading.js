import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, render } from 'lit-html';

/**
 * Spinner indicating loading state.
 * @extends HTMLElement
 */
class BXLoading extends HTMLElement {
  /**
   * Spinner type. Corresponds to the attribute with the same name. Choices are:
   *
   * * `regular`: Regular spinner.
   * * `small`: Small spinner.
   * * `overlay`: Spinner covering up the whole page.
   *
   * @type {string}
   */
  get type() {
    return this.getAttribute('type');
  }

  set type(current) {
    this.setAttribute('type', current);
  }

  /**
   * `true` if spinner should stop. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get inactive() {
    return this.hasAttribute('inactive');
  }

  set inactive(current) {
    if (current) {
      this.setAttribute('inactive', '');
    } else {
      this.removeAttribute('inactive');
    }
  }

  /**
   * @param {Object} props The properties used to render the template.
   * @params {string} [props.type]
   *   Spinner type. Corresponds to the attribute with the same name. Choices are:
   *
   *   * `regular`: Regular spinner.
   *   * `small`: Small spinner.
   *   * `overlay`: Spinner covering up the whole page.
   *
   * @params {boolean} [props.inactive] `true` if the spinner should be stopped.
   * @returns {TemplateResult} The `lit-html` template with the given properties.
   */
  static template({ type, inactive }) {
    const { prefix } = settings;
    const classes = classnames(`${prefix}--loading`, {
      [`${prefix}--loading--small`]: type === 'small',
      [`${prefix}--loading--stop`]: inactive,
    });
    const overlayClasses = classnames(`${prefix}--loading-overlay`, {
      [`${prefix}--loading-overlay--stop`]: inactive,
    });
    const template = html`
      <div data-loading class="${classes}">
        <svg class="${prefix}--loading__svg" viewBox="-75 -75 150 150">
          <title>Loading</title>
          <circle cx="0" cy="0" r="37.5" />
        </svg>
      </div>
    `;
    return type !== 'overlay'
      ? template
      : html`
          <div class="${overlayClasses}">${template}</div>
        `;
  }

  connectedCallback() {
    this.render();
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
    const props = {
      type: this.type,
      inactive: this.inactive,
    };
    render(this.constructor.template(props), this);
  }

  static get observedAttributes() {
    return ['type', 'inactive'];
  }

  /**
   * The tag name of this custom element, which is, `<bx-loadng>`.
   * @type {string}
   */
  static get is() {
    const { prefix } = settings;
    return `${prefix}-loading`;
  }
}

export default BXLoading;
