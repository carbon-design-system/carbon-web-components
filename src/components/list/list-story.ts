/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import './ordered-list';
import './unordered-list';
import './list-item';
import storyDocs from './list-story.mdx';

export const ordered = () => html`
  <bx-ordered-list>
    <bx-list-item>
      Ordered List level 1
      <bx-ordered-list>
        <bx-list-item>Ordered List level 2</bx-list-item>
        <bx-list-item>
          Ordered List level 2
          <bx-ordered-list>
            <bx-list-item>Ordered List level 2</bx-list-item>
            <bx-list-item>Ordered List level 2</bx-list-item>
          </bx-ordered-list>
        </bx-list-item>
      </bx-ordered-list>
    </bx-list-item>
    <bx-list-item>Ordered List level 1</bx-list-item>
    <bx-list-item>Ordered List level 1</bx-list-item>
  </bx-ordered-list>
`;

export const unordered = () => html`
  <bx-unordered-list>
    <bx-list-item>
      Unordered List level 1
      <bx-unordered-list>
        <bx-list-item>Unordered List level 2</bx-list-item>
        <bx-list-item>
          Unordered List level 2
          <bx-unordered-list>
            <bx-list-item>Unordered List level 2</bx-list-item>
            <bx-list-item>Unordered List level 2</bx-list-item>
          </bx-unordered-list>
        </bx-list-item>
      </bx-unordered-list>
    </bx-list-item>
    <bx-list-item>Unordered List level 1</bx-list-item>
    <bx-list-item>Unordered List level 1</bx-list-item>
  </bx-unordered-list>
`;

export default {
  title: 'Components/List',
  parameters: {
    ...storyDocs.parameters,
  },
};
