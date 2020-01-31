/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, number, text } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import './slider';
import './slider-input';
import storyDocs from './slider-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { disabled, labelText, max, min, name, step, value, onChange } = parameters?.props?.['bx-slider'] || {};
  return html`
    <bx-slider
      ?disabled="${disabled}"
      label-text="${ifNonNull(labelText)}"
      max="${ifNonNull(max)}"
      min="${ifNonNull(min)}"
      name="${ifNonNull(name)}"
      step="${ifNonNull(step)}"
      value="${ifNonNull(value)}"
      @bx-slider-changed="${onChange}"
    ></bx-slider>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export const withInputBox = ({ parameters }) => {
  const { disabled, labelText, max, min, name, step, value, onChange } = parameters?.props?.['bx-slider'] || {};
  return html`
    <bx-slider
      ?disabled="${disabled}"
      label-text="${labelText}"
      max="${ifNonNull(max)}"
      min="${ifNonNull(min)}"
      name="${ifNonNull(name)}"
      step="${ifNonNull(step)}"
      value="${ifNonNull(value)}"
      @bx-slider-changed="${onChange}"
    >
      <bx-slider-input aria-label="Slider value" type="number"></bx-slider-input>
    </bx-slider>
  `;
};

withInputBox.story = {
  name: 'With input box',
};

export default {
  title: 'Slider',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-slider': () => ({
        disabled: boolean('Disabled (disabled)', false),
        labelText: text('Label text (label-text)', 'Slider'),
        name: text('Name (name)', ''),
        max: number('The maximum value (max)', 100),
        min: number('The minimum value (min)', 0),
        step: number('The step (step)', 1),
        value: number('Value (value)', 50),
        onChange: action('bx-slider-changed'),
      }),
    },
  },
};
