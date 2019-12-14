/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import settings from 'carbon-components/es/globals/js/settings';
import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import FocusMixin from '../../globals/mixins/focus';
import styles from './structured-list.scss';

const { prefix } = settings;

/**
 * Structured list wrapper.
 */
@customElement(`${prefix}-structured-list`)
class BXStructuredList extends FocusMixin(LitElement) {
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
    const classes = classMap({
      [`${prefix}--structured-list`]: true,
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
