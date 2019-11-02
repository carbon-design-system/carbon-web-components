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
import './tile';
import './clickable-tile';
import './selectable-tile';

const createClickableProps = () => ({
  href: text('Href for clickable UI (href)', ''),
});

const createSelectableProps = () => ({
  checkmarkLabel: text('Label text for the checkmark icon (checkmark-label)', ''),
  name: text('Name (name)', ''),
  selected: boolean('Selected (selected)', false),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .add(
    'Default',
    () => ({
      template: `
      <bx-tile>Default tile</bx-tile>
    `,
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: `
Read-only tiles are used to display information to the user, such as features or services offered.
Read-only tiles are often seen on marketing pages to promote content.
These tiles can have internal calls-to-action (CTAs), such as a button or a link.
      `,
      },
    }
  )
  .add(
    'Clickable',
    () => ({
      template: `
      <bx-clickable-tile [href]="href">Clickable tile</bx-clickable-tile>
    `,
      props: createClickableProps(),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: `
Clickable tiles can be used as navigational items, where the entire tile is a clickable state,
which redirects the user to a new page.
Clickable tiles cannot contain separate internal CTAs.
      `,
      },
    }
  )
  .add(
    'Selectable',
    () => ({
      template: `
      <bx-selectable-tile
        [checkmarkLabel]="checkmarkLabel"
        [name]="name"
        [selected]="selected"
        [value]="value"
        (input)="onInput($event)"
      >
        Multi-select Tile
      </bx-selectable-tile>
    `,
      props: createSelectableProps(),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: `
Selectable tiles work like a radio button, where the entire tile is a click target.
Selectable tiles may contain internal CTAs (like links to docs) if the internal CTA is given its own click target.
Selectable tiles work well for presenting options to a user in a structured manner, such as a set of pricing plans.
      `,
      },
    }
  );
