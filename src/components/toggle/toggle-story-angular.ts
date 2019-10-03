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
import './toggle';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  checkedText: text('Text for checked state (checkedText)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  labelText: text('Label text (labelText)', 'Toggle'),
  name: text('Name (name)', ''),
  small: boolean('Use small variant (small)', false),
  uncheckedText: text('Text for unchecked state (uncheckedText)', 'Off'),
  value: text('Value (value)', ''),
  onInput: action('onInput'),
});

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-toggle
        [checked]="checked"
        [checkedText]="checkedText"
        [disabled]="disabled"
        [labelText]="labelText"
        [name]="name"
        [small]="small"
        [uncheckedText]="uncheckedText"
        [value]="value"
        (input)="onInput($event)"
      ></bx-toggle>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
