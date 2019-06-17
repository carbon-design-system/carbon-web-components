import settings from 'carbon-components/es/globals/js/settings';
import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list wrapper.
 */
@customElement(`${prefix}-structured-list` as any)
class BXStructuredList extends LitElement {
  /**
   * `true` if border should be used. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  border = false;

  /**
   * `true` if selection should be supported. Corresponds to `has-selection` attribute.
   */
  @property({ type: Boolean, reflect: true, attribute: 'has-selection' })
  hasSelection = false;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { border, hasSelection } = this;
    const classes = classnames(`${prefix}--structured-list`, {
      [`${prefix}--structured-list--border`]: border,
      [`${prefix}--structured-list--selection`]: hasSelection,
    });
    return html`
      <section id="section" class=${classes}><slot></slot></section>
    `;
  }

  static styles = styles;
}

export default BXStructuredList;
