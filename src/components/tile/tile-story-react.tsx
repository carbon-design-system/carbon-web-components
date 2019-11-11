/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXTile from 'carbon-custom-elements/es/components-react/tile/tile';
// @ts-ignore
import BXClickableTile from 'carbon-custom-elements/es/components-react/tile/clickable-tile';
// @ts-ignore
import BXSelectableTile from 'carbon-custom-elements/es/components-react/tile/selectable-tile';

const createClickableProps = () => ({
  href: text('Href for clickable UI (href)', ''),
});

const createSelectableProps = () => ({
  checkmarkLabel: text('Label text for the checkmark icon (checkmarkLabel)', ''),
  name: text('Name (name)', ''),
  selected: boolean('Selected (selected)', false),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .add('Default', () => <BXTile>Default tile</BXTile>, {
    docs: {
      storyDescription: `
Read-only tiles are used to display information to the user, such as features or services offered.
Read-only tiles are often seen on marketing pages to promote content.
These tiles can have internal calls-to-action (CTAs), such as a button or a link.
      `,
    },
  })
  .add(
    'Clickable',
    () => {
      const { href } = createClickableProps();
      return <BXClickableTile href={href}>Clickable tile</BXClickableTile>;
    },
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
    () => {
      const { checkmarkLabel, name, selected, value, onInput } = createSelectableProps();
      return (
        <BXSelectableTile checkmarkLabel={checkmarkLabel} name={name} selected={selected} value={value} onInput={onInput}>
          Multi-select Tile
        </BXSelectableTile>
      );
    },
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
