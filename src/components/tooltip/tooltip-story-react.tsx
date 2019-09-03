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
import BXBtn from 'carbon-custom-elements/es/components-react/button/button';
// @ts-ignore
import BXTooltip from 'carbon-custom-elements/es/components-react/tooltip/tooltip';
// @ts-ignore
import BXTooltipBody from 'carbon-custom-elements/es/components-react/tooltip/tooltip-body';
// @ts-ignore
import BXTooltipFooter from 'carbon-custom-elements/es/components-react/tooltip/tooltip-footer';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import styles from './tooltip-story.scss';

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
  .add('Default', () => {
    const { open, direction } = createProps();
    return (
      <>
        <style>{styles.cssText}</style>
        <BXTooltip open={open}>
          <BXTooltipBody direction={direction}>
            <p>
              This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is
              needed please use a modal instead.
            </p>
            <BXTooltipFooter>
              <a href="#" className="bx--link">
                Learn More
              </a>
              <BXBtn kind="primary">Create</BXBtn>
            </BXTooltipFooter>
          </BXTooltipBody>
        </BXTooltip>
      </>
    );
  });
