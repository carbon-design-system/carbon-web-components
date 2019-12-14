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
import { defaultStory as baseDefaultStory } from './accordion-story';

export { default } from './accordion-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-accordion
      @bx-accordion-item-beingtoggled="handleBeforeToggle"
      @bx-accordion-item-toggled="handleToggle"
    >
      <bx-accordion-item :open="open" :title-text="titleText">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item :open="open" :title-text="titleText">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </bx-accordion-item>
      <bx-accordion-item :open="open">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <span slot="title">{{ titleText }}</span>
      </bx-accordion-item>
    </bx-accordion>
  `,
  ...createVueBindingsFromProps(
    (({ disableToggle, ...rest }) => {
      const beforeSelectedAction = action('bx-accordion-item-beingtoggled');
      return {
        ...rest,
        handleBeforeToggle: (event: CustomEvent) => {
          beforeSelectedAction(event);
          if (disableToggle) {
            event.preventDefault();
          }
        },
        handleToggle: action('bx-accordion-item-toggled'),
      };
    })(parameters?.props?.['bx-accordion'])
  ),
});

defaultStory.story = baseDefaultStory.story;
