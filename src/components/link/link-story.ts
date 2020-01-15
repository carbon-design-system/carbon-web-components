/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { ifDefined } from 'lit-html/directives/if-defined';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './link';

export const defaultStory = ({ parameters }) => {
  const { disabled, href, onClick } = parameters?.props?.['bx-link'];
  return html`
    <bx-link ?disabled="${disabled}" href="${ifDefined(href || undefined)}" @click="${onClick}">
      Link
    </bx-link>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Link',
  parameters: {
    knobs: {
      'bx-link': () => ({
        disabled: boolean('Disabled (disabled)', false),
        href: text('Link href (href)', 'https://github.com/carbon-design-system/carbon-custom-elements'),
        onClick: action('click'),
      }),
    },
  },
};
