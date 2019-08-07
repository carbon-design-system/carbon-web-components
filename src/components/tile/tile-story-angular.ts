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
  .add('Default', () => ({
    template: `
      <bx-tile>Default tile</bx-tile>
    `,
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }))
  .add('Clickable', () => ({
    template: `
      <bx-clickable-tile [href]="href">Clickable tile</bx-clickable-tile>
    `,
    props: createClickableProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }))
  .add('Selectable', () => ({
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
  }));
