import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import { SEARCH_SIZE } from './search';

const BXSearch = createReactCustomElementType('bx-search', {
  disabled: {
    serialize: booleanSerializer,
  },
  light: {
    serialize: booleanSerializer,
  },
  onAfterInput: {
    event: 'bx-search-input',
  },
});

const sizes = {
  [`Small size (${SEARCH_SIZE.SMALL})`]: SEARCH_SIZE.SMALL,
  [`Regular size (${SEARCH_SIZE.REGULAR})`]: SEARCH_SIZE.REGULAR,
};

const createProps = () => ({
  closeButtonAssistiveText: text('The label text for the close button (close-button-assistive-text)', 'Clear search input'),
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
  .add('Default', () => {
    const {
      closeButtonAssistiveText,
      disabled,
      light,
      labelText,
      name,
      placeholder,
      size,
      type,
      value,
      onAfterInput,
    } = createProps();
    return (
      <BXSearch
        closeButtonAssistiveText={closeButtonAssistiveText}
        disabled={disabled}
        light={light}
        labelText={labelText}
        name={name}
        placeholder={placeholder}
        size={size}
        type={type}
        value={value}
        onAfterInput={onAfterInput}
      />
    );
  });
