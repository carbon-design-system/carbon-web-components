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
import './tabs';
import './tab';
import styles from './tabs-story.scss';
import storyDocs from './tabs-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { disabled, triggerContent, value, disableSelection } = parameters?.props?.['bx-tabs'];
  const beforeSelectedAction = action('bx-tabs-beingselected');
  const handleBeforeSelected = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableSelection) {
      event.preventDefault();
    }
  };
  return html`
    <style>
      ${styles}
    </style>
    <bx-tabs
      ?disabled="${disabled}"
      trigger-content="${triggerContent}"
      value="${value}"
      @bx-tabs-beingselected="${handleBeforeSelected}"
      @bx-tabs-selected="${action('bx-tabs-selected')}"
    >
      <bx-tab id="tab-all" target="panel-all" value="all">Option 1</bx-tab>
      <bx-tab id="tab-cloudFoundry" target="panel-cloudFoundry" disabled value="cloudFoundry">Option 2</bx-tab>
      <bx-tab id="tab-staging" target="panel-staging" value="staging">Option 3</bx-tab>
      <bx-tab id="tab-dea" target="panel-dea" value="dea">Option 4</bx-tab>
      <bx-tab id="tab-router" target="panel-router" value="router">Option 5</bx-tab>
    </bx-tabs>
    <div class="bx-ce-demo-devenv--tab-panels">
      <div id="panel-all" role="tabpanel" aria-labelledby="tab-all" hidden>
        <h1>Content for option 1</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-cloudFoundry" role="tabpanel" aria-labelledby="tab-cloudFoundry" hidden>
        <h1>Content for option 2</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-staging" role="tabpanel" aria-labelledby="tab-staging" hidden>
        <h1>Content for option 3</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-dea" role="tabpanel" aria-labelledby="tab-dea" hidden>
        <h1>Content for option 4</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
      <div id="panel-router" role="tabpanel" aria-labelledby="tab-router" hidden>
        <h1>Content for option 5</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </div>
    </div>
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Tabs',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-tabs': () => ({
        disabled: boolean('Disabled (disabled)', false),
        triggerContent: text('The default content of the trigger button for narrow screen (trigger-content)', 'Select an item'),
        value: text('The value of the selected item (value)', 'staging'),
        disableSelection: boolean(
          'Disable user-initiated selection change (Call event.preventDefault() in bx-content-switcher-beingselected event)',
          false
        ),
      }),
    },
  },
};
