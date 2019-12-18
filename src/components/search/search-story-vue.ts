/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './search-story';

export { default } from './search-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-search
      :close-button-assistive-text="closeButtonAssistiveText"
      :disabled="disabled"
      :light="light"
      :label-text="labelText"
      :name="name"
      :placeholder="placeholder"
      :size="size"
      :type="type"
      :value="value"
      @bx-search-input="onInput"
    ></bx-search>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-search']),
});

defaultStory.story = baseDefaultStory.story;

export const skeleton = () => ({
  template: `<bx-search-skeleton></bx-search-skeleton>`,
});
