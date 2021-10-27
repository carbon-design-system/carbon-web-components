/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';

export const Default = () =>
  html`
    BX-Input:

    <bx-input></bx-input>

    Regular input:
    <input />
  `;

Default.storyName = 'Default';

export default {
  title: 'Components/Input',
};
