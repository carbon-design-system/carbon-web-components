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
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXToggle from 'carbon-custom-elements/es/components-react/toggle/toggle';
import { defaultStory as baseDefaultStory } from './toggle-story';

export { default } from './toggle-story';

export const defaultStory = ({ parameters }) => {
  const { checked, checkedText, disabled, labelText, name, small, uncheckedText, value, onInput } = parameters?.props[
    'bx-toggle'
  ];
  return (
    <BXToggle
      checked={checked}
      checkedText={checkedText}
      disabled={disabled}
      labelText={labelText}
      name={name}
      small={small}
      uncheckedText={uncheckedText}
      value={value}
      onInput={onInput}
    />
  );
};

defaultStory.story = baseDefaultStory.story;
