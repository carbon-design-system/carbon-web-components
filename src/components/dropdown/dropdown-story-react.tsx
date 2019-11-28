/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXDropdown from 'carbon-custom-elements/es/components-react/dropdown/dropdown';
// @ts-ignore
import BXDropdownItem from 'carbon-custom-elements/es/components-react/dropdown/dropdown-item';
import { defaultStory as baseDefaultStory } from './dropdown-story';

export { default } from './dropdown-story';

export const defaultStory = ({ parameters }) => {
  const {
    open,
    disabled,
    helperText,
    labelText,
    light,
    toggleLabelClosed,
    toggleLabelOpen,
    triggerContent,
    value,
    disableSelection,
  } = parameters?.props?.['bx-dropdown'];
  const beforeSelectedAction = action('onBeforeSelect');
  const handleBeforeSelected = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return (
    <BXDropdown
      open={open}
      disabled={disabled}
      light={light}
      helperText={helperText}
      labelText={labelText}
      toggleLabelClosed={toggleLabelClosed}
      toggleLabelOpen={toggleLabelOpen}
      triggerContent={triggerContent}
      value={value}
      onBeforeSelect={handleBeforeSelected}
      onAfterSelect={action('onAfterSelect')}>
      <BXDropdownItem value="all">Option 1</BXDropdownItem>
      <BXDropdownItem value="cloudFoundry">Option 2</BXDropdownItem>
      <BXDropdownItem value="staging">Option 3</BXDropdownItem>
      <BXDropdownItem value="dea">Option 4</BXDropdownItem>
      <BXDropdownItem value="router">Option 5</BXDropdownItem>
    </BXDropdown>
  );
};

defaultStory.story = baseDefaultStory.story;
