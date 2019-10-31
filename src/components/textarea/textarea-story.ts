/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import * as knobs from '@storybook/addon-knobs';
import './textarea';
import '../form/form-item';
import createProps from './stories/helpers';

storiesOf('Textarea', module)
  .addDecorator(knobs.withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, onInput, rows, cols } = createProps(knobs);
    return html`
      <bx-textarea
        ?disabled="${disabled}"
        value="${value}"
        placeholder="${placeholder}"
        ?invalid="${invalid}"
        @input="${onInput}"
        rows="${rows}"
        cols="${cols}"
      >
      </bx-textarea>
    `;
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, onInput, rows, cols } = createProps(knobs);
    return html`
      <bx-form-item>
        <bx-textarea
          placeholder="${placeholder}"
          @input="${onInput}"
          ?invalid="${invalid}"
          ?disabled="${disabled}"
          value="${value}"
          rows="${rows}"
          cols="${cols}"
        >
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
          ${value}
        </bx-textarea>
      </bx-form-item>
    `;
  })
  .add('Without form item wrapper', () => {
    const { disabled, value, placeholder, invalid, onInput, rows, cols } = createProps(knobs);
    return html`
      <bx-textarea
        placeholder="${placeholder}"
        @input="${onInput}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        value="${value}"
        rows="${rows}"
        cols="${cols}"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
        <span>${value}</span>
      </bx-textarea>
    `;
  });
