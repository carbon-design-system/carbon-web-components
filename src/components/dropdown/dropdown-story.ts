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
import './dropdown';
import './dropdown-item';
import storyDocs from './dropdown-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { open, disabled, helperText, labelText, light, value, triggerContent, disableSelection, onBeforeSelect, onAfterSelect } =
    parameters?.props?.['bx-dropdown'] ?? {};
  const handleBeforeSelected = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-dropdown
      ?open=${open}
      ?disabled=${disabled}
      ?light=${light}
      helper-text=${ifNonNull(helperText)}
      label-text=${ifNonNull(labelText)}
      value=${ifNonNull(value)}
      trigger-content=${ifNonNull(triggerContent)}
      @bx-dropdown-beingselected=${handleBeforeSelected}
      @bx-dropdown-selected=${onAfterSelect}
    >
      <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
      <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
      <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
      <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
      <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
    </bx-dropdown>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Dropdown',
  parameters: {
    docs: storyDocs?.parameters?.docs,
    knobs: {
      'bx-dropdown': () => ({
        open: boolean('Open (open)', false),
        disabled: boolean('Disabled (disabled)', false),
        helperText: textNullable('Helper text (helper-text)', ''),
        labelText: textNullable('Label text (label-text)', ''),
        light: boolean('Light variant (light)', false),
        value: textNullable('The value of the selected item (value)', ''),
        triggerContent: textNullable('The default content of the trigger button (trigger-content)', 'Select an item'),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
          false
        ),
        onBeforeSelect: action('bx-dropdown-beingselected'),
        onAfterSelect: action('bx-dropdown-selected'),
      }),
    },
  },
};
