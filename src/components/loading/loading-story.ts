import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
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
  .add('Default', () => {
    const props = createProps();
    return html`
      <bx-loading ?inactive=${props.inactive} type=${props.type}></bx-loading>
    `;
  });
