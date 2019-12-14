/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './progress-indicator-story';

export { default } from './progress-indicator-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-progress-indicator
      :vertical="vertical"
    >
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="invalid"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="complete"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
        state="current"
      ></bx-progress-step>
      <bx-progress-step
        disabled
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
      ></bx-progress-step>
      <bx-progress-step
        :icon-label="iconLabel"
        :label-text="labelText"
        :secondary-label-text="secondaryLabelText"
      ></bx-progress-step>
    </bx-progress-indicator>
  `,
  ...createVueBindingsFromProps({ ...parameters?.props?.['bx-progress-indicator'], ...parameters?.props?.['bx-progress-step'] }),
});

defaultStory.story = baseDefaultStory.story;
