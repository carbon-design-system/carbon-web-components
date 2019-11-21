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
import { withKnobs, boolean, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXTabs from 'carbon-custom-elements/es/components-react/tabs/tabs';
// @ts-ignore
import BXTab from 'carbon-custom-elements/es/components-react/tabs/tab';
import styles from './tabs-story.scss';

const createProps = () => ({
  disabled: boolean('Disabled (disabled)', false),
  triggerContent: text('The default content of the trigger button for narrow screen (trigger-content)', 'Select an item'),
  value: text('The value of the selected item (value)', ''),
  disableSelection: boolean(
    'Disable user-initiated selection change (Call event.preventDefault() in bx-tabs-beingselected event)',
    false
  ),
});

storiesOf('Tabs', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { disabled, triggerContent, value, disableSelection } = createProps();
    const beforeSelectedAction = action('bx-tabs-beingselected');
    const handleBeforeSelected = (event: CustomEvent) => {
      beforeSelectedAction(event);
      if (disableSelection) {
        event.preventDefault();
      }
    };
    return (
      <>
        <style type="text/css">{styles.cssText}</style>
        <BXTabs
          disabled={disabled}
          triggerContent={triggerContent}
          value={value}
          onBeforeSelect={handleBeforeSelected}
          onAfterSelect={action('bx-tabs-selected')}>
          <BXTab id="tab-all" target="panel-all" value="all">
            Option 1
          </BXTab>
          <BXTab id="tab-cloudFoundry" target="panel-cloudFoundry" value="cloudFoundry" disabled>
            Option 2
          </BXTab>
          <BXTab id="tab-staging" target="panel-staging" value="staging">
            Option 3
          </BXTab>
          <BXTab id="tab-dea" target="panel-dea" value="dea">
            Option 4
          </BXTab>
          <BXTab id="tab-router" target="panel-router" value="router">
            Option 5
          </BXTab>
        </BXTabs>
        <div className="bx-ce-demo-devenv--tab-panels">
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
      </>
    );
  });
