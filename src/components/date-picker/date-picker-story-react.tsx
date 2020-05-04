/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXDatePicker from 'carbon-custom-elements/es/components-react/date-picker/date-picker';
// @ts-ignore
import BXDatePickerInput from 'carbon-custom-elements/es/components-react/date-picker/date-picker-input';
// @ts-ignore
import BXDatePickerInputSkeleton from 'carbon-custom-elements/es/components-react/date-picker/date-picker-input-skeleton';
import {
  defaultStory as baseDefaultStory,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSimple as baseSkeletonSimple,
  skeletonSingle as baseSkeletonSingle,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export { default } from './date-picker-story';

export const defaultStory = ({ parameters }) => {
  const {
    colorScheme,
    disabled,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    sizeHorizontal,
    validityMessage,
  } = parameters?.props?.['bx-date-picker-input'];
  return (
    <BXDatePicker>
      <BXDatePickerInput
        colorScheme={colorScheme}
        disabled={disabled}
        hideLabel={hideLabel}
        invalid={invalid}
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        sizeHorizontal={sizeHorizontal}
        validityMessage={validityMessage}
      />
    </BXDatePicker>
  );
};

defaultStory.story = baseDefaultStory.story;

export const singleWithCalendar = ({ parameters }) => {
  const { dateFormat, enabledRange, open, value, onChanged, onFlatpickrError } = parameters?.props?.['bx-date-picker'];
  const {
    colorScheme,
    disabled,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    validityMessage,
    onInput,
  } = parameters?.props?.['bx-date-picker-input'];
  return (
    <BXDatePicker
      dateFormat={dateFormat}
      enabledRange={enabledRange}
      open={open}
      value={value}
      onChanged={onChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        colorScheme={colorScheme}
        disabled={disabled}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="single"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

singleWithCalendar.story = baseSingleWithCalendar.story;

export const rangeWithCalendar = ({ parameters }) => {
  const { dateFormat, enabledRange, open, value, onChanged, onFlatpickrError } = parameters?.props?.['bx-date-picker'];
  const {
    colorScheme,
    disabled,
    hideLabel,
    invalid,
    labelText,
    placeholder,
    size,
    validityMessage,
    onInput,
  } = parameters?.props?.['bx-date-picker-input'];
  return (
    <BXDatePicker
      dateFormat={dateFormat}
      enabledRange={enabledRange}
      open={open}
      value={value}
      onChanged={onChanged}
      onFlatpickrError={onFlatpickrError}>
      <BXDatePickerInput
        colorScheme={colorScheme}
        disabled={disabled}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="from"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
      <BXDatePickerInput
        colorScheme={colorScheme}
        disabled={disabled}
        hideLabel={hideLabel}
        invalid={invalid}
        kind="to"
        labelText={labelText}
        placeholder={placeholder}
        size={size}
        validityMessage={validityMessage}
        onInput={onInput}
      />
    </BXDatePicker>
  );
};

rangeWithCalendar.story = baseRangeWithCalendar.story;

export const skeletonSimple = () => <BXDatePickerInputSkeleton />;

skeletonSimple.story = baseSkeletonSimple.story;

export const skeletonSingle = () => <BXDatePickerInputSkeleton kind="single" />;

skeletonSingle.story = baseSkeletonSingle.story;

export const skeletonRange = () => (
  <>
    <BXDatePickerInputSkeleton kind="from" />
    <BXDatePickerInputSkeleton kind="to" />
  </>
);

skeletonRange.story = {
  ...baseSkeletonRange.story,
  decorators: [story => <div>{story()}</div>],
};
