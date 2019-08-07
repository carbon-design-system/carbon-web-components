import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import { DROPDOWN_TYPE } from '../dropdown/dropdown';
import './multi-select';
import './multi-select-item';

const BXMultiSelect = createReactCustomElementType('bx-multi-select', {
  clearSelectionLabel: {
    attribute: 'clear-selection-label',
  },
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
  triggerContent: {
    attribute: 'trigger-content',
  },
  validityMessage: {
    attribute: 'validity-message',
  },
  onBeforeSelect: {
    event: 'bx-multi-select-beingselected',
  },
  onSelect: {
    event: 'bx-multi-select-selected',
  },
});

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: DROPDOWN_TYPE.REGULAR,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const createProps = () => ({
  clearSelectionLabel: text('a11y label for the icon to clear selection (clear-selection-label)', ''),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', 'This is not helper text'),
  labelText: text('Label text (label-text)', 'Multiselect title'),
  light: boolean('Light variant (light)', false),
  open: boolean('Open (open)', false),
  toggleLabelClosed: text('a11y label for the UI indicating the closed state (toggle-label-closed)', ''),
  toggleLabelOpen: text('a11y label for the UI indicating the closed state (toggle-label-open)', ''),
  triggerContent: text('The default content of the trigger button (trigger-content)', 'Select items'),
  type: select('UI type (type)', types, DROPDOWN_TYPE.REGULAR),
  validityMessage: text('The validity message (validity-message)', ''),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-multi-select-beingselected event)',
    false
  ),
});

storiesOf('Multi select', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const {
      clearSelectionLabel,
      disabled,
      helperText,
      labelText,
      light,
      open,
      toggleLabelClosed,
      toggleLabelOpen,
      triggerContent,
      type,
      validityMessage,
      disableSelection,
    } = createProps();
    const beforeSelectedAction = action('bx-multi-select-beingselected');
    const handleBeforeSelected = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return (
      <BXMultiSelect
        disabled={disabled}
        light={light}
        open={open}
        clearSelectionLabel={clearSelectionLabel}
        helperText={helperText}
        labelText={labelText}
        toggleLabelClosed={toggleLabelClosed}
        toggleLabelOpen={toggleLabelOpen}
        triggerContent={triggerContent}
        type={type}
        validityMessage={validityMessage}
        onBeforeSelect={handleBeforeSelected}
        onSelect={action('bx-multi-select-selected')}>
        <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
        <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
        <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
        <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
        <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
      </BXMultiSelect>
    );
  });
