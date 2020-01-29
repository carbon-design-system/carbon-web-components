/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './radio-button-story';

export { default } from './radio-button-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-radio-button-group
      :disabled="disabled"
      :label-position="labelPosition"
      :orientation="orientation"
      :name="name"
      :value="value"
      @bx-radio-button-group-changed="onChange"
    >
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="all"></bx-radio-button>
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="cloudFoundry"></bx-radio-button>
      <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="staging"></bx-radio-button>
    </bx-radio-button-group>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-radio-button-group'], ...parameters?.props?.['bx-radio-button'] }),
});

defaultStory.story = baseDefaultStory.story;
