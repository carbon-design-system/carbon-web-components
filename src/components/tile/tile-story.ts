/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
import './tile';
import './clickable-tile';
import './radio-tile';
import './selectable-tile';
import './expandable-tile';

const createClickableProps = () => ({
  href: text('Href for clickable UI (href)', ''),
});

const createSelectableProps = () => ({
  checkmarkLabel: text('Label text for the checkmark icon (checkmark-label)', ''),
  name: text('Name (name)', 'selectable-tile'),
  selected: boolean('Selected (selected)', false),
  value: text('Value (value)', ''),
  onInput: action('input'),
});

const createExpandableProps = () => ({
  expanded: boolean('Expanded (expanded)', false),
  disableChange: boolean(
    'Disable user-initiated change in expanded state (Call event.preventDefault() in bx-expandable-tile-beingchanged event)',
    false
  ),
});

storiesOf('Tile', module)
  .addDecorator(withKnobs)
  .addDecorator(
    story =>
      html`
        <div>${story()}</div>
      `
  )
  .add(
    'Default',
    () => html`
      <bx-tile>Default tile</bx-tile>
    `
  )
  .add('Clickable', () => {
    const { href } = createClickableProps();
    return html`
      <bx-clickable-tile href="${href}">Clickable tile</bx-clickable-tile>
    `;
  })
  .add('Single-selectable', () => {
    const { checkmarkLabel, name, value, onInput } = createSelectableProps();
    return html`
      <fieldset>
        <legend>Single-select tiles</legend>
        <bx-radio-tile
          checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
          name="${ifDefined(!name ? undefined : name)}"
          value="${ifDefined(!value ? undefined : value)}"
          @input="${onInput}"
        >
          Single-select Tile
        </bx-radio-tile>
        <bx-radio-tile
          checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
          name="${ifDefined(!name ? undefined : name)}"
          value="${ifDefined(!value ? undefined : value)}"
          @input="${onInput}"
        >
          Single-select Tile
        </bx-radio-tile>
        <bx-radio-tile
          checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
          name="${ifDefined(!name ? undefined : name)}"
          value="${ifDefined(!value ? undefined : value)}"
          @input="${onInput}"
        >
          Single-select Tile
        </bx-radio-tile>
      </fieldset>
    `;
  })
  .add('Multi-selectable', () => {
    const { checkmarkLabel, name, selected, value, onInput } = createSelectableProps();
    return html`
      <bx-selectable-tile
        checkmark-label="${ifDefined(!checkmarkLabel ? undefined : checkmarkLabel)}"
        name="${ifDefined(!name ? undefined : name)}"
        ?selected="${selected}"
        value="${ifDefined(!value ? undefined : value)}"
        @input="${onInput}"
      >
        Multi-select Tile
      </bx-selectable-tile>
    `;
  })
  .add('Expandable', () => {
    const { expanded, disableChange } = createExpandableProps();
    const beforeChangedAction = action('bx-expandable-tile-beingchanged');
    const handleBeforeChanged = (event: CustomEvent) => {
      beforeChangedAction(event);
      if (disableChange) {
        event.preventDefault();
      }
    };
    return html`
      <bx-expandable-tile
        ?expanded="${expanded}"
        @bx-expandable-tile-beingchanged=${handleBeforeChanged}
        @bx-expandable-tile-changed=${action('bx-expandable-tile-changed')}
      >
        <bx-tile-above-the-fold-content style="height: 200px">
          Above the fold content here
        </bx-tile-above-the-fold-content>
        <bx-tile-below-the-fold-content style="height: 300px">
          Below the fold content here
        </bx-tile-below-the-fold-content>
      </bx-expandable-tile>
    `;
  });
