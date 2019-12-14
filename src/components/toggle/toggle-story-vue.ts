/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './toggle-story';

export { default } from './toggle-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-toggle
      :checked="checked"
      :checked-text="checkedText"
      :disabled="disabled"
      :label-text="labelText"
      :name="name"
      :small="small"
      :unchecked-text="uncheckedText"
      :value="value"
      @input="onInput"
    ></bx-toggle>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-toggle']),
});

defaultStory.story = baseDefaultStory.story;
