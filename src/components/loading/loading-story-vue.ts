import { storiesOf } from '@storybook/vue';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { LOADING_TYPE } from './loading';

const types = {
  [`Regular (${LOADING_TYPE.REGULAR})`]: LOADING_TYPE.REGULAR,
  [`Small (${LOADING_TYPE.SMALL})`]: LOADING_TYPE.SMALL,
  [`With overlay (${LOADING_TYPE.OVERLAY})`]: LOADING_TYPE.OVERLAY,
};

const createProps = () => ({
  inactive: boolean('Inactive (inactive)', false),
  type: select('The spinner type (type)', types, LOADING_TYPE.REGULAR),
});

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-loading :inactive="inactive" :type="type"></bx-loading>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
