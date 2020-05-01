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
import baseStory, { defaultStory as baseDefaultStory } from './tabs-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-tabs
      [triggerContent]="triggerContent"
      [type]="type"
      [value]="value"
      (bx-tabs-beingselected)="handleBeforeSelect($event)"
      (bx-tabs-selected)="handleAfterSelect($event)"
    >
      <bx-tab id="tab-all" target="panel-all" value="all">Option 1</bx-tab>
      <bx-tab id="tab-cloudFoundry" target="panel-cloudFoundry" disabled value="cloudFoundry">Option 2</bx-tab>
      <bx-tab id="tab-staging" target="panel-staging" value="staging">Option 3</bx-tab>
      <bx-tab id="tab-dea" target="panel-dea" value="dea">Option 4</bx-tab>
      <bx-tab id="tab-router" target="panel-router" value="router">Option 5</bx-tab>
    </bx-tabs>
    <!-- TODO: Figure out how to style the tab panels demo -->
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
  })(parameters?.props?.['bx-tabs']),
});

defaultStory.story = baseDefaultStory.story;

export const skeleton = () => ({
  template: `
    <bx-tabs-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
    </bx-tabs-skeleton>
  `,
});

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
