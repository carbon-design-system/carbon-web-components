/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { DROPDOWN_TYPE } from '../dropdown/dropdown';
import './multi-select';
import './multi-select-item';

const types = {
  [`Regular (${DROPDOWN_TYPE.REGULAR})`]: DROPDOWN_TYPE.REGULAR,
  [`Inline (${DROPDOWN_TYPE.INLINE})`]: DROPDOWN_TYPE.INLINE,
};

const createProps = () => ({
  clearSelectionLabel: text('a11y label for the icon to clear selection (clear-selection-label)', ''),
  disabled: boolean('Disabled (disabled)', false),
  helperText: text('Helper text (helper-text)', 'This is not helper text'),
  invalid: boolean('Show invalid state  (invalid)', false),
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
      invalid,
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
    return html`
      <bx-multi-select
        ?disabled=${disabled}
        ?invalid=${invalid}
        ?light=${light}
        ?open=${open}
        clear-selection-label=${clearSelectionLabel}
        helper-text=${helperText}
        label-text=${labelText}
        toggle-label-closed=${toggleLabelClosed}
        toggle-label-open=${toggleLabelOpen}
        trigger-content=${triggerContent}
        type=${type}
        validity-message=${validityMessage}
        @bx-multi-select-beingselected=${handleBeforeSelected}
        @bx-multi-select-selected=${action('bx-multi-select-selected')}
      >
        <bx-multi-select-item value="all">Option 1</bx-multi-select-item>
        <bx-multi-select-item value="cloudFoundry">Option 2</bx-multi-select-item>
        <bx-multi-select-item value="staging">Option 3</bx-multi-select-item>
        <bx-multi-select-item value="dea">Option 4</bx-multi-select-item>
        <bx-multi-select-item value="router">Option 5</bx-multi-select-item>
      </bx-multi-select>
    `;
  });
