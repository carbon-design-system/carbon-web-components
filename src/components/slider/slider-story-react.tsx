/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, number, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXSlider from 'carbon-custom-elements/es/components-react/slider/slider';
// @ts-ignore
import BXSliderInput from 'carbon-custom-elements/es/components-react/slider/slider-input';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  labelText: text('Label text (labelText)', 'Slider'),
  name: text('Name (name)', ''),
  max: number('The maximum value (max)', 100),
  min: number('The minimum value (min)', 0),
  step: number('The step (step)', 1),
  value: number('Value (value)', 50),
  onAfterChange: action('onAfterChange'),
});

storiesOf('Slider', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, labelText, max, min, name, step, value, onAfterChange } = createProps();
    return (
      <BXSlider
        disabled={disabled}
        labelText={labelText}
        max={max}
        min={min}
        name={name}
        step={step}
        value={value}
        onAfterChange={onAfterChange}
      />
    );
  })
  .add('With input box', () => {
    const { disabled, labelText, max, min, name, step, value, onAfterChange } = createProps();
    return (
      <BXSlider
        disabled={disabled}
        labelText={labelText}
        max={max}
        min={min}
        name={name}
        step={step}
        value={value}
        onAfterChange={onAfterChange}>
        <BXSliderInput aria-label="Slider value" type="number" />
      </BXSlider>
    );
  });
