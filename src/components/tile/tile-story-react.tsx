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
  .add('Default', () => <BXTile>Default tile</BXTile>)
  .add('Clickable', () => {
    const { href } = createClickableProps();
    return <BXClickableTile href={href}>Clickable tile</BXClickableTile>;
  })
  .add('Selectable', () => {
    const { checkmarkLabel, name, selected, value, onInput } = createSelectableProps();
    return (
      <BXSelectableTile checkmarkLabel={checkmarkLabel} name={name} selected={selected} value={value} onInput={onInput}>
        Multi-select Tile
      </BXSelectableTile>
    );
  });
