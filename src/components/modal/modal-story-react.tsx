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
import '../button/button';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
import BXBtn from 'carbon-custom-elements/es/components-react/button/button';
// @ts-ignore
import BXModal from 'carbon-custom-elements/es/components-react/modal/modal';
// @ts-ignore
import BXModalHeader from 'carbon-custom-elements/es/components-react/modal/modal-header';
// @ts-ignore
import BXModalCloseButton from 'carbon-custom-elements/es/components-react/modal/modal-close-button';
// @ts-ignore
import BXModalHeading from 'carbon-custom-elements/es/components-react/modal/modal-heading';
// @ts-ignore
import BXModalLabel from 'carbon-custom-elements/es/components-react/modal/modal-label';
// @ts-ignore
import BXModalBody from 'carbon-custom-elements/es/components-react/modal/modal-body';
// @ts-ignore
import BXModalFooter from 'carbon-custom-elements/es/components-react/modal/modal-footer';
import { defaultStory as baseDefaultStory } from './modal-story';

export { default } from './modal-story';

export const defaultStory = ({ parameters }) => {
  const { danger, open, disableClose } = parameters?.props['bx-modal'];
  const beforeSelectedAction = action('onBeforeClose');
  const handleBeforeClose = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXModal danger={danger} open={open} onBeforeClose={handleBeforeClose} onAfterClose={action('onAfterClose')}>
      <BXModalHeader>
        <BXModalCloseButton />
        <BXModalLabel>Label (Optional)</BXModalLabel>
        <BXModalHeading>Modal Title</BXModalHeading>
      </BXModalHeader>
      <BXModalBody>
        <p>Modal text description</p>
      </BXModalBody>
      <BXModalFooter>
        <BXBtn kind="secondary" data-modal-close>
          Cancel
        </BXBtn>
        <BXBtn kind="primary">Save</BXBtn>
      </BXModalFooter>
    </BXModal>
  );
};

defaultStory.story = baseDefaultStory.story;
