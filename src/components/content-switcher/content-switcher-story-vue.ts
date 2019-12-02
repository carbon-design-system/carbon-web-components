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
import { defaultStory as baseDefaultStory } from './content-switcher-story';

export { default } from './content-switcher-story';

export const defaultStory = ({ parameters }) => {
  const props = (original => {
    const beforeSelectedAction = action('bx-content-switcher-beingselected');
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
      onSelect: action('bx-content-switcher-selected'),
    };
  })(parameters?.props?.['bx-content-switcher']);
  return {
    template: `
      <bx-content-switcher
        :disabled="disabled"
        :value="value"
        @bx-content-switcher-beingselected="onBeforeSelect"
        @bx-content-switcher-selected="onSelect"
      >
        <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
        <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
        <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
        <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
        <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
      </bx-content-switcher>
    `,
    ...createVueBindingsFromProps(props),
  };
};

defaultStory.story = baseDefaultStory.story;
