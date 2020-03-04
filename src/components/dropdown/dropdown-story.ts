/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { DROPDOWN_TYPE } from './dropdown';
import './dropdown-item';
import './dropdown-skeleton';
import storyDocs from './dropdown-story.mdx';

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const defaultStory = ({ parameters }) => {
  const {
    open,
    disabled,
    helperText,
    labelText,
    light,
    type,
    value,
    triggerContent,
    disableSelection,
    onBeforeSelect,
    onSelect,
  } = parameters?.props?.['bx-dropdown'] ?? {};
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
      type="${ifNonNull(type)}"
      value=${ifNonNull(value)}
      trigger-content=${ifNonNull(triggerContent)}
      @bx-dropdown-beingselected=${handleBeforeSelected}
      @bx-dropdown-selected=${onSelect}
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
  parameters: {
    knobs: {
      'bx-dropdown': () => ({
        open: boolean('Open (open)', false),
        disabled: boolean('Disabled (disabled)', false),
        helperText: textNullable('Helper text (helper-text)', 'Optional helper text'),
        labelText: textNullable('Label text (label-text)', 'Dropdown title'),
        light: boolean('Light variant (light)', false),
        type: select('Dropdown type (type)', types, null),
        value: textNullable('The value of the selected item (value)', ''),
        triggerContent: textNullable('The default content of the trigger button (trigger-content)', 'Select an item'),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
          false
        ),
        onBeforeSelect: action('bx-dropdown-beingselected'),
        onSelect: action('bx-dropdown-selected'),
      }),
    },
  },
};

export const skeleton = () =>
  html`
    <bx-dropdown-skeleton></bx-dropdown-skeleton>
  `;

export default {
  title: 'Components/Dropdown',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};
