import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import './checkbox';

const BXCheckbox = createReactCustomElementType('bx-checkbox', {
  checked: {
    serialize: booleanSerializer,
  },
  disabled: {
    serialize: booleanSerializer,
  },
  hideLabel: {
    attribute: 'hide-label',
    serialize: booleanSerializer,
  },
  indeterminate: {
    serialize: booleanSerializer,
  },
  labelText: {
    attribute: 'label-text',
  },
});

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hideLabel)', false),
  indeterminate: boolean('Indeterminate state (indeterminate)', false),
  labelText: text('Label text (labelText)', 'Checkbox'),
  name: text('Name (name)', ''),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onInput } = createProps();
    return (
      <BXCheckbox
        checked={checked}
        disabled={disabled}
        hideLabel={hideLabel}
        indeterminate={indeterminate}
        labelText={labelText}
        name={name || undefined}
        value={value || undefined}
        onInput={onInput}
      />
    );
  });
