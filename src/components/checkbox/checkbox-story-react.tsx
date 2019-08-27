import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXCheckbox from 'carbon-custom-elements/es/components-react/checkbox/checkbox';

const createProps = () => ({
  checked: boolean('Checked (checked)', false),
  disabled: boolean('Disabled (disabled)', false),
  hideLabel: boolean('Hide label (hideLabel)', false),
  indeterminate: boolean('Indeterminate state (indeterminate)', false),
  labelText: text('Label text (labelText)', 'Checkbox'),
  name: text('Name (name)', ''),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Checkbox', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { checked, disabled, hideLabel, indeterminate, labelText, name, value, onInput } = createProps();
    return (
      <BXCheckbox
        checked={checked}
        disabled={disabled}
        hideLabel={hideLabel}
        indeterminate={indeterminate}
        labelText={labelText}
        name={name || undefined}
        value={value || undefined}
        onInput={onInput}
      />
    );
  });
