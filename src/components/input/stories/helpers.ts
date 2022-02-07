/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2022
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import { INPUT_COLOR_SCHEME, INPUT_SIZE, INPUT_TYPE } from '../input';

const inputTypes = Object.entries(INPUT_TYPE).reduce(
  (acc, [key, val]) => ({
    ...acc,
    [`${key.toLowerCase()}`]: val,
  }),
  {}
);

const sizes = {
  Regular: null,
  [`Small size (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Extra large size (${INPUT_SIZE.EXTRA_LARGE})`]: INPUT_SIZE.EXTRA_LARGE,
};

const colorSchemes = {
  [`Regular`]: null,
  [`Light (${INPUT_COLOR_SCHEME.LIGHT})`]: INPUT_COLOR_SCHEME.LIGHT,
};

const createProps = ({ boolean, textNonEmpty, select }) => ({
  colorScheme: select('Color scheme (color-scheme)', colorSchemes, null),
  disabled: boolean('Disabled (disabled)', false),
  value: textNonEmpty('Input value (value)', ''),
  placeholder: textNonEmpty('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  size: select('Input size (size)', sizes, INPUT_SIZE.REGULAR),
  type: select('Input type (type)', inputTypes, INPUT_TYPE.TEXT),
});

export default createProps;
