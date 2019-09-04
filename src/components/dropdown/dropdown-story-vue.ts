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
import './dropdown';
import './dropdown-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', ''),
  labelText: text('Label text (label-text)', ''),
  light: boolean('Light variant (light)', false),
  value: text('The value of the selected item (value)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
    false
  ),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const props = (original => {
      const beforeSelectedAction = action('bx-dropdown-beingselected');
      function onBeforeSelect(this: any, event: CustomEvent) {
        beforeSelectedAction(event);
        // NOTE: Using class property ref instead of closure ref (from `original`)
        // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
        if (this.disableSelection) {
          event.preventDefault();
        }
      }
      return {
        ...original,
        onBeforeSelect,
        onSelect: action('bx-dropdown-selected'),
      };
    })(createProps());
    return {
      template: `
        <bx-dropdown
          :open="open"
          :disabled="disabled"
          :light="light"
          :helper-text="helperText"
          :label-text="labelText"
          :value="value"
          :trigger-content="triggerContent"
          @bx-dropdown-beingselected="onBeforeSelect"
          @bx-dropdown-selected="onSelect"
        >
          <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
          <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
          <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
          <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
          <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
        </bx-dropdown>
      `,
      ...createVueBindingsFromProps(props),
    };
  });
