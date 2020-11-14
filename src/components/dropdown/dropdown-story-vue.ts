/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { Default as baseDefault } from './dropdown-story';

export { default } from './dropdown-story';

export const Default = args => {
  const props = (({ onBeforeSelect, onSelect, ...rest }) => {
    function handleBeforeSelect(this: any, event: CustomEvent) {
      onBeforeSelect(event);
      // NOTE: Using class property ref instead of closure ref (from `original`)
      // because updating event handlers via Storybook Vue `methods` (upon knob update) does not seem to work
      if (this.disableSelection) {
        event.preventDefault();
      }
    }
    return {
      ...rest,
      handleBeforeSelect,
      handleAfterSelect: onSelect,
    };
  })(args?.['bx-dropdown']);
  return {
    template: `
      <bx-dropdown
        :open="open"
        :color-scheme="colorScheme"
        :disabled="disabled"
        :light="light"
        :helper-text="helperText"
        :label-text="labelText"
        :size="size"
        :value="value"
        :trigger-content="triggerContent"
        @bx-dropdown-beingselected="handleBeforeSelect"
        @bx-dropdown-selected="handleAfterSelect"
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

Object.assign(Default, baseDefault);

export const skeleton = () => ({
  template: `<bx-dropdown-skeleton></bx-dropdown-skeleton>`,
});
