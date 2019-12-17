/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './date-picker';
import './date-picker-input';

export const defaultStory = ({ parameters }) => {
  const { disabled, hideLabel, invalid, labelText, light, placeholder, validityMessage } = parameters?.props?.[
    'bx-date-picker-input'
  ];
  return html`
    <bx-date-picker>
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
        validity-message="${validityMessage}"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    docs: {
      storyDescription: 'A simple Date Picker consists of an input field and no calendar.',
    },
  },
};

export const singleWithCalendar = ({ parameters }) => {
  const { dateFormat, enabledRange, open, value, onAfterChanged, onFlatpickrError } = parameters?.props?.['bx-date-picker'];
  const { disabled, hideLabel, invalid, labelText, light, placeholder, validityMessage, onInput } = parameters?.props?.[
    'bx-date-picker-input'
  ];
  return html`
    <bx-date-picker
      date-format="${dateFormat}"
      enabled-range="${enabledRange}"
      ?open="${open}"
      value="${value}"
      @bx-date-picker-changed="${onAfterChanged}"
      @bx-date-picker-flatpickr-error="${onFlatpickrError}"
    >
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="single"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
        validity-message="${validityMessage}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `;
};

singleWithCalendar.story = {
  name: 'Single with calendar',
  parameters: {
    docs: {
      storyDescription: 'A single Date Picker consists of an input field and a calendar.',
    },
    knobs: {
      'bx-date-picker': () => ({
        dateFormat: text('The date format (date-format)', 'm/d/Y'),
        enabledRange: text('Minimum/maximum dates in ISO8601 date format, separated by `/` (enabled-range)', ''),
        open: boolean('Open (open)', false),
        value: text('Value in ISO8601 date format, separated by `/` (value)', ''),
        onAfterChanged: action('bx-date-picker-changed'),
        onFlatpickrError: action('bx-date-picker-flatpickr-error'),
      }),
    },
  },
};

export const rangeWithCalendar = ({ parameters }) => {
  const { dateFormat, enabledRange, open, value, onAfterChanged, onFlatpickrError } = parameters?.props?.['bx-date-picker'];
  const { disabled, hideLabel, invalid, labelText, light, placeholder, validityMessage, onInput } = parameters?.props?.[
    'bx-date-picker-input'
  ];
  return html`
    <bx-date-picker
      date-format="${dateFormat}"
      enabled-range="${enabledRange}"
      ?open="${open}"
      value="${value}"
      @bx-date-picker-changed="${onAfterChanged}"
      @bx-date-picker-flatpickr-error="${onFlatpickrError}"
    >
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="from"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
        validity-message="${validityMessage}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?invalid="${invalid}"
        kind="to"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
        validity-message="${validityMessage}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
    </bx-date-picker>
  `;
};

rangeWithCalendar.story = {
  name: 'Range with calendar',
  parameters: {
    docs: {
      storyDescription: 'A range Date Picker consists of two input fields and a calendar.',
    },
    knobs: singleWithCalendar.story.parameters.knobs,
  },
};

export default {
  title: 'Date picker',
  parameters: {
    knobs: {
      'bx-date-picker-input': () => ({
        disabled: boolean('Disabled (disabled in <bx-date-picker-input>)', false),
        hideLabel: boolean('Hide label (hide-label in <bx-date-picker-input>)', false),
        invalid: boolean('Show invalid state  (invalid)', false),
        labelText: text('Label text (label-text in <bx-date-picker-input>)', 'Date Picker label'),
        light: boolean('Light variant (light in <bx-date-picker-input>)', false),
        placeholder: text('Placeholder text (placeholder in <bx-date-picker-input>)', 'mm/dd/yyyy'),
        validityMessage: text('The validity message (validity-message)', ''),
        onInput: action('input'),
      }),
    },
  },
};
