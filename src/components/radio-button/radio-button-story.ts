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
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';
import './radio-button-skeleton';
import storyDocs from './radio-button-story.mdx';

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]: RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]: RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]: RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

export const defaultStory = ({ parameters }) => {
  const { disabled, labelPosition, orientation, name, value, onChange } = parameters?.props?.['bx-radio-button-group'] ?? {};
  const { hideLabel, labelText } = parameters?.props?.['bx-radio-button'] ?? {};
  return html`
    <bx-radio-button-group
      ?disabled="${disabled}"
      label-position="${ifNonNull(labelPosition)}"
      orientation="${ifNonNull(orientation)}"
      name="${ifNonNull(name)}"
      value="${ifNonNull(value)}"
      @bx-radio-button-group-changed="${onChange}"
    >
      <bx-radio-button ?hide-label="${hideLabel}" label-text="${ifNonNull(labelText)}" value="all"></bx-radio-button>
      <bx-radio-button ?hide-label="${hideLabel}" label-text="${ifNonNull(labelText)}" value="cloudFoundry"></bx-radio-button>
      <bx-radio-button ?hide-label="${hideLabel}" label-text="${ifNonNull(labelText)}" value="staging"></bx-radio-button>
    </bx-radio-button-group>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-radio-button-group': () => ({
        disabled: boolean('Disabled (disabled)', false),
        labelPosition: select('Label position (label-position)', labelPositions, RADIO_BUTTON_LABEL_POSITION.RIGHT),
        orientation: select('Orientation (orientation)', orientations, RADIO_BUTTON_ORIENTATION.HORIZONTAL),
        name: textNullable('Name (name)', 'radio-group'),
        value: textNullable('Value (value)', ''),
        onChange: action('bx-radio-button-group-changed'),
      }),
      'bx-radio-button': () => ({
        hideLabel: boolean('Hide label (hide-label)', false),
        labelText: textNullable('Label text (label-text)', 'Radio button'),
      }),
    },
  },
};

export const skeleton = () =>
  html`
    <bx-radio-button-skeleton></bx-radio-button-skeleton>
  `;

skeleton.story = {
  parameters: {
    percy: {
      skip: true,
    },
  },
};

export default {
  title: 'Components/Radio button',
};
