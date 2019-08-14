import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import './dropdown';
import './dropdown-item';

const BXDropdown = createReactCustomElementType('bx-dropdown', {
  disabled: {
    serialize: booleanSerializer,
  },
  helperText: {
    attribute: 'helper-text',
  },
  labelText: {
    attribute: 'label-text',
  },
  light: {
    serialize: booleanSerializer,
  },
  open: {
    serialize: booleanSerializer,
  },
  toggleLabelClosed: {
    attribute: 'toggle-label-closed',
  },
  toggleLabelOpen: {
    attribute: 'toggle-label-open',
  },
  triggerContent: {
    attribute: 'trigger-content',
  },
  onBeforeSelect: {
    event: 'bx-dropdown-beingselected',
  },
  onSelect: {
    event: 'bx-dropdown-selected',
  },
});

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
        onSelect={action('bx-dropdown-selected')}>
        <bx-dropdown-item value="all">Option 1</bx-dropdown-item>
        <bx-dropdown-item value="cloudFoundry">Option 2</bx-dropdown-item>
        <bx-dropdown-item value="staging">Option 3</bx-dropdown-item>
        <bx-dropdown-item value="dea">Option 4</bx-dropdown-item>
        <bx-dropdown-item value="router">Option 5</bx-dropdown-item>
      </BXDropdown>
    );
  });
