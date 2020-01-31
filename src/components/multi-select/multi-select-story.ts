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
import { DROPDOWN_TYPE } from '../dropdown/dropdown';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './multi-select';
import './multi-select-item';
import storyDocs from './multi-select-story.mdx';

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: null,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

export const defaultStory = ({ parameters }) => {
  const {
    clearSelectionLabel,
    disabled,
    helperText,
    invalid,
    labelText,
    light,
    open,
    toggleLabelClosed,
    toggleLabelOpen,
    triggerContent,
    type,
    validityMessage,
    value,
    disableSelection,
    onBeforeSelect,
    onSelect,
  } = parameters?.props?.['bx-multi-select'] ?? {};
  const handleBeforeSelected = (event: CustomEvent) => {
    if (onBeforeSelect) {
      onBeforeSelect(event);
    }
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-multi-select
      ?disabled=${disabled}
      ?invalid=${invalid}
      ?light=${light}
      ?open=${open}
      clear-selection-label=${ifNonNull(clearSelectionLabel)}
      helper-text=${ifNonNull(helperText)}
      label-text=${ifNonNull(labelText)}
      toggle-label-closed=${ifNonNull(toggleLabelClosed)}
      toggle-label-open=${ifNonNull(toggleLabelOpen)}
      trigger-content=${ifNonNull(triggerContent)}
      type=${ifNonNull(type)}
      validity-message=${ifNonNull(validityMessage)}
      value="${ifNonNull(value)}"
      @bx-multi-select-beingselected=${handleBeforeSelected}
      @bx-multi-select-selected=${onSelect}
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Multi select',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-multi-select': () => ({
        clearSelectionLabel: textNullable('a11y label for the icon to clear selection (clear-selection-label)', ''),
        disabled: boolean('Disabled (disabled)', false),
        helperText: textNullable('Helper text (helper-text)', 'Optional helper text'),
        invalid: boolean('Show invalid state  (invalid)', false),
        labelText: textNullable('Label text (label-text)', 'Multiselect title'),
        light: boolean('Light variant (light)', false),
        open: boolean('Open (open)', false),
        toggleLabelClosed: textNullable('a11y label for the UI indicating the closed state (toggle-label-closed)', ''),
        toggleLabelOpen: textNullable('a11y label for the UI indicating the closed state (toggle-label-open)', ''),
        triggerContent: textNullable('The default content of the trigger button (trigger-content)', 'Select items'),
        type: select('UI type (type)', types, null),
        validityMessage: textNullable('The validity message (validity-message)', ''),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-multi-select-beingselected event)',
          false
        ),
        onBeforeSelect: action('bx-multi-select-beingselected'),
        onSelect: action('bx-multi-select-selected'),
      }),
    },
  },
};
