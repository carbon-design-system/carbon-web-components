/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXTag from 'carbon-custom-elements/es/components-react/tag/tag';
// @ts-ignore
import BXFilterTag from 'carbon-custom-elements/es/components-react/tag/filter-tag';
import { TAG_TYPE } from './tag';

const createDefaultProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  title: 'Clear Selection',
  type: select(
    'Tag type (type)',
    Object.values(TAG_TYPE).reduce(
      (acc, type) => ({
        ...acc,
        [`${type} (${type})`]: type,
      }),
      {}
    ),
    'red'
  ),
});

const createFilterProps = () => ({
  ...createDefaultProps(),
  onClick: action('click'),
});

storiesOf('Tag', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { type, title, disabled } = createDefaultProps();
    return (
      <BXTag type={type} title={title} disabled={disabled}>
        This is not a tag
      </BXTag>
    );
  })
  .add('Filter', () => {
    const { type, title, disabled, onClick } = createFilterProps();
    return (
      <BXFilterTag type={type} title={title} disabled={disabled} click={onClick}>
        This is not a tag
      </BXFilterTag>
    );
  });
