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
import './number-input';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './number-input-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return html`
    <bx-number-input
      ?disabled="${disabled}"
      value="${value}"
      placeholder="${placeholder}"
      ?invalid="${invalid}"
      ?mobile="${mobile}"
      min="${min}"
      max="${max}"
      step="${step}"
      light="${light}"
      @input="${onInput}"
    ></bx-number-input>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export const formItem = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return html`
    <bx-form-item>
      <bx-number-input
        value="${value}"
        placeholder="${placeholder}"
        ?invalid="${invalid}"
        ?disabled="${disabled}"
        ?mobile="${mobile}"
        min="${min}"
        max="${max}"
        step="${step}"
        ?light="${light}"
        @input="${onInput}"
      >
        <span slot="label-text">Label text</span>
        <span slot="helper-text">Optional helper text</span>
        <span slot="validity-message">Something isn't right</span>
      </bx-number-input>
    </bx-form-item>
  `;
};

formItem.story = {
  name: 'Form item',
};

export const withoutFormItemWrapper = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, mobile, min, max, step, light, onInput } = parameters?.props?.[
    'bx-number-input'
  ];
  return html`
    <bx-number-input
      value="${value}"
      placeholder="${placeholder}"
      ?invalid="${invalid}"
      ?disabled="${disabled}"
      ?mobile="${mobile}"
      min="${min}"
      max="${max}"
      step="${step}"
      light="${light}"
      @input="${onInput}"
    >
      <span slot="label-text">Label text</span>
      <span slot="helper-text">Optional helper text</span>
      <span slot="validity-message">Something isn't right</span>
    </bx-number-input>
  `;
};

withoutFormItemWrapper.story = {
  name: 'Without form item wrapper',
};

export default {
  title: 'Number Input',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-number-input': () => createProps(knobs),
    },
  },
};
