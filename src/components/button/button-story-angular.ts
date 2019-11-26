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
import baseStory, { defaultStory as baseDefaultStory } from './button-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-btn [kind]="kind" [disabled]="disabled" [small]="small" [href]="href" (click)="onClick($event)">Button</bx-btn>
  `,
  props: parameters?.props?.['bx-btn'],
});

defaultStory.story = baseDefaultStory.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
