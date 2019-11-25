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
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import Filter16 from '@carbon/icons-react/es/filter/16';
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
import BXTooltipDefinition, {
  TOOLTIP_ALIGNMENT,
  TOOLTIP_DIRECTION,
  // @ts-ignore
} from 'carbon-custom-elements/es/components-react/tooltip/tooltip-definition';
// @ts-ignore
import BXTooltipIcon from 'carbon-custom-elements/es/components-react/tooltip/tooltip-icon';
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

const tooltipDefinitionAlignments = {
  [`Start (${TOOLTIP_ALIGNMENT.START})`]: TOOLTIP_ALIGNMENT.START,
  [`Center (${TOOLTIP_ALIGNMENT.CENTER})`]: TOOLTIP_ALIGNMENT.CENTER,
  [`End (${TOOLTIP_ALIGNMENT.END})`]: TOOLTIP_ALIGNMENT.END,
};

const tooltipDefinitionDirections = {
  [`Bottom (${TOOLTIP_DIRECTION.BOTTOM})`]: TOOLTIP_DIRECTION.BOTTOM,
  [`Left (${TOOLTIP_DIRECTION.LEFT})`]: TOOLTIP_DIRECTION.LEFT,
  [`Top (${TOOLTIP_DIRECTION.TOP})`]: TOOLTIP_DIRECTION.TOP,
  [`Right (${TOOLTIP_DIRECTION.RIGHT})`]: TOOLTIP_DIRECTION.RIGHT,
};

const createDefinitionIconProps = () => ({
  alignment: select('Tooltip alignment to trigger button (alignment)', tooltipDefinitionAlignments, TOOLTIP_ALIGNMENT.CENTER),
  bodyText: text('Tooltip content (bodyText)', 'Brief description of the dotted, underlined word above.'),
  direction: select('Tooltip direction (direction)', tooltipDefinitionDirections, TOOLTIP_DIRECTION.BOTTOM),
});

storiesOf('Tooltip', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => {
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
    },
    {
      docs: {
        storyDescription: `
Interactive tooltip should be used if there are actions a user can take in the tooltip (e.g. a link or a button).
For more regular use cases, e.g. giving the user more text information about something, use definition tooltip or icon tooltip.
    `,
      },
    }
  )
  .add('Definition tooltip', () => {
    const { alignment, bodyText, direction } = createDefinitionIconProps();
    return (
      <BXTooltipDefinition alignment={alignment} bodyText={bodyText} direction={direction}>
        Definition Tooltip
      </BXTooltipDefinition>
    );
  })
  .add('Icon tooltip', () => {
    const { alignment, bodyText, direction } = createDefinitionIconProps();
    return (
      <BXTooltipIcon alignment={alignment} bodyText={bodyText} direction={direction}>
        <Filter16 />
      </BXTooltipIcon>
    );
  });
