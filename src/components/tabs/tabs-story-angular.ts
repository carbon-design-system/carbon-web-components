/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import './tabs';
import './tab';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  triggerContent: text('The default content of the trigger button for narrow screen (trigger-content)', 'Select an item'),
  value: text('The value of the selected item (value)', 'staging'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
    false
  ),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-tabs
        [disabled]="disabled"
        [triggerContent]="triggerContent"
        [value]="value"
        (bx-tabs-beingselected)="onBeforeSelect($event)"
        (bx-tabs-selected)="onSelect($event)"
      >
        <bx-tab id="tab-all" target="panel-all" value="all">Option 1</bx-tab>
        <bx-tab id="tab-cloudFoundry" target="panel-cloudFoundry" disabled value="cloudFoundry">Option 2</bx-tab>
        <bx-tab id="tab-staging" target="panel-staging" value="staging">Option 3</bx-tab>
        <bx-tab id="tab-dea" target="panel-dea" value="dea">Option 4</bx-tab>
        <bx-tab id="tab-router" target="panel-router" value="router">Option 5</bx-tab>
      </bx-tabs>
      <!-- TODO: Figure out how to style the tab panels demo -->
    `,
    props: (({ disableSelection, ...rest }) => {
      const beforeSelectedAction = action('bx-tabs-beingselected');
      const onBeforeSelect = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableSelection) {
          event.preventDefault();
        }
      };
      return {
        ...rest,
        onBeforeSelect,
        onSelect: action('bx-tabs-selected'),
      };
    })(createProps()),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
