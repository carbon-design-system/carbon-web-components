/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import Filter16 from 'carbon-web-components/es/icons/filter/16';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import '../button/button';
import './tooltip';
import { FLOATING_MENU_DIRECTION } from '../floating-menu/floating-menu';
import './tooltip-body';
import './tooltip-footer';
import { TOOLTIP_ALIGNMENT, TOOLTIP_DIRECTION } from './tooltip-definition';
import './tooltip-icon';
import styles from './tooltip-story.scss';
import storyDocs from './tooltip-story.mdx';

const tooltipBodyDirections = {
  [`Bottom (${FLOATING_MENU_DIRECTION.BOTTOM})`]: FLOATING_MENU_DIRECTION.BOTTOM,
  [`Left (${FLOATING_MENU_DIRECTION.LEFT})`]: FLOATING_MENU_DIRECTION.LEFT,
  [`Top (${FLOATING_MENU_DIRECTION.TOP})`]: FLOATING_MENU_DIRECTION.TOP,
  [`Right (${FLOATING_MENU_DIRECTION.RIGHT})`]: FLOATING_MENU_DIRECTION.RIGHT,
};

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

export const defaultStory = ({ parameters }) => {
  const { open } = parameters?.props?.['bx-tooltip'] ?? {};
  const { direction } = parameters?.props?.['bx-tooltip-body'] ?? {};
  return html`
    <style>
      ${styles}
    </style>
    <bx-tooltip ?open="${open}">
      <bx-tooltip-body direction="${ifNonNull(direction)}">
        <p>
          This is some tooltip text. This box shows the maximum amount of text that should appear inside. If more room is needed
          please use a modal instead.
        </p>
        <bx-tooltip-footer> <a href="#" class="bx--link">Learn More</a><bx-btn kind="primary">Create</bx-btn> </bx-tooltip-footer>
      </bx-tooltip-body>
    </bx-tooltip>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    knobs: {
      'bx-tooltip': () => ({
        open: boolean('Open (open)', false),
      }),
      'bx-tooltip-body': () => ({
        direction: select('Direction (direction in <bx-tooltip-body>)', tooltipBodyDirections, FLOATING_MENU_DIRECTION.BOTTOM),
      }),
    },
  },
};

export const definition = ({ parameters }) => {
  const { alignment, bodyText, direction } = parameters?.props?.['bx-tooltip-definition'] ?? {};
  return html`
    <bx-tooltip-definition
      alignment="${ifNonNull(alignment)}"
      body-text="${ifNonNull(bodyText)}"
      direction="${ifNonNull(direction)}"
    >
      Definition Tooltip
    </bx-tooltip-definition>
  `;
};

definition.story = {
  name: 'Definition tooltip',
  parameters: {
    knobs: {
      'bx-tooltip-definition': () => ({
        alignment: select(
          'Tooltip alignment to trigger button (alignment)',
          tooltipDefinitionAlignments,
          TOOLTIP_ALIGNMENT.CENTER
        ),
        bodyText: textNullable('Tooltip content (bodyText)', 'Brief description of the dotted, underlined word above.'),
        direction: select('Tooltip direction (direction)', tooltipDefinitionDirections, TOOLTIP_DIRECTION.BOTTOM),
      }),
    },
  },
};

export const icon = ({ parameters }) => {
  const { alignment, bodyText, direction } = parameters?.props?.['bx-tooltip-icon'] ?? {};
  return html`
    <bx-tooltip-icon alignment="${ifNonNull(alignment)}" body-text="${ifNonNull(bodyText)}" direction="${ifNonNull(direction)}">
      ${Filter16()}
    </bx-tooltip-icon>
  `;
};

icon.story = {
  name: 'Icon tooltip',
  parameters: {
    knobs: {
      'bx-tooltip-icon': definition.story.parameters.knobs['bx-tooltip-definition'],
    },
  },
};

export default {
  title: 'Components/Tooltip',
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
};
