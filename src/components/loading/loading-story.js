import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
import BXLoading from './loading';

const types = {
  'Regular (regular)': 'regular',
  'Small (small)': 'small',
  'With overlay (overlay)': 'overlay',
};

const createProps = () => ({
  inactive: boolean('Inactive (inactive)', false),
  type: select('The spinner type (type)', types),
});

window.customElements.define(BXLoading.is, BXLoading);

storiesOf('Loading', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const props = createProps();
    return html`
      <bx-loading ?inactive=${props.inactive} type=${props.type}></bx-loading>
    `;
  });
