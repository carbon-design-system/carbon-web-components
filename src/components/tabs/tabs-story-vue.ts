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
import './tabs';
import './tab';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  triggerContent: text('The default content of the trigger button for narrow screen (trigger-content)', 'Select an item'),
  value: text('The value of the selected item (value)', ''),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-tabs-beingselected event)',
    false
  ),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const props = (original => {
      const beforeSelectedAction = action('bx-tabs-beingselected');
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
        onSelect: action('bx-tabs-selected'),
      };
    })(createProps());
    return {
      template: `
        <bx-tabs
          :disabled="disabled"
          :trigger-content="triggerContent"
          :value="value"
          @bx-tabs-beingselected="onBeforeSelect"
          @bx-tabs-selected="onSelect"
        >
          <bx-tab value="all">Option 1</bx-tab>
          <bx-tab value="cloudFoundry" disabled>Option 2</bx-tab>
          <bx-tab value="staging">Option 3</bx-tab>
          <bx-tab value="dea">Option 4</bx-tab>
          <bx-tab value="router">Option 5</bx-tab>
        </bx-tabs>
        <!-- TODO: Figure out how to style the tab panels demo -->
      `,
      ...createVueBindingsFromProps(props),
    };
  });
