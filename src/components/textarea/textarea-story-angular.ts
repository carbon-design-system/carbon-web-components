/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, {
  defaultStory as baseDefaultStory,
  formItem as baseFormItem,
  withoutFormItemWrapper as baseWithoutFormItemWrapper,
} from './textarea-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-textarea
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [value]="value"
      [placeholder]="placeholder"
      [invalid]="invalid"
      (input)="onInput()"
    ></bx-textarea>
  `,
  props: parameters?.props?.['bx-textarea'],
});

defaultStory.story = baseDefaultStory.story;

export const formItem = ({ parameters }) => ({
  template: `
    <bx-form-item>
      <bx-textarea
        [value]="value"
        [colorScheme]="colorScheme"
        [placeholder]="placeholder"
        (input)="onInput()"
        [invalid]="invalid"
        [disabled]="disabled"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-textarea>
    </bx-form-item>
  `,
  props: parameters?.props?.['bx-textarea'],
});

formItem.story = baseFormItem.story;

export const withoutFormItemWrapper = ({ parameters }) => ({
  template: `
    <bx-textarea
      [value]="value"
      [colorScheme]="colorScheme"
      [placeholder]="placeholder"
      (input)="onInput()"
      [invalid]="invalid"
      [disabled]="disabled"
    >
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-textarea>
  `,
  props: parameters?.props?.['bx-textarea'],
});

withoutFormItemWrapper.story = baseWithoutFormItemWrapper.story;

export const skeleton = () => ({
  template: `<bx-textarea-skeleton></bx-textarea-skeleton>`,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
