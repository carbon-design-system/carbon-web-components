import React from 'react';
import { storiesOf } from '@storybook/react';
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
    return <bx-inline-loading status={status}>Loading data...</bx-inline-loading>;
  });
