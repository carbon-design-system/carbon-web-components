/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { defaultStory as baseDefaultStory } from './inline-loading-story';

export { default } from './inline-loading-story';

export const defaultStory = ({ parameters }) => {
  const { status } = parameters?.props['bx-inline-loading'];
  return <bx-inline-loading status={status}>Loading data...</bx-inline-loading>;
};

defaultStory.story = baseDefaultStory.story;
