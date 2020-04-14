/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, svg } from 'lit-html';

import Add16 from '@carbon/icons/lib/add/16';
import Add20 from '@carbon/icons/lib/add/20';
import Add24 from '@carbon/icons/lib/add/24';
import Add32 from '@carbon/icons/lib/add/32';

export const defaultStory = () => html`
  ${Add16()} ${Add20()} ${Add24()} ${Add32()}
`;

defaultStory.story = {
  name: 'Default',
};

export const withCustomClass = () => html`
  <style>
    .test-class {
      fill: #0062ff;
    }
  </style>
  ${Add16({ class: 'test-class' })} ${Add20({ class: 'test-class' })} ${Add24({ class: 'test-class' })}
  ${Add32({ class: 'test-class' })}
`;

withCustomClass.story = {
  name: 'With custom class',
};

export const withAriaLabel = () => html`
  ${Add16({ 'aria-label': 'add' })} ${Add20({ 'aria-label': 'add' })} ${Add24({ 'aria-label': 'add' })}
  ${Add32({ 'aria-label': 'add' })}
`;

withAriaLabel.story = {
  name: 'With aria-label',
};

export const withTitle = () => html`
  ${Add16({
    'aria-describedby': 'id-title-1',
    children: svg`<title id="id-title-1">add</title>`,
  })}
  ${Add20({
    'aria-describedby': 'id-title-2',
    children: svg`<title id="id-title-2">add</title>`,
  })}
  ${Add24({
    'aria-describedby': 'id-title-3',
    children: svg`<title id="id-title-3">add</title>`,
  })}
  ${Add32({
    'aria-describedby': 'id-title-4',
    children: svg`<title id="id-title-4">add</title>`,
  })}
`;

withTitle.story = {
  name: 'With title',
};

export default {
  title: 'Components/Icon',
};
