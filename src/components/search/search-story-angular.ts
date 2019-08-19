import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/angular';
import { SEARCH_SIZE } from './search';

const sizes = {
  [`Small size (${SEARCH_SIZE.SMALL})`]: SEARCH_SIZE.SMALL,
  [`Regular size (${SEARCH_SIZE.REGULAR})`]: SEARCH_SIZE.REGULAR,
};

const createProps = () => ({
  closeButtonLabelText: text('The label text for the close button (closeButtonLabelText)', 'Clear search input'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  labelText: text('Label text (labelText)', 'Search'),
  name: text('Name (name)', ''),
  placeholder: text('Placeholder text (placeholder)', ''),
  size: select('Searh size (size)', sizes, SEARCH_SIZE.REGULAR),
  type: text('The type of the <input> (type)', ''),
  value: text('Value (value)', ''),
  onAfterInput: action('bx-search-input'),
});

storiesOf('Search', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-search
        [closeButtonLabelText]="closeButtonLabelText"
        [disabled]="disabled"
        [light]="light"
        [labelText]="labelText"
        [name]="name"
        [placeholder]="placeholder"
        [size]="size"
        [type]="type"
        [value]="value"
        (bx-search-input)="onAfterInput($event)"
      ></bx-search>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
