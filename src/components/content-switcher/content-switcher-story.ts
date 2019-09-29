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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './content-switcher';
import './switch';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  value: text('The value of the selected item (value)', ''),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
    false
  ),
});

storiesOf('Content switcher', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, value, disableSelection } = createProps();
    const beforeSelectedAction = action('bx-content-switcher-beingselected');
    const handleBeforeSelected = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return html`
      <bx-content-switcher
        ?disabled=${disabled}
        value=${value}
        @bx-content-switcher-beingselected=${handleBeforeSelected}
        @bx-content-switcher-selected=${action('bx-content-switcher-selected')}
      >
        <bx-switch value="all">Option 1</bx-switch>
        <bx-switch value="cloudFoundry" disabled>Option 2</bx-switch>
        <bx-switch value="staging">Option 3</bx-switch>
        <bx-switch value="dea">Option 4</bx-switch>
        <bx-switch value="router">Option 5</bx-switch>
      </bx-content-switcher>
    `;
  });
