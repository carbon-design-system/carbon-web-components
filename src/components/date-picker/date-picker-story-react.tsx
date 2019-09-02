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
import BXDatePicker from 'carbon-custom-elements/es/components-react/date-picker/date-picker';
// @ts-ignore
import BXDatePickerInput from 'carbon-custom-elements/es/components-react/date-picker/date-picker-input';

const createProps = () => ({
  enabledRange: text('Minimum/maximum dates in ISO8601 date format, separated by `/` (enabledRange)', ''),
  open: boolean('Open (open)', false),
  value: text('Value in ISO8601 date format, separated by `/` (value)', ''),
  onAfterChanged: action('onAfterChanged'),
});

const createInputProps = () => ({
  disabled: boolean('Disabled (disabled in <BXDatePickerInput>)', false),
  hideLabel: boolean('Hide label (hideLabel in <BXDatePickerInput>)', false),
  labelText: text('Label text (labelText in <BXDatePickerInput>)', 'Date Picker label'),
  light: boolean('Light variant (light in <BXDatePickerInput>)', false),
  onInput: action('onInput'),
});

storiesOf('Date picker', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open } = createProps();
    const { disabled, hideLabel, labelText, light } = createInputProps();
    return (
      <BXDatePicker open={open}>
        <BXDatePickerInput disabled={disabled} hideLabel={hideLabel} labelText={labelText} light={light} />
      </BXDatePicker>
    );
  })
  .add('Single with calendar', () => {
    const { enabledRange, open, value, onAfterChanged } = createProps();
    const { disabled, hideLabel, labelText, light, onInput } = createInputProps();
    return (
      <BXDatePicker enabledRange={enabledRange} open={open} value={value} onAfterChanged={onAfterChanged}>
        <BXDatePickerInput
          disabled={disabled}
          hideLabel={hideLabel}
          kind="single"
          labelText={labelText}
          light={light}
          onInput={onInput}
        />
      </BXDatePicker>
    );
  })
  .add('Range with calendar', () => {
    const { enabledRange, open, value, onAfterChanged } = createProps();
    const { disabled, hideLabel, labelText, light, onInput } = createInputProps();
    return (
      <BXDatePicker enabledRange={enabledRange} open={open} value={value} onAfterChanged={onAfterChanged}>
        <BXDatePickerInput
          disabled={disabled}
          hideLabel={hideLabel}
          kind="from"
          labelText={labelText}
          light={light}
          onInput={onInput}
        />
        <BXDatePickerInput
          disabled={disabled}
          hideLabel={hideLabel}
          kind="to"
          labelText={labelText}
          light={light}
          onInput={onInput}
        />
      </BXDatePicker>
    );
  });
