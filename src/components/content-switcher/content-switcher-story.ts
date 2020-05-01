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
import { boolean } from '@storybook/addon-knobs';
import textNullable from '../../../.storybook/knob-text-nullable';
import ifNonNull from '../../globals/directives/if-non-null';
import './content-switcher';
import './content-switcher-item';
import storyDocs from './content-switcher-story.mdx';

const noop = () => {};

export const defaultStory = ({ parameters }) => {
  const { value, disableSelection, onBeforeSelect = noop, onSelect = noop } = parameters?.props?.['bx-content-switcher'] ?? {};
  const handleBeforeSelected = (event: CustomEvent) => {
    onBeforeSelect(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <bx-content-switcher
      value="${ifNonNull(value)}"
      @bx-content-switcher-beingselected="${handleBeforeSelected}"
      @bx-content-switcher-selected="${onSelect}"
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
  title: 'Components/Content switcher',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-content-switcher': () => ({
        value: textNullable('The value of the selected item (value)', ''),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
          false
        ),
        onBeforeSelect: action('bx-content-switcher-beingselected'),
        onSelect: action('bx-content-switcher-selected'),
      }),
    },
  },
};
