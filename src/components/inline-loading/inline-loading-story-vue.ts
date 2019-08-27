import { storiesOf } from '@storybook/vue';
import { withKnobs, select } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
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
  .add('Default', () => ({
    template: `
      <bx-inline-loading :status="status">Loading data...</bx-inline-loading>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
