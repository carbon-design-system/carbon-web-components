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
import ifNonNull from '../../globals/directives/if-non-null';
import FocusMixin from '../../globals/mixins/focus';
import styles from './content-switcher.scss';

const { prefix } = settings;

/**
 * Content switcher button.
 */
@customElement(`${prefix}-content-switcher-item`)
class BXContentSwitcherItem extends FocusMixin(LitElement) {
  /**
   * `true` if this content switcher item should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * `true` to hide the divider at the left. Corresponds to `hide-divider` attribute.
   */
  @property({ type: Boolean, reflect: true, attribute: 'hide-divider' })
  hideDivider = false;

  /**
   * `true` if the content switcher button should be selected. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  selected = false;

  /**
   * The element ID of target panel. Corresponds to the attribute with the same name.
   */
  @property()
  target!: string;

  /**
   * The `value` attribute that is set to the parent `<bx-content-switcher>` when this content switcher item is selected.
   * Corresponds to the attribute with the same name.
   */
  @property()
  value = '';

  createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  shouldUpdate(changedProperties) {
    if (changedProperties.has('selected') || changedProperties.has('target')) {
      const { selected, target } = this;
      if (target) {
        const targetNode = (this.getRootNode() as ShadowRoot).getElementById(target);
        if (targetNode) {
          targetNode.toggleAttribute('hidden', !selected);
        }
      }
    }
    return true;
  }

  render() {
    const { disabled, selected, target } = this;
    const className = classnames(`${prefix}--content-switcher-btn`, {
      [`${prefix}--content-switcher--selected`]: selected,
    });
    return html`
      <button
        type="button"
        role="tab"
        class="${className}"
        ?disabled="${disabled}"
        tabindex="${selected ? '0' : '-1'}"
        aria-controls="${ifNonNull(target)}"
        aria-selected="${Boolean(selected)}"
      >
        <span class="${prefix}--content-switcher__label"><slot></slot></span>
      </button>
    `;
  }

  static styles = styles;
}

export default BXContentSwitcherItem;
