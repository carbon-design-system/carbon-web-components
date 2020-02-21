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
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './textarea-story';

export { default } from './textarea-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-textarea
      :disabled="disabled"
      :value="value"
      :placeholder="placeholder"
      :invalid="invalid"
      @input="onInput"
    ></bx-textarea>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-textarea']),
});

defaultStory.story = baseDefaultStory.story;

export const formItem = ({ parameters }) => ({
  template: `
    <bx-form-item>
      <bx-textarea :value="value" :placeholder="placeholder" @input="onInput" :invalid="invalid" :disabled="disabled">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-textarea>
    </bx-form-item>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-textarea']),
});

formItem.story = baseFormItem.story;

export const withoutFormItemWrapper = ({ parameters }) => ({
  template: `
    <bx-textarea :value="value" :placeholder="placeholder" @input="onInput" :invalid="invalid" :disabled="disabled">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-textarea>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-textarea']),
});

withoutFormItemWrapper.story = baseWithoutFormItemWrapper.story;

export const skeleton = () => ({
  template: `<bx-textarea-skeleton></bx-textarea-skeleton>`,
});
