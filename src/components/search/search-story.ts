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
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import { SEARCH_SIZE } from './search';

const sizes = {
  [`Small size (${SEARCH_SIZE.SMALL})`]: SEARCH_SIZE.SMALL,
  [`Regular size (${SEARCH_SIZE.REGULAR})`]: SEARCH_SIZE.REGULAR,
};

const createProps = () => ({
  closeButtonAssistiveText: text('The label text for the close button (close-button-assistive-text)', 'Clear search input'),
  disabled: boolean('Disabled (disabled)', false),
  light: boolean('Light variant (light)', false),
  labelText: text('Label text (label-text)', 'Search'),
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
    return html`
      <bx-search
        close-button-assistive-text="${ifDefined(!closeButtonAssistiveText ? undefined : closeButtonAssistiveText)}"
        ?disabled="${disabled}"
        ?light="${light}"
        label-text="${labelText}"
        name="${ifDefined(!name ? undefined : name)}"
        placeholder="${ifDefined(!placeholder ? undefined : placeholder)}"
        size="${size}"
        type="${ifDefined(!type ? undefined : type)}"
        value="${ifDefined(!value ? undefined : value)}"
        @bx-search-input="${onAfterInput}"
      ></bx-search>
    `;
  });
