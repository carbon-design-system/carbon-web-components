/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './checkbox-story';

export { default } from './checkbox-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-checkbox
      :checked="checked"
      :disabled="disabled"
      :hide-label="hideLabel"
      :indeterminate="indeterminate"
      :label-text="labelText"
      :name="name"
      :value="value"
      @input="onInput"
    ></bx-checkbox>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-checkbox']),
});

defaultStory.story = baseDefaultStory.story;
