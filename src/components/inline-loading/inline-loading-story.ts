/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import { INLINE_LOADING_STATE } from './inline-loading';
import storyDocs from './inline-loading-story.mdx';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]: INLINE_LOADING_STATE.INACTIVE,
  [`In progress (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Success (${INLINE_LOADING_STATE.FINISHED})`]: INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

export const defaultStory = ({ parameters }) => {
  const { status } = parameters?.props?.['bx-inline-loading'] ?? {};
  return html`
    <bx-inline-loading status="${ifNonNull(status)}">Loading data...</bx-inline-loading>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Components/Inline loading',
  parameters: {
    percy: {
      skip: true,
    },
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-inline-loading': () => ({
        status: select('Loading status (status)', states, INLINE_LOADING_STATE.ACTIVE),
      }),
    },
  },
};
