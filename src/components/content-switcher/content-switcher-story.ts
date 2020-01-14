/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit-element';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';
import './content-switcher';
import './content-switcher-item';
import storyDocs from './content-switcher-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { disabled, value, disableSelection } = parameters?.props?.['bx-content-switcher'];
  const beforeSelectedAction = action('bx-content-switcher-beingselected');
  const handleBeforeSelected = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-content-switcher
      ?disabled="${disabled}"
      value="${value}"
      @bx-content-switcher-beingselected="${handleBeforeSelected}"
      @bx-content-switcher-selected="${action('bx-content-switcher-selected')}"
    >
      <bx-content-switcher-item value="all">Option 1</bx-content-switcher-item>
      <bx-content-switcher-item value="cloudFoundry" disabled>Option 2</bx-content-switcher-item>
      <bx-content-switcher-item value="staging">Option 3</bx-content-switcher-item>
      <bx-content-switcher-item value="dea">Option 4</bx-content-switcher-item>
      <bx-content-switcher-item value="router">Option 5</bx-content-switcher-item>
    </bx-content-switcher>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Content switcher',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-content-switcher': () => ({
        disabled: boolean('Disabled (disabled)', false),
        value: text('The value of the selected item (value)', ''),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
          false
        ),
      }),
    },
  },
};
