/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { classMap } from 'lit-html/directives/class-map';
import { html, property, customElement, LitElement } from 'lit-element';
import settings from 'carbon-components/es/globals/js/settings';
import styles from './skeleton-text.scss';

const { prefix } = settings;

/**
 * Skeleton text types.
 */
export enum SKELETON_TEXT_TYPE {
  /**
   * Regular variant.
   */
  REGULAR = 'regular',

  /**
   * Heading variant.
   */
  HEADING = 'heading',

  /**
   * Line variant.
   */
  LINE = 'line',
}

/**
 * Skeleton text.
 */
@customElement(`${prefix}-skeleton-text`)
class BXSkeletonText extends LitElement {
  /**
   * The type of skeleton text. Corresponds to the attribute with the same name.
   */
  @property({ reflect: true })
  type = SKELETON_TEXT_TYPE.REGULAR;

  render() {
    const { type } = this;
    const classes = classMap({
      [`${prefix}--skeleton__text`]: true,
      [`${prefix}--skeleton__heading`]: type === SKELETON_TEXT_TYPE.HEADING,
    });
    return html`
      <p class="${classes}"></p>
    `;
  }

  static styles = styles;
}

export default BXSkeletonText;
