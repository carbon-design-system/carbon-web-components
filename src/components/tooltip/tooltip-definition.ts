/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import FocusMixin from '../../globals/mixins/focus';
import styles from './tooltip.scss';

const { prefix } = settings;

/**
 * The alignment choices of tooltip.
 */
export enum TOOLTIP_ALIGNMENT {
  /**
   * Align the top/left position tooltip body to the one of its trigger button.
   */
  START = 'start',

  /**
   * Align the center position tooltip body to the one of its trigger button.
   */
  CENTER = 'center',

  /**
   * Align the bottom/right position tooltip body to the one of its trigger button.
   */
  END = 'end',
}

/**
 * The direction/positioning/orientation choices of tooltip.
 */
export enum TOOLTIP_DIRECTION {
  /**
   * Put tooltip body at the left of its trigger button.
   */
  LEFT = 'left',

  /**
   * Put tooltip body at the top of its trigger button.
   */
  TOP = 'top',

  /**
   * Put tooltip body at the right of its trigger button.
   */
  RIGHT = 'right',

  /**
   * Put tooltip body at the bottom of its trigger button.
   */
  BOTTOM = 'bottom',
}

/**
 * Definition tooltip.
 */
@customElement(`${prefix}-tooltip-definition`)
class BXTooltipDefinition extends FocusMixin(LitElement) {
  /**
   * How the tooltip is aligned to the trigger button. Corresponds to the attribute with the same name.
   */
  @property()
  alignment = TOOLTIP_ALIGNMENT.CENTER;

  /**
   * The text for the tooltip body. Corresponds to `body-text` attribute.
   */
  @property({ attribute: 'body-text' })
  bodyText = '';

  /**
   * The tooltip direction. Corresponds to the attribute with the same name.
   */
  @property()
  direction = TOOLTIP_DIRECTION.BOTTOM;

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  render() {
    const { alignment, bodyText, direction } = this;
    const classes = classnames(
      `${prefix}--tooltip__trigger`,
      `${prefix}--tooltip--a11y`,
      `${prefix}--tooltip__trigger--definition`,
      {
        [`${prefix}--tooltip--${direction}`]: direction,
        [`${prefix}--tooltip--align-${alignment}`]: alignment,
      }
    );
    return html`
      <button class="${classes}" aria-describedby="tooltip-body">
        <slot></slot>
      </button>
      <div class="${prefix}--assistive-text" id="tooltip-body" role="tooltip">
        <slot name="body">${bodyText}</slot>
      </div>
    `;
  }

  static styles = styles;
}

export default BXTooltipDefinition;
