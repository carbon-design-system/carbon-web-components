/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { action } from '@storybook/addon-actions';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXAccordion from 'carbon-custom-elements/es/components-react/accordion/accordion';
// @ts-ignore
import BXAccordionItem from 'carbon-custom-elements/es/components-react/accordion/accordion-item';
import { defaultStory as baseDefaultStory } from './accordion-story';

export { default } from './accordion-story';

export const defaultStory = ({ parameters }) => {
  const { open, titleText, disableToggle } = parameters?.props?.['bx-accordion'];
  const beforeToggleAction = action('bx-accordion-item-beingtoggled');
  const handleBeforeToggle = (event: CustomEvent) => {
    beforeToggleAction(event);
    if (disableToggle) {
      event.preventDefault();
    }
  };
  return (
    <BXAccordion>
      <BXAccordionItem
        open={open}
        titleText={titleText}
        onBeforeToggle={handleBeforeToggle}
        onAfterToggle={action('onAfterToggle')}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </BXAccordionItem>
      <BXAccordionItem
        open={open}
        titleText={titleText}
        onBeforeToggle={handleBeforeToggle}
        onAfterToggle={action('onAfterToggle')}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
      </BXAccordionItem>
      <BXAccordionItem open={open} onBeforeToggle={handleBeforeToggle} onAfterToggle={action('onAfterToggle')}>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        <span slot="title">{titleText}</span>
      </BXAccordionItem>
    </BXAccordion>
  );
};

defaultStory.story = baseDefaultStory.story;
