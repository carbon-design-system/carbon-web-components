/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './skeleton-placeholder';

export const Default = () =>
  html`
    <bx-skeleton-placeholder></bx-skeleton-placeholder>
  `;

Default.storyName = 'Default';

Default.parameters = {
  percy: {
    skip: true,
  },
};

export default {
  title: 'Components/Skeleton placeholder',
};
