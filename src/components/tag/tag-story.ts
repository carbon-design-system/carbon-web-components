/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, select } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import { TAG_TYPE } from './tag';
import './filter-tag';
import storyDocs from './tag-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { type, title, disabled } = parameters?.props?.['bx-tag'] ?? {};
  return html`
    <bx-tag type=${ifNonNull(type)} title=${ifNonNull(title)} ?disabled=${disabled}>
      This is not a tag
    </bx-tag>
  `;
};

defaultStory.story = {
  name: 'Default',
  parameters: {
    knobs: {
      'bx-tag': () => ({
        disabled: boolean('Disabled (disabled)', false),
        title: textNullable('Title (title)', 'Clear Selection'),
        type: select(
          'Tag type (type)',
          Object.values(TAG_TYPE).reduce(
            (acc, type) => ({
              ...acc,
              [`${type} (${type})`]: type,
            }),
            {}
          ),
          'gray'
        ),
      }),
    },
  },
};

export const filter = ({ parameters }) => {
  const { type, title, disabled, onClick } = parameters?.props?.['bx-filter-tag'] ?? {};
  return html`
    <bx-filter-tag type=${ifNonNull(type)} title=${ifNonNull(title)} ?disabled=${disabled} @click=${onClick} filter>
      This is not a tag
    </bx-filter-tag>
  `;
};

filter.story = {
  parameters: {
    knobs: {
      'bx-filter-tag': () => ({
        ...defaultStory.story.parameters.knobs['bx-tag'](),
        onClick: action('click'),
      }),
    },
  },
};

export default {
  parameters: {
    docs: {
      page: storyDocs,
    },
  },
  title: 'Components/Tag',
};
