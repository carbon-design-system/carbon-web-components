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
import './textarea';
import '../form/form-item';
import createProps from './stories/helpers';
import storyDocs from './textarea-story.mdx';

export const defaultStory = () => {
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
};

defaultStory.story = {
  name: 'Default',
};

export const formItem = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, onInput, rows, cols } = parameters?.props?.['bx-textarea'];
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
};

formItem.story = {
  name: 'Form item',
};

export const withoutFormItemWrapper = ({ parameters }) => {
  const { disabled, value, placeholder, invalid, onInput, rows, cols } = parameters?.props?.['bx-textarea'];
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
};

withoutFormItemWrapper.story = {
  name: 'Without form item wrapper',
};

export default {
  title: 'Textarea',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-textarea': () => createProps(knobs),
    },
  },
};
