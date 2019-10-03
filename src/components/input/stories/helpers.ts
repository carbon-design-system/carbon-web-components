/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import { INPUT_TYPE } from '../input';

const inputTypes = {};

const keys = Object.keys(INPUT_TYPE);
for (let i = 0; i < keys.length; i++) {
  const key = keys[i];
  const value = keys[key];
  inputTypes[key.toLowerCase()] = value;
}

const createProps = ({ boolean, text, select }) => ({
  disabled: boolean('Disabled (disabled)', false),
  value: text('Input value (value)', ''),
  placeholder: text('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  type: select('Input type (type)', inputTypes, INPUT_TYPE.TEXT),
});

export default createProps;
