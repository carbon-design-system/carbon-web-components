/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs/angular';
import './content-switcher';
import './content-switcher-item';

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
  .add('Default', () => ({
    template: `
      <bx-content-switcher
        [disabled]="disabled"
        [value]="value"
        (bx-content-switcher-beingselected)="onBeforeSelect($event)"
        (bx-content-switcher-selected)="onSelect($event)"
      >
        <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
        <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
        <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
        <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
        <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
      </bx-content-switcher>
    `,
    props: (({ disableSelection, ...rest }) => {
      const beforeSelectedAction = action('bx-content-switcher-beingselected');
      const onBeforeSelect = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableSelection) {
          event.preventDefault();
        }
      };
      return {
        ...rest,
        onBeforeSelect,
        onSelect: action('bx-content-switcher-selected'),
      };
    })(createProps()),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
