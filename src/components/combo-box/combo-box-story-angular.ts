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
import baseStory, { defaultStory as baseDefaultStory } from './combo-box-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-combo-box
      [open]="open"
      [disabled]="disabled"
      [invalid]="invalid"
      [light]="light"
      [helperText]="helperText"
      [labelText]="labelText"
      [validityMessage]="validityMessage"
      [value]="value"
      [triggerContent]="triggerContent"
      (bx-combo-box-beingselected)="onBeforeSelect($event)"
      (bx-combo-box-selected)="onSelect($event)"
    >
      <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
      <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
      <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
      <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
      <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
    </bx-combo-box>
  `,
  props: (({ disableSelection, ...rest }) => {
    const beforeSelectedAction = action('bx-dropdown-beingselected');
    const onBeforeSelect = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      onBeforeSelect,
      onSelect: action('bx-dropdown-selected'),
    };
  })(parameters?.props['bx-combo-box']),
});

defaultStory.story = baseDefaultStory.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
