import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import * as knobs from '@storybook/addon-knobs';
import './input';
import '../form/form-item';
import { createProps } from './stories/helpers';

storiesOf('Input', module)
  .addDecorator(knobs.withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return html`
      <bx-input
        ?disabled="${disabled}"
        value="${value}"
        type="${type}"
        placeholder="${placeholder}"
        ?invalid="${invalid}"
        @input="${onInput}"
      ></bx-input>
    `;
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, onInput } = createProps(knobs);
    return html`
      <bx-form-item>
        <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}" ?invalid="${invalid}" ?disabled="${disabled}">
          <span slot="label">Label text</span>
          <span slot="help-text">Optional helper text</span>
          <span slot="validation">Something isn't right</span>
        </bx-input>
      </bx-form-item>
    `;
  })
  .add('Without form item wrapper', () => {
    const { disabled, value, placeholder, invalid, onInput } = createProps(knobs);
    return html`
      <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}" ?invalid="${invalid}" ?disabled="${disabled}">
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <span slot="validation">Something isn't right</span>
      </bx-input>
    `;
  });
