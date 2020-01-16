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
import './checkbox';
import storyDocs from './checkbox-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onAfterChange } =
    parameters?.props?.['bx-checkbox'] ?? {};
  return html`
    <bx-checkbox
      ?checked="${checked}"
      ?disabled="${disabled}"
      ?hide-label="${hideLabel}"
      ?indeterminate="${indeterminate}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      value="${ifNonNull(value)}"
      @bx-checkbox-changed="${onAfterChange}"
    ></bx-checkbox>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Checkbox',
  parameters: {
    docs: storyDocs?.parameters?.docs,
    knobs: {
      'bx-checkbox': () => ({
        checked: boolean('Checked (checked)', false),
        disabled: boolean('Disabled (disabled)', false),
        hideLabel: boolean('Hide label (hide-label)', false),
        indeterminate: boolean('Indeterminate state (indeterminate)', false),
        labelText: textNullable('Label text (label-text)', 'Checkbox'),
        name: textNullable('Name (name)', ''),
        value: textNullable('Value (value)', ''),
        onAfterChange: action('bx-checkbox-changed'),
      }),
    },
  },
};
