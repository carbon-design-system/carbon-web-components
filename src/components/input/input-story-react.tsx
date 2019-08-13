import React from 'react';
import { storiesOf } from '@storybook/react';
import * as knobs from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import './input';
import '../form/form-item';
import { createProps } from './stories/helpers';

const BXInput = createReactCustomElementType('bx-input', {
  disabled: {
    serialize: booleanSerializer
  },
  invalid: {
    serialize: booleanSerializer
  }
});
const BXFormItem = createReactCustomElementType('bx-form-item', {
  disabled: {
    serialize: booleanSerializer
  },
  invalid: {
    serialize: booleanSerializer
  }
});

storiesOf('Input', module)
  .addDecorator(knobs.withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return <BXInput disabled={disabled} invalid={invalid} type={type} value={value} placeholder={placeholder} onInput={onInput} />;
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return (
      <BXFormItem disabled={disabled} invalid={invalid}>
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <BXInput type={type} value={value} placeholder={placeholder} onInput={onInput} />
        <span slot="validation">Something isn't right</span>
      </BXFormItem>
    );
  });
