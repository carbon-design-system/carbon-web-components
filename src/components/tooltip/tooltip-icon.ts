/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { html, customElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import BXTooltipDefintion from './tooltip-definition';

const { prefix } = settings;

/**
 * Icon tooltip.
 */
@customElement(`${prefix}-tooltip-icon`)
class BXTooltipIcon extends BXTooltipDefintion {
  render() {
    const { alignment, bodyText, direction } = this;
    const classes = classnames(`${prefix}--tooltip__trigger`, `${prefix}--tooltip--a11y`, {
      [`${prefix}--tooltip--${direction}`]: direction,
      [`${prefix}--tooltip--align-${alignment}`]: alignment,
    });
    return html`
      <button class="${classes}" aria-describedby="tooltip-body">
        <span class="${prefix}--assistive-text" id="tooltip-body" role="tooltip">
          <slot name="body">${bodyText}</slot>
        </span>
        <slot></slot>
      </button>
    `;
  }
}

export default BXTooltipIcon;
