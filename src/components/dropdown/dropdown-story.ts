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
import { boolean, select, text } from '@storybook/addon-knobs';
import { DROPDOWN_TYPE } from './dropdown';
import './dropdown-item';
import storyDocs from './dropdown-story.mdx';

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: DROPDOWN_TYPE.REGULAR,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const defaultStory = ({ parameters }) => {
  const { open, disabled, helperText, labelText, light, type, value, triggerContent, disableSelection } = parameters?.props?.[
    'bx-dropdown'
  ];
  const beforeSelectedAction = action('bx-dropdown-beingselected');
  const handleBeforeSelected = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-dropdown
      ?open=${open}
      ?disabled=${disabled}
      ?light=${light}
      helper-text=${helperText}
      label-text=${labelText}
      type="${type}"
      value=${value}
      trigger-content=${triggerContent}
      @bx-dropdown-beingselected=${handleBeforeSelected}
      @bx-dropdown-selected=${action('bx-dropdown-selected')}
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
    docs: storyDocs.parameters.docs,
    knobs: {
      'bx-dropdown': () => ({
        open: boolean('Open (open)', false),
        disabled: boolean('Disabled (disabled)', false),
        helperText: text('Helper text (helper-text)', 'Optional helper text'),
        labelText: text('Label text (label-text)', 'Dropdown title'),
        light: boolean('Light variant (light)', false),
        type: select('Dropdown type (type)', types, DROPDOWN_TYPE.REGULAR),
        value: text('The value of the selected item (value)', ''),
        triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
          false
        ),
      }),
    },
  },
};
