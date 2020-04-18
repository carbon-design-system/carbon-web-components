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
import baseStory, { defaultStory as baseDefaultStory } from './content-switcher-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-content-switcher
      [value]="value"
      (bx-content-switcher-beingselected)="handleBeforeSelect($event)"
      (bx-content-switcher-selected)="handleAfterSelect($event)"
    >
      <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
      <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
      <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
      <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
      <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
    </bx-content-switcher>
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
  })(parameters?.props?.['bx-content-switcher']),
});

defaultStory.story = baseDefaultStory.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
