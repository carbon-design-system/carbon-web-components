/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import './date-picker';
import './date-picker-input';

const createProps = () => ({
  enabledRange: text('Minimum/maximum dates in ISO8601 date format, separated by `/` (enabledRange)', ''),
  open: boolean('Open (open)', false),
  value: text('Value in ISO8601 date format, separated by `/` (value)', ''),
  onAfterChanged: action('bx-date-picker-changed'),
});

const createInputProps = () => ({
  disabled: boolean('Disabled (disabled in <BXDatePickerInput>)', false),
  hideLabel: boolean('Hide label (hideLabel in <BXDatePickerInput>)', false),
  labelText: text('Label text (labelText in <BXDatePickerInput>)', 'Date Picker label'),
  light: boolean('Light variant (light in <BXDatePickerInput>)', false),
  placeholder: text('Placeholder text (placeholder in <bx-date-picker-input>)', 'mm/dd/yyyy'),
  onInput: action('input'),
});

storiesOf('Date picker', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => ({
      template: `
      <bx-date-picker [open]="open">
        <bx-date-picker-input
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          [labelText]="labelText"
          [light]="light"
          [placeholder]="placeholder"
        >
        </bx-date-picker-input>
      </bx-date-picker>
    `,
      props: { ...createProps(), ...createInputProps() },
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'A simple Date Picker consists of an input field and no calendar.',
      },
    }
  )
  .add(
    'Single with calendar',
    () => ({
      template: `
      <bx-date-picker
        [enabledRange]="enabledRange"
        [open]="open"
        [value]="value"
        (bx-date-picker-changed)="onAfterChanged($event)"
      >
        <bx-date-picker-input
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          kind="single"
          [labelText]="labelText"
          [light]="light"
          [placeholder]="placeholder"
          (input)="onInput($event)"
        >
        </bx-date-picker-input>
      </bx-date-picker>
    `,
      props: { ...createProps(), ...createInputProps() },
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'A single Date Picker consists of an input field and a calendar.',
      },
    }
  )
  .add(
    'Range with calendar',
    () => ({
      template: `
      <bx-date-picker
        [enabledRange]="enabledRange"
        [open]="open"
        [value]="value"
        (bx-date-picker-changed)="onAfterChanged($event)"
      >
        <bx-date-picker-input
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          kind="from"
          [labelText]="labelText"
          [light]="light"
          [placeholder]="placeholder"
          (input)="onInput($event)"
        >
        </bx-date-picker-input>
        <bx-date-picker-input
          [disabled]="disabled"
          [hideLabel]="hideLabel"
          kind="to"
          [labelText]="labelText"
          [light]="light"
          [placeholder]="placeholder"
          (input)="onInput($event)"
        >
        </bx-date-picker-input>
      </bx-date-picker>
    `,
      props: { ...createProps(), ...createInputProps() },
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: 'A range Date Picker consists of two input fields and a calendar.',
      },
    }
  );
