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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXToggle from 'carbon-custom-elements/es/components-react/toggle/toggle';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  checkedText: text('Text for checked state (checkedText)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  labelText: text('Label text (labelText)', 'Toggle'),
  name: text('Name (name)', ''),
  small: boolean('Use small variant (small)', false),
  uncheckedText: text('Text for unchecked state (uncheckedText)', 'Off'),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { checked, checkedText, disabled, labelText, name, small, uncheckedText, value, onInput } = createProps();
    return (
      <BXToggle
        checked={checked}
        checkedText={checkedText}
        disabled={disabled}
        labelText={labelText}
        name={name}
        small={small}
        uncheckedText={uncheckedText}
        value={value}
        onInput={onInput}
      />
    );
  });
