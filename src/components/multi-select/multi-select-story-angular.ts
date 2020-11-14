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
import baseStory, { Default as baseDefault } from './multi-select-story';

export const Default = args => ({
  template: `
    <bx-multi-select
      [colorScheme]="colorScheme"
      [disabled]="disabled"
      [invalid]="invalid"
      [open]="open"
      [clearSelectionLabel]="clearSelectionLabel"
      [helperText]="helperText"
      [labelText]="labelText"
      [toggleLabelClosed]="toggleLabelClosed"
      [toggleLabelOpen]="toggleLabelOpen"
      [size]="size"
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
  props: (({ disableSelection, onBeforeSelect, onSelect, ...rest }) => ({
    ...rest,
    handleBeforeSelected: (event: CustomEvent) => {
      onBeforeSelect(event);
      if (disableSelection) {
        event.preventDefault();
      }
    },
    handleSelected: onSelect,
  }))(args?.['bx-multi-select']),
});

Object.assign(Default, baseDefault);

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
