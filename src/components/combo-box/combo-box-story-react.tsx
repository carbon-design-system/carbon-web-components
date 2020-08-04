/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXComboBox from 'carbon-web-components/es/components-react/combo-box/combo-box';
// @ts-ignore
import BXComboBoxItem from 'carbon-web-components/es/components-react/combo-box/combo-box-item';
import { defaultStory as baseDefaultStory } from './combo-box-story';

export { default } from './combo-box-story';

export const defaultStory = ({ parameters }) => {
  const {
    open,
    colorScheme,
    disabled,
    helperText,
    invalid,
    labelText,
    light,
    size,
    type,
    validityMessage,
    value,
    triggerContent,
    disableSelection,
    onBeforeSelect,
    onSelect,
  } = parameters?.props?.['bx-combo-box'];
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return (
    <BXComboBox
      open={open}
      colorScheme={colorScheme}
      disabled={disabled}
      invalid={invalid}
      light={light}
      helperText={helperText}
      labelText={labelText}
      size={size}
      type={type}
      validityMessage={validityMessage}
      value={value}
      triggerContent={triggerContent}
      onBeforeSelect={handleBeforeSelected}
      onSelect={onSelect}>
      <BXComboBoxItem value="all">Option 1</BXComboBoxItem>
      <BXComboBoxItem value="cloudFoundry">Option 2</BXComboBoxItem>
      <BXComboBoxItem value="staging">Option 3</BXComboBoxItem>
      <BXComboBoxItem value="dea">Option 4</BXComboBoxItem>
      <BXComboBoxItem value="router">Option 5</BXComboBoxItem>
    </BXComboBox>
  );
};

defaultStory.story = baseDefaultStory.story;
