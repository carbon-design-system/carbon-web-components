/**
 * Copyright IBM Corp. 2016, 2018
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import Calendar16 from '@carbon/icons/lib/calendar/16';
import { settings } from 'carbon-components';
import './date-picker';
import './date-picker-input';

const { prefix } = settings;

const createProps = () => ({
  open: boolean('Open (open)', false),
});

const createInputProps = () => ({
  disabled: boolean('Disabled (disabled in <bx-date-picker-input>)', false),
  hideLabel: boolean('Hide label (hide-label in <bx-date-picker-input>)', false),
  labelText: text('Label text (label-text in <bx-date-picker-input>)', 'Date Picker label'),
  light: boolean('Light variant (light in <bx-date-picker-input>)', false),
  onInput: action('input'),
});

storiesOf('Date picker', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open } = createProps();
    const { disabled, hideLabel, labelText, light } = createInputProps();
    return html`
      <bx-date-picker ?open="${open}">
        <bx-date-picker-input ?disabled="${disabled}" ?hide-label="${hideLabel}" label-text="${labelText}" ?light="${light}">
        </bx-date-picker-input>
      </bx-date-picker>
    `;
  })
  .add('Single with calendar', () => {
    const { open } = createProps();
    const { disabled, hideLabel, labelText, light, onInput } = createInputProps();
    return html`
      <bx-date-picker ?open="${open}">
        <bx-date-picker-input
          ?disabled="${disabled}"
          ?hide-label="${hideLabel}"
          kind="single"
          label-text="${labelText}"
          ?light="${light}"
          @input="${onInput}"
        >
          ${Calendar16({
            slot: 'calendar-icon',
            class: `${prefix}--date-picker__icon`,
            role: 'img',
            children: [
              html`
                <title>Open calendar</title>
              `,
            ],
          })}
        </bx-date-picker-input>
      </bx-date-picker>
    `;
  });
