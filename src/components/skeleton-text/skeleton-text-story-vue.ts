/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStory as baseDefaultStory } from './skeleton-text-story';

export { default } from './skeleton-text-story';

export const defaultStory = () => ({
  template: `
    <bx-skeleton-text></bx-skeleton-text>
  `,
});

export const lines = () => ({
  template: `
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
    <bx-skeleton-text type="line"></bx-skeleton-text>
  `,
});

lines.story = {
  decorators: [
    () => ({
      template: `<div style="width: 300px"><story /></div>`,
    }),
  ],
};

defaultStory.story = baseDefaultStory.story;
