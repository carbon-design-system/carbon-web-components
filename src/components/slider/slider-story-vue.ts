/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory, withInputBox as baseWithInputBox } from './slider-story';

export { default } from './slider-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-slider
      :disabled="disabled"
      :label-text="labelText"
      :max="max"
      :min="min"
      :name="name"
      :step="step"
      :value="value"
      @bx-slider-changed="onAfterChange"
    ></bx-slider>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-slider']),
});

defaultStory.story = baseDefaultStory.story;

export const withInputBox = ({ parameters }) => ({
  template: `
    <bx-slider
      :disabled="disabled"
      :label-text="labelText"
      :max="max"
      :min="min"
      :name="name"
      :step="step"
      :value="value"
      @bx-slider-changed="onAfterChange"
    >
      <bx-slider-input aria-label="Slider value" type="number"></bx-slider-input>
    </bx-slider>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-slider']),
});

withInputBox.story = baseWithInputBox.story;
