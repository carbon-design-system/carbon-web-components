/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { SEARCH_SIZE } from './search';
import storyDocs from './search-story.mdx';

const sizes = {
  [`Small size (${SEARCH_SIZE.SMALL})`]: SEARCH_SIZE.SMALL,
  [`Regular size (${SEARCH_SIZE.REGULAR})`]: null,
};

export const defaultStory = ({ parameters }) => {
  const { closeButtonAssistiveText, disabled, light, labelText, name, placeholder, size, type, value, onAfterInput } =
    parameters?.props?.['bx-search'] ?? {};
  return html`
    <bx-search
      close-button-assistive-text="${ifNonNull(closeButtonAssistiveText)}"
      ?disabled="${disabled}"
      ?light="${light}"
      label-text="${ifNonNull(labelText)}"
      name="${ifNonNull(name)}"
      placeholder="${ifNonNull(placeholder)}"
      size="${ifNonNull(size)}"
      type="${ifNonNull(type)}"
      value="${ifNonNull(value)}"
      @bx-search-input="${onAfterInput}"
    ></bx-search>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Search',
  parameters: {
    docs: storyDocs?.parameters?.docs,
    knobs: {
      'bx-search': () => ({
        closeButtonAssistiveText: textNullable(
          'The label text for the close button (close-button-assistive-text)',
          'Clear search input'
        ),
        disabled: boolean('Disabled (disabled)', false),
        light: boolean('Light variant (light)', false),
        labelText: textNullable('Label text (label-text)', 'Search'),
        name: textNullable('Name (name)', ''),
        placeholder: textNullable('Placeholder text (placeholder)', ''),
        size: select('Searh size (size)', sizes, null),
        type: textNullable('The type of the <input> (type)', ''),
        value: textNullable('Value (value)', ''),
        onAfterInput: action('bx-search-input'),
      }),
    },
  },
};
