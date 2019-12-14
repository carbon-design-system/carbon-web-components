/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  defaultStory as baseDefaultStory,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
} from './date-picker-story';

export { default } from './date-picker-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-date-picker>
      <bx-date-picker-input
        :disabled="disabled"
        :hide-label="hideLabel"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-date-picker-input'] }),
});

defaultStory.story = baseDefaultStory.story;

export const singleWithCalendar = ({ parameters }) => ({
  template: `
    <bx-date-picker
      :date-format="dateFormat"
      :enabled-range="enabledRange"
      :open="open"
      :value="value"
      @bx-date-picker-changed="onAfterChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :disabled="disabled"
        :hide-label="hideLabel"
        kind="single"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        @input="onInput"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-date-picker'], ...parameters?.props?.['bx-date-picker-input'] }),
});

singleWithCalendar.story = baseSingleWithCalendar.story;

export const rangeWithCalendar = ({ parameters }) => ({
  template: `
    <bx-date-picker
      :date-format="dateFormat"
      :enabled-range="enabledRange"
      :open="open"
      :value="value"
      @bx-date-picker-changed="onAfterChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :disabled="disabled"
        :hide-label="hideLabel"
        kind="from"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        @input="onInput"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        :disabled="disabled"
        :hide-label="hideLabel"
        kind="to"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        @input="onInput"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-date-picker'], ...parameters?.props?.['bx-date-picker-input'] }),
});

rangeWithCalendar.story = baseRangeWithCalendar.story;
