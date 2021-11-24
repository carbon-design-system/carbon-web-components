/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import settings from 'carbon-components/es/globals/js/settings';
import BXTooltipDefintion from './tooltip-definition';

const { prefix } = settings;

/**
 * Icon tooltip.
 * @element bx-tooltip-icon
 * @slot body - The tooltip body content.
 */
@customElement(`${prefix}-tooltip-icon`)
class BXTooltipIcon extends BXTooltipDefintion {
  render() {
    const { alignment, bodyText, direction } = this;
    const classes = classMap({
      [`${prefix}--tooltip__trigger`]: true,
      [`${prefix}--tooltip--a11y`]: true,
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
