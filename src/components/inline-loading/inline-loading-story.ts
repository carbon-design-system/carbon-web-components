/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { withKnobs, select } from '@storybook/addon-knobs';
import { INLINE_LOADING_STATE } from './inline-loading';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]: INLINE_LOADING_STATE.INACTIVE,
  [`In progress (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Success (${INLINE_LOADING_STATE.FINISHED})`]: INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

const createProps = () => ({
  status: select('Loading status (status)', states, INLINE_LOADING_STATE.ACTIVE),
});

storiesOf('Inline loading', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { status } = createProps();
    return html`
      <bx-inline-loading status="${status}">Loading data...</bx-inline-loading>
    `;
  });
