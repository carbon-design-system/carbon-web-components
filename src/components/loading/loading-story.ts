/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { boolean, select } from '@storybook/addon-knobs';
import { LOADING_TYPE } from './loading';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: LOADING_TYPE.REGULAR,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
  [`With overlay (${LOADING_TYPE.OVERLAY})`]: LOADING_TYPE.OVERLAY,
};

export const defaultStory = ({ parameters }) => {
  const props = (parameters.props && parameters.props['bx-loading']) || ({} as typeof parameters.props['bx-loading']);
  return html`
    <bx-loading ?inactive=${props.inactive} type=${props.type}></bx-loading>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Loading',
  parameters: {
    knobs: {
      'bx-loading': () => ({
        inactive: boolean('Inactive (inactive)', false),
        type: select('The spinner type (type)', types, LOADING_TYPE.REGULAR),
      }),
    },
  },
};
