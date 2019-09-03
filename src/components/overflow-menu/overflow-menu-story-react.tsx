/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXOverflowMenu from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu';
// @ts-ignore
import BXOverflowMenuBody from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu-body';
// @ts-ignore
import BXOverflowMenuItem from 'carbon-custom-elements/es/components-react/overflow-menu/overflow-menu-item';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';

const directions = {
  [`Bottom (${FLOATING_MENU_DIRECTION.BOTTOM})`]: FLOATING_MENU_DIRECTION.BOTTOM,
  [`Top (${FLOATING_MENU_DIRECTION.TOP})`]: FLOATING_MENU_DIRECTION.TOP,
};

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  direction: select('Direction (direction in <BXOverflowMenuBody>)', directions, FLOATING_MENU_DIRECTION.BOTTOM),
});

storiesOf('Overflow menu', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { open, disabled, direction } = createProps();
    return (
      <BXOverflowMenu disabled={disabled} open={open}>
        <BXOverflowMenuBody direction={direction}>
          <BXOverflowMenuItem>Option 1</BXOverflowMenuItem>
          <BXOverflowMenuItem>Option 2</BXOverflowMenuItem>
          <BXOverflowMenuItem>Option 3</BXOverflowMenuItem>
          <BXOverflowMenuItem>Option 4</BXOverflowMenuItem>
          <BXOverflowMenuItem>Option 5</BXOverflowMenuItem>
        </BXOverflowMenuBody>
      </BXOverflowMenu>
    );
  });
