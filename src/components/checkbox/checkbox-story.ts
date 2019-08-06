import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './checkbox';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hide-label)', false),
  indeterminate: boolean('Indeterminate state (indeterminate)', false),
  labelText: text('Label text (label-text)', 'Checkbox'),
  name: text('Name (name)', ''),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onInput } = createProps();
    return html`
      <bx-checkbox
        ?checked="${checked}"
        ?disabled="${disabled}"
        ?hide-label="${hideLabel}"
        ?indeterminate="${indeterminate}"
        label-text="${labelText}"
        name="${ifDefined(!name ? undefined : name)}"
        value="${ifDefined(!value ? undefined : value)}"
        @input="${onInput}"
      ></bx-checkbox>
    `;
  });
