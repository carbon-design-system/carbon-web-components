/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { action } from '@storybook/addon-actions';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { defaultStory as baseDefaultStory } from './multi-select-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-multi-select
      [disabled]="disabled"
      [invalid]="invalid"
      [light]="light"
      [open]="open"
      [clearSelectionLabel]="clearSelectionLabel"
      [helperText]="helperText"
      [labelText]="labelText"
      [toggleLabelClosed]="toggleLabelClosed"
      [toggleLabelOpen]="toggleLabelOpen"
      [triggerContent]="triggerContent"
      [type]="type"
      [validityMessage]="validityMessage"
      (bx-multi-select-beingselected)="handleBeforeSelected($event)"
      (bx-multi-select-selected)="handleSelected($event)"
    >
      <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
      <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
      <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
      <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
      <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
    </bx-multi-select>
  `,
  props: (({ disableSelection, ...rest }) => {
    const beforeSelectedAction = action('bx-multi-select-beingselected');
    return {
      ...rest,
      handleBeforeSelected: (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableSelection) {
          event.preventDefault();
        }
      },
      handleSelected: action('bx-multi-select-selected'),
    };
  })(parameters?.props['bx-multi-select']),
});

defaultStory.story = baseDefaultStory.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
