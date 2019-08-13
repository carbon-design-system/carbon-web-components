import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs';
import './input';
import '../form/form-item';
import { INPUT_TYPE } from './input';

const inputTypes = {};

for (const [key, value] of Object.entries(INPUT_TYPE)) {
  inputTypes[key.toLowerCase()] = value;
}

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  value: text('Input value (value)', ''),
  placeholder: text('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  type: select('Input type (type)', inputTypes, INPUT_TYPE.TEXT)
});

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps();
    return html`
      <bx-input
        ?disabled=${disabled}
        value="${value}"
        type="${type}"
        placeholder="${placeholder}"
        ?invalid="${invalid}"
        @input="${onInput}"
      ></bx-input>
    `;
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, onInput } = createProps();
    return html`
      <bx-form-item ?invalid="${invalid}" ?disabled="${disabled}">
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}"></bx-input>
        <span slot="validation">Something isn't right</span>
      </bx-form-item>
    `;
  });
