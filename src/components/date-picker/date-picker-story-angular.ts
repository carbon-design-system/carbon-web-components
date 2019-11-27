/**
 * @license
 *
 * Copyright IBM Corp. 2019
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
} from './date-picker-story';

export const defaultStory = ({ parameters }) => ({
  template: `
  <bx-date-picker [open]="open">
    <bx-date-picker-input
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      [labelText]="labelText"
      [light]="light"
      [placeholder]="placeholder"
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
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onAfterChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      kind="single"
      [labelText]="labelText"
      [light]="light"
      [placeholder]="placeholder"
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
    [enabledRange]="enabledRange"
    [open]="open"
    [value]="value"
    (bx-date-picker-changed)="onAfterChanged($event)"
    (bx-date-picker-flatpickr-error)="onFlatpickrError($event)"
  >
    <bx-date-picker-input
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      kind="from"
      [labelText]="labelText"
      [light]="light"
      [placeholder]="placeholder"
      (input)="onInput($event)"
    >
    </bx-date-picker-input>
    <bx-date-picker-input
      [disabled]="disabled"
      [hideLabel]="hideLabel"
      kind="to"
      [labelText]="labelText"
      [light]="light"
      [placeholder]="placeholder"
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

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
