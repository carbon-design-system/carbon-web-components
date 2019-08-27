import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
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

const createProps = () => ({
  open: boolean('Open (open)', true),
  danger: boolean('Danger mode (danger)', false),
  disableClose: boolean('Disable user-initiated close action (Call event.preventDefault() in onBeforeClose event)', false),
});

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { danger, open, disableClose } = createProps();
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
  });
