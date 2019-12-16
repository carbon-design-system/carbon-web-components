/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Filter16 from '@carbon/icons-vue/es/filter/16';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory, definition as baseDefinition, icon as baseIcon } from './tooltip-story';

export { default } from './tooltip-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-tooltip :open="open">
      <bx-tooltip-body :direction="direction">
        <p>
          This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
          please use a modal instead.
        </p>
        <bx-tooltip-footer>
          <span><!-- TODO: Figure out how to style link in the story --></span><bx-btn kind="primary">Create</bx-btn>
        </bx-tooltip-footer>
      </bx-tooltip-body>
    </bx-tooltip>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-tooltip']),
});

defaultStory.story = baseDefaultStory.story;

export const definition = ({ parameters }) => ({
  template: `
    <bx-tooltip-definition :alignment="alignment" :body-text="bodyText" :direction="direction">
      Definition Tooltip
    </bx-tooltip-definition>
  `,
  ...createVueBindingsFromProps(parameters?.props?.['bx-tooltip-definition']),
});

definition.story = baseDefinition.story;

export const icon = ({ parameters }) => ({
  template: `
    <bx-tooltip-icon :alignment="alignment" :body-text="bodyText" :direction="direction">
      <filter-16></filter-16>
    </bx-tooltip-icon>
  `,
  components: {
    'filter-16': Filter16,
  },
  ...createVueBindingsFromProps(parameters?.props?.['bx-tooltip-icon']),
});

icon.story = baseIcon.story;
