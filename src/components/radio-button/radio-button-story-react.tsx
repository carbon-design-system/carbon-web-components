/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXRadioButtonGroup from 'carbon-custom-elements/es/components-react/radio-button/radio-button-group';
// @ts-ignore
import BXRadioButton from 'carbon-custom-elements/es/components-react/radio-button/radio-button';
import { defaultStory as baseDefaultStory } from './radio-button-story';

export { default } from './radio-button-story';

export const defaultStory = ({ parameters }) => {
  const { disabled, labelPosition, orientation, name, value, onAfterChange } = parameters?.props?.['bx-radio-button-group'];
  const { hideLabel, labelText } = parameters?.props?.['bx-radio-button'];
  return (
    <BXRadioButtonGroup
      disabled={disabled}
      labelPosition={labelPosition}
      orientation={orientation}
      name={name}
      value={value}
      onAfterChange={onAfterChange}>
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="all" />
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="cloudFoundry" />
      <BXRadioButton hideLabel={hideLabel} labelText={labelText} value="staging" />
    </BXRadioButtonGroup>
  );
};

defaultStory.story = baseDefaultStory.story;
