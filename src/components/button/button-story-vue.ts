/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './button-story';

export { default } from './button-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-btn :kind="kind" :disabled="disabled" :small="small" :href="href" @click="onClick">Button</bx-btn>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-btn']),
});

defaultStory.story = baseDefaultStory.story;
