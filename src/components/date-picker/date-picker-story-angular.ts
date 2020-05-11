/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  defaultStory as baseDefaultStory,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSimple as baseSkeletonSimple,
  skeletonSingle as baseSkeletonSingle,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export const defaultStory = ({ parameters }) => ({
  template: `
  <bx-date-picker [open]="open">
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [sizeHorizontal]="sizeHorizontal"
      [validityMessage]="validityMessage"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...parameters?.props?.['bx-date-picker'],
    ...parameters?.props?.['bx-date-picker-input'],
  },
});

defaultStory.story = baseDefaultStory.story;

export const singleWithCalendar = ({ parameters }) => ({
  template: `
  <bx-date-picker
    [dateFormat]="dateFormat"
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="single"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...parameters?.props?.['bx-date-picker'],
    ...parameters?.props?.['bx-date-picker-input'],
  },
});

singleWithCalendar.story = baseSingleWithCalendar.story;

export const rangeWithCalendar = ({ parameters }) => ({
  template: `
  <bx-date-picker
    [dateFormat]="dateFormat"
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="from"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
    <bx-date-picker-input
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [invalid]="invalid"
      kind="to"
      [labelText]="labelText"
      [placeholder]="placeholder"
      [size]="size"
      [validityMessage]="validityMessage"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
  </bx-date-picker>
`,
  props: {
    ...parameters?.props?.['bx-date-picker'],
    ...parameters?.props?.['bx-date-picker-input'],
  },
});

rangeWithCalendar.story = baseRangeWithCalendar.story;

export const skeletonSimple = () => ({
  template: `<bx-date-picker-input-skeleton></bx-date-picker-input-skeleton>`,
});

skeletonSimple.story = baseSkeletonSimple.story;

export const skeletonSingle = () => ({
  template: `<bx-date-picker-input-skeleton kind="single"></bx-date-picker-input-skeleton>`,
});

skeletonSingle.story = baseSkeletonSingle.story;

export const skeletonRange = () => ({
  template: `
    <bx-date-picker-input-skeleton kind="from"></bx-date-picker-input-skeleton>
    <bx-date-picker-input-skeleton kind="to"></bx-date-picker-input-skeleton>
  `,
});

skeletonRange.story = {
  ...baseSkeletonRange.story,
  decorators: [
    story => {
      const { template, ...rest } = story();
      return {
        ...rest,
        template: `<div>${template}</div>`,
      };
    },
  ],
};

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
