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
import baseStory, { Default as baseDefault } from './dropdown-story';

export const Default = args => ({
  template: `
    <bx-dropdown
      [open]="open"
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [helperText]="helperText"
      [labelText]="labelText"
      [size]="size"
      [value]="value"
      [triggerContent]="triggerContent"
      (bx-dropdown-beingselected)="handleBeforeSelect($event)"
      (bx-dropdown-selected)="handleAfterSelect($event)"
    >
      <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
      <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
      <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
      <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
      <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
    </bx-dropdown>
  `,
  props: (({ disableSelection, onBeforeSelect, onSelect, ...rest }) => {
    const handleBeforeSelect = (event: CustomEvent) => {
      onBeforeSelect(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return {
      ...rest,
      handleBeforeSelect,
      handleAfterSelect: onSelect,
    };
  })(args?.['bx-dropdown']),
});

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-dropdown-skeleton></bx-dropdown-skeleton>`,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
