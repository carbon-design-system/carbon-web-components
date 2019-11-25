/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXDatePicker from 'carbon-custom-elements/es/components-react/date-picker/date-picker';
// @ts-ignore
import BXDatePickerInput from 'carbon-custom-elements/es/components-react/date-picker/date-picker-input';
import {
  defaultStory as baseDefaultStory,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
} from './date-picker-story';

export { default } from './date-picker-story';

export const defaultStory = ({ parameters }) => {
  const { open } = parameters?.props['bx-date-picker'];
  const { disabled, hideLabel, labelText, light, placeholder } = parameters?.props['bx-date-picker-input'];
  return (
    <BXDatePicker open={open}>
      <BXDatePickerInput
        disabled={disabled}
        hideLabel={hideLabel}
        labelText={labelText}
        light={light}
        placeholder={placeholder}
      />
    </BXDatePicker>
  );
};

defaultStory.story = baseDefaultStory.story;

export const singleWithCalendar = ({ parameters }) => {
  const { enabledRange, open, value, onAfterChanged, onFlatpickrError } = parameters?.props['bx-date-picker'];
  const { disabled, hideLabel, labelText, light, placeholder, onInput } = parameters?.props['bx-date-picker-input'];
  return (
    <BXDatePicker
      enabledRange={enabledRange}
      open={open}
      value={value}
      onAfterChanged={onAfterChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        disabled={disabled}
        hideLabel={hideLabel}
        kind="single"
        labelText={labelText}
        light={light}
        placeholder={placeholder}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

singleWithCalendar.story = baseSingleWithCalendar.story;

export const rangeWithCalendar = ({ parameters }) => {
  const { enabledRange, open, value, onAfterChanged, onFlatpickrError } = parameters?.props['bx-date-picker'];
  const { disabled, hideLabel, labelText, light, placeholder, onInput } = parameters?.props['bx-date-picker-input'];
  return (
    <BXDatePicker
      enabledRange={enabledRange}
      open={open}
      value={value}
      onAfterChanged={onAfterChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        disabled={disabled}
        hideLabel={hideLabel}
        kind="from"
        labelText={labelText}
        light={light}
        placeholder={placeholder}
        onInput={onInput}
      />
      <BXDatePickerInput
        disabled={disabled}
        hideLabel={hideLabel}
        kind="to"
        labelText={labelText}
        light={light}
        placeholder={placeholder}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

rangeWithCalendar.story = baseRangeWithCalendar.story;
