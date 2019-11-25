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
  const { disabled, hideLabel, labelText, light, placeholder } =
    (parameters.props && parameters.props['bx-date-picker-input']) || ({} as typeof parameters.props['bx-date-picker-input']);
  return html`
    <bx-date-picker>
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
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
    knobs: {
      'bx-date-picker': () => ({}),
    },
  },
};

export const singleWithCalendar = ({ parameters }) => {
  const { 'bx-date-picker': datePickerProps, 'bx-date-picker-input': datePickerInputProps } =
    parameters.props || ({} as typeof parameters.props);
  const { enabledRange, open, value, onAfterChanged, onFlatpickrError } = datePickerProps || ({} as typeof datePickerProps);
  const { disabled, hideLabel, labelText, light, placeholder, onInput } =
    datePickerInputProps || ({} as typeof datePickerInputProps);
  return html`
    <bx-date-picker
      enabled-range="${enabledRange}"
      ?open="${open}"
      value="${value}"
      @bx-date-picker-changed="${onAfterChanged}"
      @bx-date-picker-flatpickr-error="${onFlatpickrError}"
    >
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="single"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
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
  },
};

export const rangeWithCalendar = ({ parameters }) => {
  const { 'bx-date-picker': datePickerProps, 'bx-date-picker-input': datePickerInputProps } =
    parameters.props || ({} as typeof parameters.props);
  const { enabledRange, open, value, onAfterChanged, onFlatpickrError } = datePickerProps || ({} as typeof datePickerProps);
  const { disabled, hideLabel, labelText, light, placeholder, onInput } =
    datePickerInputProps || ({} as typeof datePickerInputProps);
  return html`
    <bx-date-picker
      enabled-range="${enabledRange}"
      ?open="${open}"
      value="${value}"
      @bx-date-picker-changed="${onAfterChanged}"
      @bx-date-picker-flatpickr-error="${onFlatpickrError}"
    >
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="from"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
        @input="${onInput}"
      >
      </bx-date-picker-input>
      <bx-date-picker-input
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        kind="to"
        label-text="${labelText}"
        ?light="${light}"
        placeholder="${placeholder}"
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
  },
};

export default {
  title: 'Date picker',
  parameters: {
    knobs: {
      'bx-date-picker': () => ({
        enabledRange: text('Minimum/maximum dates in ISO8601 date format, separated by `/` (enabled-range)', ''),
        open: boolean('Open (open)', false),
        value: text('Value in ISO8601 date format, separated by `/` (value)', ''),
        onAfterChanged: action('bx-date-picker-changed'),
        onFlatpickrError: action('bx-date-picker-flatpickr-error'),
      }),
      'bx-date-picker-input': () => ({
        disabled: boolean('Disabled (disabled in <bx-date-picker-input>)', false),
        hideLabel: boolean('Hide label (hide-label in <bx-date-picker-input>)', false),
        labelText: text('Label text (label-text in <bx-date-picker-input>)', 'Date Picker label'),
        light: boolean('Light variant (light in <bx-date-picker-input>)', false),
        placeholder: text('Placeholder text (placeholder in <bx-date-picker-input>)', 'mm/dd/yyyy'),
        onInput: action('input'),
      }),
    },
  },
};
