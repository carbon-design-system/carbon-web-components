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
import BXBtn from 'carbon-custom-elements/es/components-react/button/button';
import { defaultStory as baseDefaultStory } from './button-story';

export { default } from './button-story';

export const defaultStory = ({ parameters }) => {
  const { kind, disabled, small, href } = parameters?.props['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} small={small} href={href}>
      Button
    </BXBtn>
  );
};

defaultStory.story = baseDefaultStory.story;
