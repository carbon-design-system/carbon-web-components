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
import { boolean } from '@storybook/addon-knobs';
import '../button/button';
import './modal';
import './modal-header';
import './modal-close-button';
import './modal-heading';
import './modal-label';
import './modal-body';
import './modal-footer';
import storyDocs from './modal-story.mdx';

export const defaultStory = ({ parameters }) => {
  const { danger, open, disableClose } = parameters?.props?.['bx-modal'];
  const beforeSelectedAction = action('bx-modal-beingclosed');
  const handleBeforeClose = (event: CustomEvent) => {
    beforeSelectedAction(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <bx-modal
      ?danger="${danger}"
      ?open="${open}"
      @bx-modal-beingclosed=${handleBeforeClose}
      @bx-modal-closed=${action('bx-modal-closed')}
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
  `;
};

defaultStory.story = {
  name: 'Default',
};

export default {
  title: 'Modal',
  parameters: {
    docs: storyDocs.parameters.docs,
    knobs: {
      'bx-modal': () => ({
        open: boolean('Open (open)', true),
        danger: boolean('Danger mode (danger)', false),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in bx-modal-beingclosed event)',
          false
        ),
      }),
    },
  },
};
