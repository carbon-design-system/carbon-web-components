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
      <bx-form-item ?invalid="${invalid}" ?disabled="${disabled}">
        <span slot="label">Label text</span>
        <span slot="help-text">Optional helper text</span>
        <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}"></bx-input>
        <span slot="validation">Something isn't right</span>
      </bx-form-item>
    `;
  });
