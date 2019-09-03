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
import './checkbox';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hide-label)', false),
  indeterminate: boolean('Indeterminate state (indeterminate)', false),
  labelText: text('Label text (label-text)', 'Checkbox'),
  name: text('Name (name)', ''),
  value: text('Value (value)', ''),
  onInput: action('onInput'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-checkbox
        [checked]="checked"
        [disabled]="disabled"
        [hideLabel]="hideLabel"
        [indeterminate]="indeterminate"
        [labelText]="labelText"
        [name]="name"
        [value]="value"
        (input)="onInput($event)"
      ></bx-checkbox>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
