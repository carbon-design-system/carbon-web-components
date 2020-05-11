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
import { boolean, select } from '@storybook/addon-knobs';
import ifNonNull from '../../globals/directives/if-non-null';
import '../button/button';
import { MODAL_SIZE } from './modal';
import './modal-header';
import './modal-close-button';
import './modal-heading';
import './modal-label';
import './modal-body';
import './modal-footer';
import storyDocs from './modal-story.mdx';

const sizes = {
  [`Extra small size (${MODAL_SIZE.EXTRA_SMALL})`]: MODAL_SIZE.EXTRA_SMALL,
  [`Small size (${MODAL_SIZE.SMALL})`]: MODAL_SIZE.SMALL,
  [`Regular size`]: null,
  [`Large size (${MODAL_SIZE.LARGE})`]: MODAL_SIZE.LARGE,
};

export const defaultStory = ({ parameters }) => {
  const { open, size, disableClose, onBeforeClose, onClose } = parameters?.props?.['bx-modal'] ?? {};
  const handleBeforeClose = (event: CustomEvent) => {
    onBeforeClose(event);
    if (disableClose) {
      event.preventDefault();
    }
  };
  return html`
    <bx-modal ?open="${open}" size="${ifNonNull(size)}" @bx-modal-beingclosed=${handleBeforeClose} @bx-modal-closed=${onClose}>
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
  title: 'Components/Modal',
  parameters: {
    docs: {
      page: storyDocs,
    },
    knobs: {
      'bx-modal': () => ({
        open: boolean('Open (open)', true),
        danger: boolean('Danger mode (danger)', false),
        disableClose: boolean(
          'Disable user-initiated close action (Call event.preventDefault() in bx-modal-beingclosed event)',
          false
        ),
        size: select('Modal size (size)', sizes, null),
        onBeforeClose: action('bx-modal-beingclosed'),
        onClose: action('bx-modal-closed'),
      }),
    },
  },
};
