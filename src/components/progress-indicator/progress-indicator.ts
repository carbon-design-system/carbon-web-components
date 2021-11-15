/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import { forEach } from '../../globals/internal/collection-helpers';
import BXProgressStep from './progress-step';
import styles from './progress-indicator.scss';

const { prefix } = settings;

/**
 * Progress indicator.
 * @element bx-progress-indicator
 */
@customElement(`${prefix}-progress-indicator`)
class BXProgressIndicator extends LitElement {
  /**
   * `true` if the progress indicator should be vertical.
   */
  @property({ type: Boolean, reflect: true })
  vertical = false;

  connectedCallback() {
    if (!this.hasAttribute('role')) {
      this.setAttribute('role', 'list');
    }
    super.connectedCallback();
  }

  updated(changedProperties) {
    if (changedProperties.has('vertical')) {
      // Propagate `vertical` attribute to descendants until `:host-context()` gets supported in all major browsers
      forEach(this.querySelectorAll((this.constructor as typeof BXProgressIndicator).selectorStep), item => {
        (item as BXProgressStep).vertical = this.vertical;
      });
    }
  }

  render() {
    return html`<slot></slot>`;
  }

  /**
   * A selector that will return progress steps.
   */
  static get selectorStep() {
    return `${prefix}-progress-step`;
  }

  static styles = styles;
}

export default BXProgressIndicator;
