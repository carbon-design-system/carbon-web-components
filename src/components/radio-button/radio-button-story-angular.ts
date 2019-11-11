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
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/angular';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]: RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]: RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]: RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

const createGroupProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  labelPosition: select('Label position (labelPosition)', labelPositions, RADIO_BUTTON_LABEL_POSITION.RIGHT),
  orientation: select('Orientation (orientation)', orientations, RADIO_BUTTON_ORIENTATION.HORIZONTAL),
  name: text('Name (name)', 'radio-group'),
  value: text('Value (value)', ''),
  onAfterChange: action('bx-radio-button-group-changed'),
});

const createProps = () => ({
  hideLabel: boolean('Hide label (hideLabel)', false),
  labelText: text('Label text (labelText)', 'Radio button'),
});

storiesOf('Radio button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-radio-button-group
        [disabled]="disabled"
        [labelPosition]="labelPosition"
        [orientation]="orientation"
        [name]="name"
        [value]="value"
        (bx-radio-button-group-changed)="onAfterChange($event)"
      >
        <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="all"></bx-radio-button>
        <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="cloudFoundry"></bx-radio-button>
        <bx-radio-button [hideLabel]="hideLabel" [labelText]="labelText" value="staging"></bx-radio-button>
      </bx-radio-button-group>
    `,
    props: { ...createGroupProps(), ...createProps() },
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
