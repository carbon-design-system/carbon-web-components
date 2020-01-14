/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './checkbox';
import storyDocs from './checkbox-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onAfterChange } = parameters?.props?.[
    'bx-checkbox'
  ];
  return html`
    <bx-checkbox
      ?checked="${checked}"
      ?disabled="${disabled}"
      ?hide-label="${hideLabel}"
      ?indeterminate="${indeterminate}"
      label-text="${labelText}"
      name="${ifDefined(!name ? undefined : name)}"
      value="${ifDefined(!value ? undefined : value)}"
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
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-checkbox': () => ({
        checked: boolean('Checked (checked)', false),
        disabled: boolean('Disabled (disabled)', false),
        hideLabel: boolean('Hide label (hide-label)', false),
        indeterminate: boolean('Indeterminate state (indeterminate)', false),
        labelText: text('Label text (label-text)', 'Checkbox'),
        name: text('Name (name)', ''),
        value: text('Value (value)', ''),
        onAfterChange: action('bx-checkbox-changed'),
      }),
    },
  },
};
