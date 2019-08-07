import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import './tile';
import './clickable-tile';
import './selectable-tile';

const BXSelectableTile = createReactCustomElementType('bx-selectable-tile', {
  checkmarkLabel: {
    attribute: 'checkmark-label',
  },
  selected: {
    serialize: booleanSerializer,
  },
});

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
  .add('Default', () => <bx-tile>Default tile</bx-tile>)
  .add('Clickable', () => {
    const { href } = createClickableProps();
    return <bx-clickable-tile href={href}>Clickable tile</bx-clickable-tile>;
  })
  .add('Selectable', () => {
    const { checkmarkLabel, name, selected, value, onInput } = createSelectableProps();
    return (
      <BXSelectableTile checkmarkLabel={checkmarkLabel} name={name} selected={selected} value={value} onInput={onInput}>
        Multi-select Tile
      </BXSelectableTile>
    );
  });
