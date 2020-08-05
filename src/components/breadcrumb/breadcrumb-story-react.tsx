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
import BXBreadcrumb from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb';
// @ts-ignore
import BXBreadcrumbItem from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb-item';
// @ts-ignore
import BXBreadcrumbLink from 'carbon-web-components/es/components-react/breadcrumb/breadcrumb-link';
import { defaultStory as baseDefaultStory } from './breadcrumb-story';

export { default } from './breadcrumb-story';

export const defaultStory = () => (
  <BXBreadcrumb>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#">Breadcrumb 1</BXBreadcrumbLink>
    </BXBreadcrumbItem>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#">Breadcrumb 2</BXBreadcrumbLink>
    </BXBreadcrumbItem>
    <BXBreadcrumbItem>
      <BXBreadcrumbLink href="/#" aria-current="page">
        Breadcrumb 3
      </BXBreadcrumbLink>
    </BXBreadcrumbItem>
  </BXBreadcrumb>
);

defaultStory.story = baseDefaultStory.story;
