import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import './checkbox';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hide-label)', false),
  indeterminate: boolean('Indeterminate state (indeterminate)', false),
  labelText: text('Label text (label-text)', 'Checkbox'),
  name: text('Name (name)', ''),
  value: text('Value (value)', ''),
  onInput: action('onInput'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-checkbox
        :checked="checked"
        :disabled="disabled"
        :hide-label="hideLabel"
        :indeterminate="indeterminate"
        :label-text="labelText"
        :name="name"
        :value="value"
        @input="onInput"
      ></bx-checkbox>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
