/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import { SKELETON_TEXT_TYPE } from './skeleton-text';
import storyDocs from './skeleton-text-story.mdx';

const types = {
  Regular: null,
  [`Heading (${SKELETON_TEXT_TYPE.HEADING})`]: SKELETON_TEXT_TYPE.HEADING,
};

export const defaultStory = ({ parameters }) => {
  const { type } = parameters?.props?.['bx-skeleton-text'] ?? {};
  return html`
    <bx-skeleton-text type="${ifNonNull(type)}"></bx-skeleton-text>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    knobs: {
      'bx-skeleton-text': () => ({
        type: select('Skeleton text type (type)', types, null),
      }),
    },
  },
};

export const lines = () => html`
  <bx-skeleton-text type="line"></bx-skeleton-text>
  <bx-skeleton-text type="line"></bx-skeleton-text>
  <bx-skeleton-text type="line"></bx-skeleton-text>
`;

lines.story = {
  decorators: [
    story =>
      html`
        <div style="width:300px">${story()}</div>
      `,
  ],
};

export default {
  title: 'Components/Skeleton text',
  parameters: {
    percy: {
      skip: true,
    },
    docs: {
      page: storyDocs,
    },
  },
};
