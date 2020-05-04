/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import {
  defaultStory as baseDefaultStory,
  singleWithCalendar as baseSingleWithCalendar,
  rangeWithCalendar as baseRangeWithCalendar,
  skeletonSingle as baseSkeletonSingle,
  skeletonSimple as baseSkeletonSimple,
  skeletonRange as baseSkeletonRange,
} from './date-picker-story';

export { default } from './date-picker-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-date-picker>
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :disabled="disabled"
        :hide-label="hideLabel"
        :invalid="invalid"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :size-horizontal="sizeHorizontal"
        :validity-message="validityMessage"
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
      @bx-date-picker-changed="onChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :disabled="disabled"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="single"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
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
      @bx-date-picker-changed="onChanged"
      @bx-date-picker-flatpickr-error="onFlatpickrError"
    >
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :disabled="disabled"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="from"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
        @input="onInput"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        :color-scheme="colorScheme"
        :disabled="disabled"
        :hide-label="hideLabel"
        :invalid="invalid"
        kind="to"
        :label-text="labelText"
        :light="light"
        :placeholder="placeholder"
        :size="size"
        :validity-message="validityMessage"
        @input="onInput"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-date-picker'], ...parameters?.props?.['bx-date-picker-input'] }),
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
    {
      template: `<div><story/></div>`,
    },
  ],
};
