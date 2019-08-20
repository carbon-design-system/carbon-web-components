import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import BXDropdown from 'carbon-custom-elements/es/components-react/dropdown/dropdown';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import BXDropdownItem from 'carbon-custom-elements/es/components-react/dropdown/dropdown-item';

const createProps = () => ({
  open: boolean('Open (open)', false),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', ''),
  labelText: text('Label text (label-text)', ''),
  light: boolean('Light variant (light)', false),
  value: text('The value of the selected item (value)', ''),
  toggleLabelClosed: text('a11y label for the UI indicating the closed state (toggle-label-closed)', ''),
  toggleLabelOpen: text('a11y label for the UI indicating the closed state (toggle-label-open)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select an item'),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-dropdown-beingselected event)',
    false
  ),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const {
      open,
      disabled,
      helperText,
      labelText,
      light,
      toggleLabelClosed,
      toggleLabelOpen,
      triggerContent,
      value,
      disableSelection,
    } = createProps();
    const beforeSelectedAction = action('bx-dropdown-beingselected');
    const handleBeforeSelected = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return (
      <BXDropdown
        open={open}
        disabled={disabled}
        light={light}
        helperText={helperText}
        labelText={labelText}
        toggleLabelClosed={toggleLabelClosed}
        toggleLabelOpen={toggleLabelOpen}
        triggerContent={triggerContent}
        value={value}
        onBeforeSelect={handleBeforeSelected}
        onAfterSelect={action('bx-dropdown-selected')}>
        <BXDropdownItem value="all">Option 1</BXDropdownItem>
        <BXDropdownItem value="cloudFoundry">Option 2</BXDropdownItem>
        <BXDropdownItem value="staging">Option 3</BXDropdownItem>
        <BXDropdownItem value="dea">Option 4</BXDropdownItem>
        <BXDropdownItem value="router">Option 5</BXDropdownItem>
      </BXDropdown>
    );
  });
