/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { storiesOf } from '@storybook/vue';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import '../button/button';
import './modal';
import './modal-header';
import './modal-close-button';
import './modal-heading';
import './modal-label';
import './modal-body';
import './modal-footer';

const createProps = () => ({
  open: boolean('Open (open)', true),
  danger: boolean('Danger mode (danger)', false),
  disableClose: boolean('Disable user-initiated close action (Call event.preventDefault() in bx-modal-beingclosed event)', false),
});

storiesOf('Modal', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <bx-modal
        :danger="danger"
        :open="open"
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
      (({ disableClose, ...rest }) => {
        const beforeSelectedAction = action('bx-modal-beingclosed');
        return {
          ...rest,
          handleBeforeClose: (event: CustomEvent) => {
            beforeSelectedAction(event);
            if (disableClose) {
              event.preventDefault();
            }
          },
          handleClose: action('bx-modal-closed'),
        };
      })(createProps())
    ),
  }));
