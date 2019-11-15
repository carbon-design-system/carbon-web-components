/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './combo-box';
import './combo-box-item';

export const defaultStory = ({ parameters }) => {
  const { open, disabled, helperText, invalid, labelText, light, value, triggerContent, validityMessage, disableSelection } =
    (parameters.props && parameters.props['bx-combo-box']) || ({} as typeof parameters.props['bx-combo-box']);
  const beforeSelectedAction = action('bx-combo-box-beingselected');
  const handleBeforeSelected = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-combo-box
      ?open=${open}
      ?disabled=${disabled}
      ?invalid=${invalid}
      ?light=${light}
      helper-text=${helperText}
      label-text=${labelText}
      validity-message=${validityMessage}
      value=${value}
      trigger-content=${triggerContent}
      @bx-combo-box-beingselected=${handleBeforeSelected}
      @bx-combo-box-selected=${action('bx-combo-box-selected')}
    >
      <bx-combo-box-item value="all">Option 1</bx-combo-box-item>
      <bx-combo-box-item value="cloudFoundry">Option 2</bx-combo-box-item>
      <bx-combo-box-item value="staging">Option 3</bx-combo-box-item>
      <bx-combo-box-item value="dea">Option 4</bx-combo-box-item>
      <bx-combo-box-item value="router">Option 5</bx-combo-box-item>
    </bx-combo-box>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Combo box',
  parameters: {
    knobs: {
      'bx-combo-box': () => ({
        open: boolean('Open (open)', false),
        disabled: boolean('Disabled (disabled)', false),
        helperText: text('Helper text (helper-text)', ''),
        invalid: boolean('Show invalid state  (invalid)', false),
        labelText: text('Label text (label-text)', ''),
        light: boolean('Light variant (light)', false),
        value: text('The value of the selected item (value)', ''),
        triggerContent: text('The placeholder content (trigger-content)', 'Filter...'),
        validityMessage: text('The validity message (validity-message)', ''),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-combo-box-beingselected event)',
          false
        ),
      }),
    },
  },
};
