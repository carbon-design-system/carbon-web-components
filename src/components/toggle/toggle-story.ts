/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './toggle';
import storyDocs from './toggle-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { checked, checkedText, disabled, labelText, name, small, uncheckedText, value, onAfterChange } =
    parameters?.props?.['bx-toggle'] ?? {};
  return html`
    <bx-toggle
      ?checked="${checked}"
      checked-text="${ifNonNull(checkedText)}"
      ?disabled="${disabled}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      ?small="${small}"
      unchecked-text="${ifNonNull(uncheckedText)}"
      value="${ifNonNull(value)}"
      @bx-toggle-changed="${onAfterChange}"
    ></bx-toggle>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Toggle',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-toggle': () => ({
        checked: boolean('Checked (checked)', false),
        checkedText: textNullable('Text for checked state (checked-text)', 'On'),
        disabled: boolean('Disabled (disabled)', false),
        labelText: textNullable('Label text (label-text)', 'Toggle'),
        name: textNullable('Name (name)', ''),
        small: boolean('Use small variant (small)', false),
        uncheckedText: textNullable('Text for unchecked state (unchecked-text)', 'Off'),
        value: textNullable('Value (value)', ''),
        onAfterChange: action('bx-toggle-changed'),
      }),
    },
  },
};
