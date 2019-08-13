import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './input';
import '../form/form-item';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  value: text('Input value (value)', ''),
  placeholder: text('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
});

storiesOf('Input', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, onInput } = createProps();
    return html`
      <bx-input
        ?disabled=${disabled}
        value="${value}"
        placeholder="${placeholder}"
        ?invalid="${invalid}"
        @input="${onInput}"
      ></bx-input>
    `;
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, onInput } = createProps();
    return html`
      <bx-form-item ?invalid="${invalid}">
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <bx-input ?disabled=${disabled} value="${value}" placeholder="${placeholder}" @input="${onInput}"></bx-input>
        <span slot="validation">Something isn't right</span>
      </bx-form-item>
    `;
  });
