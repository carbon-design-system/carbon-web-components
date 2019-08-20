import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { withKnobs, select } from '@storybook/addon-knobs/angular';
import { INLINE_LOADING_STATE } from './inline-loading';

const states = {
  [`Inactive (${INLINE_LOADING_STATE.INACTIVE})`]: INLINE_LOADING_STATE.INACTIVE,
  [`In progress (${INLINE_LOADING_STATE.ACTIVE})`]: INLINE_LOADING_STATE.ACTIVE,
  [`Success (${INLINE_LOADING_STATE.FINISHED})`]: INLINE_LOADING_STATE.FINISHED,
  [`Failed (${INLINE_LOADING_STATE.ERROR})`]: INLINE_LOADING_STATE.ERROR,
};

const createProps = () => ({
  status: select('Loadint status (status)', states, INLINE_LOADING_STATE.ACTIVE),
});

storiesOf('Inline loading', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-inline-loading [status]="status">Loading data...</bx-inline-loading>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
