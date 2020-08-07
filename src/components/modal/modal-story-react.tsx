/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import '../button/button';
// Below path will be there when an application installs `carbon-web-components` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the generated file.
// @ts-ignore
import BXBtn from 'carbon-web-components/es/components-react/button/button';
// @ts-ignore
import BXModal from 'carbon-web-components/es/components-react/modal/modal';
// @ts-ignore
import BXModalHeader from 'carbon-web-components/es/components-react/modal/modal-header';
// @ts-ignore
import BXModalCloseButton from 'carbon-web-components/es/components-react/modal/modal-close-button';
// @ts-ignore
import BXModalHeading from 'carbon-web-components/es/components-react/modal/modal-heading';
// @ts-ignore
import BXModalLabel from 'carbon-web-components/es/components-react/modal/modal-label';
// @ts-ignore
import BXModalBody from 'carbon-web-components/es/components-react/modal/modal-body';
// @ts-ignore
import BXModalFooter from 'carbon-web-components/es/components-react/modal/modal-footer';
import { defaultStory as baseDefaultStory } from './modal-story';

export { default } from './modal-story';

export const defaultStory = ({ parameters }) => {
  const { open, size, disableClose, onBeforeClose, onClose } = parameters?.props?.['bx-modal'];
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return (
    <BXModal open={open} size={size} onBeforeClose={handleBeforeClose} onClose={onClose}>
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
