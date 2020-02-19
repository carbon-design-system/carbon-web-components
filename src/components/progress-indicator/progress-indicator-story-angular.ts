/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { defaultStory as baseDefaultStory } from './progress-indicator-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-progress-indicator
      [vertical]="vertical"
    >
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="invalid"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="complete"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
        state="current"
      ></bx-progress-step>
      <bx-progress-step
        disabled
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
      ></bx-progress-step>
      <bx-progress-step
        [iconLabel]="iconLabel"
        [labelText]="labelText"
        [secondaryLabelText]="secondaryLabelText"
      ></bx-progress-step>
    </bx-progress-indicator>
  `,
  props: { ...parameters?.props?.['bx-progress-indicator'], ...parameters?.props?.['bx-progress-step'] },
});

defaultStory.story = baseDefaultStory.story;

export const skeleton = ({ parameters }) => ({
  template: `
    <bx-progress-indicator-skeleton [vertical]="vertical">
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
      <bx-progress-step-skeleton></bx-progress-step-skeleton>
    </bx-progress-indicator-skeleton>
  `,
  props: parameters?.props?.['bx-progress-indicator-skeleton'],
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
