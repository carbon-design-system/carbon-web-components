/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import * as knobs from '@storybook/addon-knobs';
import './input';
import '../form/form-item';
import createProps from './stories/helpers';

export const defaultStory = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, type, onInput } =
    (parameters.props && parameters.props['bx-input']) || ({} as typeof parameters.props['bx-input']);
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
};

defaultStory.story = {
  name: 'Default',
};

export const formItem = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, onInput } =
    (parameters.props && parameters.props['bx-input']) || ({} as typeof parameters.props['bx-input']);
  return html`
    <bx-form-item>
      <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}" ?invalid="${invalid}" ?disabled="${disabled}">
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-input>
    </bx-form-item>
  `;
};

formItem.story = {
  name: 'Form item',
};

export const withoutFormItemWrapper = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, onInput } =
    (parameters.props && parameters.props['bx-input']) || ({} as typeof parameters.props['bx-input']);
  return html`
    <bx-input value="${value}" placeholder="${placeholder}" @input="${onInput}" ?invalid="${invalid}" ?disabled="${disabled}">
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-input>
  `;
};

withoutFormItemWrapper.story = {
  name: 'Without form item wrapper',
};

export default {
  title: 'Input',
  parameters: {
    knobs: {
      'bx-input': () => createProps(knobs),
    },
  },
};
