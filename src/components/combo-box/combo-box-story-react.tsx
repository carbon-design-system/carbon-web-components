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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXComboBox from 'carbon-custom-elements/es/components-react/combo-box/combo-box';
// @ts-ignore
import BXComboBoxItem from 'carbon-custom-elements/es/components-react/combo-box/combo-box-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helperText)', ''),
  invalid: boolean('Show invalid state (invalid)', false),
  labelText: text('Label text (labelText)', ''),
  light: boolean('Light variant (light)', false),
  validityMessage: text('The validity message (validityMessage)', ''),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The placeholder content (triggerContent)', 'Filter...'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in onBeforeSelect event)',
    false
  ),
});

storiesOf('Combo box', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const {
      open,
      disabled,
      helperText,
      invalid,
      labelText,
      light,
      validityMessage,
      value,
      triggerContent,
      disableSelection,
    } = createProps();
    const beforeSelectedAction = action('onBeforeSelect');
    const handleBeforeSelected = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return (
      <BXComboBox
        open={open}
        disabled={disabled}
        invalid={invalid}
        light={light}
        helperText={helperText}
        labelText={labelText}
        validityMessage={validityMessage}
        value={value}
        triggerContent={triggerContent}
        onBeforeSelect={handleBeforeSelected}
        onAfterSelect={action('onAfterSelect')}>
        <BXComboBoxItem value="all">Option 1</BXComboBoxItem>
        <BXComboBoxItem value="cloudFoundry">Option 2</BXComboBoxItem>
        <BXComboBoxItem value="staging">Option 3</BXComboBoxItem>
        <BXComboBoxItem value="dea">Option 4</BXComboBoxItem>
        <BXComboBoxItem value="router">Option 5</BXComboBoxItem>
      </BXComboBox>
    );
  });
