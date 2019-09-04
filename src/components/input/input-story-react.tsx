/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import * as knobs from '@storybook/addon-knobs';
import createProps from './stories/helpers';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXInput from 'carbon-custom-elements/es/components-react/input/input';
// @ts-ignore
import BXFormItem from 'carbon-custom-elements/es/components-react/form/form-item';


storiesOf('Input', module)
  .addDecorator(knobs.withKnobs)
  .add('Default', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return (
      <BXInput disabled={disabled} invalid={invalid} type={type} value={value} placeholder={placeholder} onInput={onInput} />
    );
  })
  .add('Form item', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return (
      <BXFormItem>
        <BXInput type={type} value={value} placeholder={placeholder} onInput={onInput} disabled={disabled} invalid={invalid}>
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </BXInput>
      </BXFormItem>
    );
  })
  .add('Without form item wrapper', () => {
    const { disabled, value, placeholder, invalid, type, onInput } = createProps(knobs);
    return (
        <BXInput type={type} value={value} placeholder={placeholder} onInput={onInput} disabled={disabled} invalid={invalid}>
          <span slot="label-text">Label text</span>
          <span slot="helper-text">Optional helper text</span>
          <span slot="validity-message">Something isn't right</span>
        </BXInput>
    );
  });
