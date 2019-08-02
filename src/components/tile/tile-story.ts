import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
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
  .add('Selectable', () => {
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
  });
