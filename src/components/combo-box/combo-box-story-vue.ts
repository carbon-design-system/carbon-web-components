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
import './combo-box';
import './combo-box-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', ''),
  labelText: text('Label text (label-text)', ''),
  invalid: boolean('Show invalid state (invalid)', false),
  light: boolean('Light variant (light)', false),
  validityMessage: text('The validity message (validity-message)', ''),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-combo-box-beingselected event)',
    false
  ),
});

storiesOf('Combo box', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-combo-box
        :open="open"
        :disabled="disabled"
        :invalid="invalid"
        :light="light"
        :helper-text="helperText"
        :label-text="labelText"
        :validity-message="validityMessage"
        :value="value"
        :trigger-content="triggerContent"
        @bx-combo-box-beingselected="onBeforeSelect"
        @bx-combo-box-selected="onSelect"
      >
        <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
        <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
        <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
        <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
        <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
      </bx-combo-box>
    `,
    ...createVueBindingsFromProps(
      (({ disableSelection, ...rest }) => {
        const beforeSelectedAction = action('bx-dropdown-beingselected');
        const onBeforeSelect = (event: CustomEvent) => {
          beforeSelectedAction(event);
          if (disableSelection) {
            event.preventDefault();
          }
        };
        return {
          ...rest,
          onBeforeSelect,
          onSelect: action('bx-dropdown-selected'),
        };
      })(createProps())
    ),
  }));
