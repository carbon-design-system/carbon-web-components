/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, LitElement } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './list.scss';

const { prefix } = settings;

/**
 * Ordered list.
 */
@customElement(`${prefix}-unordered-list`)
class BXUnorderedList extends LitElement {
  /**
   * `true` if expressive theme enabled.
   */
  @property({ type: Boolean, reflect: true })
  isExpressive = false;

  connectedCallback() {
    // Uses attribute for lookup from child
    if (this.closest((this.constructor as typeof BXUnorderedList).selectorListItem)) {
      this.setAttribute('slot', 'nested');
    } else {
      this.removeAttribute('slot');
    }
    super.connectedCallback();
  }

  render() {
    const classes = classMap({
      [`${prefix}--list--unordered`]: true,
      [`${prefix}--list--nested`]: this.getAttribute('slot') === 'nested',
      [`${prefix}--list--expressive`]: this.isExpressive,
    });
    return html`
      <ul class="${classes}">
        <slot></slot>
      </ul>
    `;
  }

  /**
   * A selector that will return list item.
   */
  static get selectorListItem() {
    return `${prefix}-list-item`;
  }

  static styles = styles;
}

export default BXUnorderedList;
