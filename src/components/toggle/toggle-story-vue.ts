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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import './toggle';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  checkedText: text('Text for checked state (checked-text)', 'On'),
  disabled: boolean('Disabled (disabled)', false),
  labelText: text('Label text (label-text)', 'Toggle'),
  name: text('Name (name)', ''),
  small: boolean('Use small variant (small)', false),
  uncheckedText: text('Text for unchecked state (unchecked-text)', 'Off'),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Toggle', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-toggle
        :checked="checked"
        :checked-text="checkedText"
        :disabled="disabled"
        :label-text="labelText"
        :name="name"
        :small="small"
        :unchecked-text="uncheckedText"
        :value="value"
        @input="onInput"
      ></bx-toggle>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
