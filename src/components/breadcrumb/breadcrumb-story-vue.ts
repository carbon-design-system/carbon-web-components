/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { defaultStory as baseDefaultStory } from './breadcrumb-story';

export { default } from './breadcrumb-story';

export const defaultStory = () => ({
  template: `
    <bx-breadcrumb>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 1</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#">Breadcrumb 2</bx-breadcrumb-link>
      </bx-breadcrumb-item>
      <bx-breadcrumb-item>
        <bx-breadcrumb-link href="/#" aria-current="page">Breadcrumb 3</bx-breadcrumb-link>
      </bx-breadcrumb-item>
    </bx-breadcrumb>
  `,
});

defaultStory.story = baseDefaultStory.story;
