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
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
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
  .add('Default', () => ({
    template: `
      <bx-search
        :close-button-assistive-text="closeButtonAssistiveText"
        :disabled="disabled"
        :light="light"
        :label-text="labelText"
        :name="name"
        :placeholder="placeholder"
        :size="size"
        :type="type"
        :value="value"
        @bx-search-input="onAfterInput"
      ></bx-search>
    `,
    ...createVueBindingsFromProps(createProps()),
  }));
