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
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs/angular';
import './slider';
import './slider-input';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  labelText: text('Label text (labelText)', 'Slider'),
  name: text('Name (name)', ''),
  max: number('The maximum value (max)', 100),
  min: number('The minimum value (min)', 0),
  step: number('The step (step)', 1),
  value: number('Value (value)', 50),
  onAfterChange: action('bx-slider-changed'),
});

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-slider
        [disabled]="disabled"
        [labelText]="labelText"
        [max]="max"
        [min]="min"
        [name]="name"
        [step]="step"
        [value]="value"
        (bx-slider-changed)="onAfterChange($event)"
      ></bx-slider>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }))
  .add('With input box', () => ({
    template: `
      <bx-slider
        [disabled]="disabled"
        [labelText]="labelText"
        [max]="max"
        [min]="min"
        [name]="name"
        [step]="step"
        [value]="value"
        (bx-slider-changed)="onAfterChange($event)"
      >
        <bx-slider-input aria-label="Slider value" type="number"></bx-slider-input>
      </bx-slider>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
