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
import styles from './skeleton-placeholder.scss';

const { prefix } = settings;

/**
 * Skeleton placeholder.
 * @element bx-skeleton-placeholder
 */
@customElement(`${prefix}-skeleton-placeholder`)
class BXSkeletonPlaceholder extends LitElement {
  render() {
    return html` <div class="${prefix}--skeleton__placeholder"></div> `;
  }

  static styles = styles;
}

export default BXSkeletonPlaceholder;
