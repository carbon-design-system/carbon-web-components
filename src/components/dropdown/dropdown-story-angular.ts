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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './dropdown';
import './dropdown-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', ''),
  labelText: text('Label text (label-text)', ''),
  light: boolean('Light variant (light)', false),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
    false
  ),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-dropdown
        [open]="open"
        [disabled]="disabled"
        [light]="light"
        [helperText]="helperText"
        [labelText]="labelText"
        [value]="value"
        [triggerContent]="triggerContent"
        (bx-dropdown-beingselected)="onBeforeSelect($event)"
        (bx-dropdown-selected)="onSelect($event)"
      >
        <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
        <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
        <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
        <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
        <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
      </bx-dropdown>
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
    })(createProps()),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
