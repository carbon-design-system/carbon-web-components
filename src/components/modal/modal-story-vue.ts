/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { defaultStory as baseDefaultStory } from './modal-story';

export { default } from './modal-story';

export const defaultStory = ({ parameters }) => ({
  template: `
    <bx-modal
      :open="open"
      :size="size"
      @bx-modal-beingclosed="handleBeforeClose"
      @bx-modal-closed="handleClose"
    >
      <bx-modal-header>
        <bx-modal-close-button></bx-modal-close-button>
        <bx-modal-label>Label (Optional)</bx-modal-label>
        <bx-modal-heading>Modal Title</bx-modal-heading>
      </bx-modal-header>
      <bx-modal-body><p>Modal text description</p></bx-modal-body>
      <bx-modal-footer>
        <bx-btn kind="secondary" data-modal-close>Cancel</bx-btn>
        <bx-btn kind="primary">Save</bx-btn>
      </bx-modal-footer>
    </bx-modal>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        onBeforeClose(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: onClose,
    }))(parameters?.props?.['bx-modal'])
  ),
});

defaultStory.story = baseDefaultStory.story;
