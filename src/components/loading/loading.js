import htmlRegular from 'carbon-components/html/loading/loading--without-overlay.html';
import htmlSmall from 'carbon-components/html/loading/loading--small.html';
import htmlWithOverlay from 'carbon-components/html/loading/loading.html';

import Loading from 'carbon-components/es/components/loading/loading.js';

const templateStrings = {
  regular: htmlRegular.trim(),
  small: htmlSmall.trim(),
  overlay: htmlWithOverlay.trim(),
};

/**
 * Spinner indicating loading state.
 * @extends HTMLElement
 */
class BXLoading extends HTMLElement {
  /**
   * Stamps out the template.
   * @private
   */
  _stamp() {
    if (!this.querySelector(this.constructor.constants.selectorTemplateContent)) {
      const template = this.ownerDocument.importNode(this.template, true);
      this.appendChild(template);
    }
  }

  /**
   * Creates carbon-components `Loading` instance.
   * @private
   */
  _create() {
    // eslint-disable-next-line no-unused-vars
    const { selectorInit, defaultType, ...remainder } = this.constructor.constants;
    const options = {
      ...remainder,
      active: !this.inactive,
      selectorInit,
    };
    if (!this.loading) {
      this.loading = Loading.create(this.querySelector(selectorInit), options);
    }
  }

  /**
   * carbon-components `Loading` instance.
   * @type {Loading}
   */
  loading;

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
   * The template being used.
   * @type {DocumentFragment}
   */
  get template() {
    const found = this.constructor._templates[this.type];
    if (found) {
      return found;
    }
    const templateString = templateStrings[this.type] || templateStrings[this.constructor.constants.defaultType];
    return (this.constructor._templates[this.type] = this.ownerDocument.createRange().createContextualFragment(templateString));
  }

  connectedCallback() {
    this._stamp();
    this._create();
  }

  disconnectedCallback() {
    if (this.loading) {
      this.loading = this.loading.release();
    }
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if (name === 'type') {
        if (this.loading) {
          this.loading = this.loading.release();
        }
        while (this.firstChild) {
          this.removeChild(this.firstChild);
        }
        this._stamp();
        this._create();
      } else if (name === 'inactive') {
        this.loading.set(current === null);
      }
    }
  }

  /**
   * The templates associated with spinner types.
   * @type {Object.<string, DocumentFragment>}
   * @private
   */
  static _templates = {};

  static get observedAttributes() {
    return [
      'type',
      'inactive',
    ];
  }

  /**
   * The tag name of this custom element, which is, `<bx-loadng>`.
   * @type {string}
   */
  static get is() {
    return 'bx-loading';
  }

  /**
   * Component constants.
   * @type {Object}
   * @property {string} [defaultType] The default spinner type.
   */
  static get constants() {
    return Object.assign({}, Loading.options, {
      selectorTemplateContent: 'data-loading',
      defaultType: 'regular',
    });
  }
}

export default BXLoading;
