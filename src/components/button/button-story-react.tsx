/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Add16 from '@carbon/icons-react/es/add/16';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBtn from 'carbon-web-components/es/components-react/button/button';
// @ts-ignore
import BXBtnSkeleton from 'carbon-web-components/es/components-react/button/button-skeleton';
import { defaultStory as baseDefaultStory, textAndIcon as baseTextAndIcon, skeleton as baseSkeleton } from './button-story';

export { default } from './button-story';

export const defaultStory = ({ parameters }) => {
  const { kind, disabled, size, href } = parameters?.props?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href}>
      Button
    </BXBtn>
  );
};

defaultStory.story = baseDefaultStory.story;

export const icon = ({ parameters }) => {
  const { kind, disabled, size, href } = parameters?.props?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href}>
      <Add16 slot="icon" />
    </BXBtn>
  );
};

export const textAndIcon = ({ parameters }) => {
  const { kind, disabled, size, href } = parameters?.props?.['bx-btn'];
  return (
    <BXBtn kind={kind} disabled={disabled} size={size} href={href}>
      Button <Add16 slot="icon" />
    </BXBtn>
  );
};

textAndIcon.story = baseTextAndIcon.story;

export const skeleton = ({ parameters }) => {
  const { disabled, size, href } = parameters?.props?.['bx-btn-skeleton'];
  return <BXBtnSkeleton disabled={disabled} size={size} href={href}></BXBtnSkeleton>;
};

skeleton.story = baseSkeleton.story;
