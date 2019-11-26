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
import BXTag from 'carbon-custom-elements/es/components-react/tag/tag';
// @ts-ignore
import BXFilterTag from 'carbon-custom-elements/es/components-react/tag/filter-tag';
import { defaultStory as baseDefaultStory, filter as baseFilter } from './tag-story';

export { default } from './tag-story';

export const defaultStory = ({ parameters }) => {
  const { type, title, disabled } = parameters?.props?.['bx-tag'];
  return (
    <BXTag type={type} title={title} disabled={disabled}>
      This is not a tag
    </BXTag>
  );
};

defaultStory.story = baseDefaultStory.story;

export const filter = ({ parameters }) => {
  const { type, title, disabled, onClick } = parameters?.props?.['bx-filter-tag'];
  return (
    <BXFilterTag type={type} title={title} disabled={disabled} click={onClick}>
      This is not a tag
    </BXFilterTag>
  );
};

filter.story = baseFilter.story;
