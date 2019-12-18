/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXSkeletonPlaceholder from 'carbon-custom-elements/es/components-react/skeleton-placeholder/skeleton-placeholder';
import { defaultStory as baseDefaultStory } from './skeleton-placeholder-story';

export { default } from './skeleton-placeholder-story';

export const defaultStory = () => <BXSkeletonPlaceholder />;

defaultStory.story = baseDefaultStory.story;
