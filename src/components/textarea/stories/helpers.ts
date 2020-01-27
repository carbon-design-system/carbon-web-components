/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';

const createProps = ({ boolean, textNonEmpty, number }) => ({
  disabled: boolean('Disabled (disabled)', false),
  value: textNonEmpty('Input value (value)', ''),
  placeholder: textNonEmpty('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  rows: number('Number of rows (rows)', 4),
  cols: number('Number of columns (cols)', 50),
});

export default createProps;
