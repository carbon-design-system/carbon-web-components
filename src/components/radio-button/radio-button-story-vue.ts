/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { RADIO_BUTTON_ORIENTATION } from './radio-button-group';
import { RADIO_BUTTON_LABEL_POSITION } from './radio-button';

const orientations = {
  [`Horizontal (${RADIO_BUTTON_ORIENTATION.HORIZONTAL})`]: RADIO_BUTTON_ORIENTATION.HORIZONTAL,
  [`Vertical (${RADIO_BUTTON_ORIENTATION.VERTICAL})`]: RADIO_BUTTON_ORIENTATION.VERTICAL,
};

const labelPositions = {
  [`Left (${RADIO_BUTTON_LABEL_POSITION.LEFT})`]: RADIO_BUTTON_LABEL_POSITION.LEFT,
  [`Right (${RADIO_BUTTON_LABEL_POSITION.RIGHT})`]: RADIO_BUTTON_LABEL_POSITION.RIGHT,
};

const createGroupProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  labelPosition: select('Label position (label-position)', labelPositions, RADIO_BUTTON_LABEL_POSITION.RIGHT),
  orientation: select('Orientation (orientation)', orientations, RADIO_BUTTON_ORIENTATION.HORIZONTAL),
  name: text('Name (name)', 'radio-group'),
  value: text('Value (value)', ''),
  onAfterChange: action('bx-radio-button-group-changed'),
});

const createProps = () => ({
  hideLabel: boolean('Hide label (hide-label)', false),
  labelText: text('Label text (label-text)', 'Radio button'),
});

storiesOf('Radio button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-radio-button-group
        :disabled="disabled"
        :label-position="labelPosition"
        :orientation="orientation"
        :name="name"
        :value="value"
        @bx-radio-button-group-changed="onAfterChange"
      >
        <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="all"></bx-radio-button>
        <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="cloudFoundry"></bx-radio-button>
        <bx-radio-button :hide-label="hideLabel" :label-text="labelText" value="staging"></bx-radio-button>
      </bx-radio-button-group>
    `,
    ...createVueBindingsFromProps({ ...createGroupProps(), ...createProps() }),
  }));
