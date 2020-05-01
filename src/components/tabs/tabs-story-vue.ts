/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './tabs-story';

export { default } from './tabs-story';

export const defaultStory = ({ parameters }) => {
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
  })(parameters?.props?.['bx-tabs']);
  return {
    template: `
        <bx-tabs
          :trigger-content="triggerContent"
          :type="type"
          :value="value"
          @bx-tabs-beingselected="handleBeforeSelect"
          @bx-tabs-selected="handleAfterSelect"
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
};

defaultStory.story = baseDefaultStory.story;

export const skeleton = () => ({
  template: `
    <bx-tabs-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
      <bx-tab-skeleton></bx-tab-skeleton>
    </bx-tabs-skeleton>
  `,
});
