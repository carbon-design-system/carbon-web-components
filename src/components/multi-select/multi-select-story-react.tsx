/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXMultiSelect from 'carbon-custom-elements/es/components-react/multi-select/multi-select';
// @ts-ignore
import BXMultiSelectItem from 'carbon-custom-elements/es/components-react/multi-select/multi-select-item';
import { DROPDOWN_TYPE } from '../dropdown/dropdown';

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: DROPDOWN_TYPE.REGULAR,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const createProps = () => ({
  clearSelectionLabel: text('a11y label for the icon to clear selection (clearSelectionLabel)', ''),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', 'This is not helper text'),
  labelText: text('Label text (label-text)', 'Multiselect title'),
  invalid: boolean('Show invalid state (invalid)', false),
  light: boolean('Light variant (light)', false),
  open: boolean('Open (open)', false),
  toggleLabelClosed: text('a11y label for the UI indicating the closed state (toggleLabelClosed)', ''),
  toggleLabelOpen: text('a11y label for the UI indicating the closed state (toggleLabelOpen)', ''),
  triggerContent: text('The default content of the trigger button (triggerContent)', 'Select items'),
  type: select('UI type (type)', types, DROPDOWN_TYPE.REGULAR),
  validityMessage: text('The validity message (validityMessage)', ''),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in onBeforeSelect event)',
    false
  ),
});

storiesOf('Multi select', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
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
      disableSelection,
    } = createProps();
    const beforeSelectedAction = action('onBeforeSelect');
    const handleBeforeSelect = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return (
      <BXMultiSelect
        disabled={disabled}
        invalid={invalid}
        light={light}
        open={open}
        clearSelectionLabel={clearSelectionLabel}
        helperText={helperText}
        labelText={labelText}
        toggleLabelClosed={toggleLabelClosed}
        toggleLabelOpen={toggleLabelOpen}
        triggerContent={triggerContent}
        type={type}
        validityMessage={validityMessage}
        onBeforeSelect={handleBeforeSelect}
        onAfterSelect={action('onAfterSelect')}>
        <BXMultiSelectItem value="all">Option 1</BXMultiSelectItem>
        <BXMultiSelectItem value="cloudFoundry">Option 2</BXMultiSelectItem>
        <BXMultiSelectItem value="staging">Option 3</BXMultiSelectItem>
        <BXMultiSelectItem value="dea">Option 4</BXMultiSelectItem>
        <BXMultiSelectItem value="router">Option 5</BXMultiSelectItem>
      </BXMultiSelect>
    );
  });
