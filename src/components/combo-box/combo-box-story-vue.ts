/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './combo-box-story';

export { default } from './combo-box-story';

export const defaultStory = ({ parameters }) => ({
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
      @bx-combo-box-beingselected="handleBeforeSelect"
      @bx-combo-box-selected="handleAfterSelect"
    >
      <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
      <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
      <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
      <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
      <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
    </bx-combo-box>
  `,
  ...createVueBindingsFromProps(
    (({ disableSelection, onBeforeSelect, onSelect, ...rest }) => {
      const handleBeforeSelect = (event: CustomEvent) => {
        onBeforeSelect(event);
        if (disableSelection) {
          event.preventDefault();
        }
      };
      return {
        ...rest,
        handleBeforeSelect,
        handleAfterSelect: onSelect,
      };
    })(parameters?.props?.['bx-combo-box'])
  ),
});

defaultStory.story = baseDefaultStory.story;
