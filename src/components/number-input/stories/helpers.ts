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
  value: number('Input value (value)', 0),
  min: number('Minimum value (min)', 0),
  max: number('Maximum value (max)', 100),
  step: number('Value to step the input by (step)', 1),
  placeholder: textNonEmpty('Placeholder text (placeholder)', 'Optional placeholder text'),
  invalid: boolean('Invalid (invalid)', false),
  onInput: action('input'),
  mobile: boolean('Mobile mode (mobile)', false),
  hideLabel: boolean('Hide label (hideLabel', false),
  light: boolean('Light variant (light)', false),
});

export default createProps;
