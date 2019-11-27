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
import baseStory, { defaultStory as baseDefaultStory } from './radio-button-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-radio-button-group
      [disabled]="disabled"
      [labelPosition]="labelPosition"
      [orientation]="orientation"
      [name]="name"
      [value]="value"
      (bx-radio-button-group-changed)="onAfterChange($event)"
    >
      <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="all"></bx-radio-button>
      <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="cloudFoundry"></bx-radio-button>
      <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="staging"></bx-radio-button>
    </bx-radio-button-group>
  `,
  props: {
    ...parameters?.props?.['bx-radio-button-group'],
    ...parameters?.props?.['bx-radio-button'],
  },
});

defaultStory.story = baseDefaultStory.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
