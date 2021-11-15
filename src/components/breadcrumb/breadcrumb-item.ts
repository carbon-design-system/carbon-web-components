/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './breadcrumb.scss';

const { prefix } = settings;

/**
 * Breadcrumb item.
 * @element bx-breadcrumb-item
 */
@customElement(`${prefix}-breadcrumb-item`)
class BXBreadcrumbItem extends LitElement {
  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'listitem');
    }
    super.connectedCallback();
  }

  render() {
    return html`<slot></slot>`;
  }

  static styles = styles;
}

export default BXBreadcrumbItem;
