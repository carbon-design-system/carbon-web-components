/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import '../button/button';
import './tooltip';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import './tooltip-body';
import './tooltip-footer';

const directions = {
  [`Bottom (${FLOATING_MENU_DIRECTION.BOTTOM})`]: FLOATING_MENU_DIRECTION.BOTTOM,
  [`Left (${FLOATING_MENU_DIRECTION.LEFT})`]: FLOATING_MENU_DIRECTION.LEFT,
  [`Top (${FLOATING_MENU_DIRECTION.TOP})`]: FLOATING_MENU_DIRECTION.TOP,
  [`Right (${FLOATING_MENU_DIRECTION.RIGHT})`]: FLOATING_MENU_DIRECTION.RIGHT,
};

const createProps = () => ({
  open: boolean('Open (open)', false),
  direction: select('Direction (direction in <bx-tooltip-body>)', directions, FLOATING_MENU_DIRECTION.BOTTOM),
});

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => ({
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
      ...createVueBindingsFromProps(createProps()),
    }),
    {
      docs: {
        storyDescription: `
Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
For more regular use case, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
      `,
      },
    }
  );
