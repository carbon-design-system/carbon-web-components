/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
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
  }))
  .add('Clickable', () => ({
    template: `
      <bx-clickable-tile :href="href">Clickable tile</bx-clickable-tile>
    `,
    ...createVueBindingsFromProps(createClickableProps()),
  }))
  .add('Selectable', () => ({
    template: `
      <bx-selectable-tile
        :checkmark-label="checkmarkLabel"
        :name="name"
        :selected="selected"
        :value="value"
        @input="onInput"
      >
        Multi-select Tile
      </bx-selectable-tile>
    `,
    ...createVueBindingsFromProps(createSelectableProps()),
  }));
