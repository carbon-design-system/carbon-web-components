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
import BXLink from 'carbon-web-components/es/components-react/link/link';
import { defaultStory as baseDefaultStory } from './link-story';

export { default } from './link-story';

export const defaultStory = ({ parameters }) => {
  const { disabled, href, onClick } = parameters?.props?.['bx-link'];
  return (
    <BXLink disabled={disabled} href={href} onClick={onClick}>
      Link
    </BXLink>
  );
};

defaultStory.story = baseDefaultStory.story;
