/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './dropdown-story';

export { default } from './dropdown-story';

export const defaultStory = ({ parameters }) => {
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
  })(parameters?.props?.['bx-dropdown']);
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
};

defaultStory.story = baseDefaultStory.story;
