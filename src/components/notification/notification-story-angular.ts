/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2020
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { moduleMetadata } from '@storybook/angular';
import baseStory, { inline as baseInline, toast as baseToast } from './notification-story';

export const inline = ({ parameters }) => ({
  template: `
    <bx-inline-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      [kind]="kind"
      [title]="title"
      [subtitle]="subtitle"
      [hideCloseButton]="hideCloseButton"
      [closeButtonLabel]="closeButtonLabel"
      [iconLabel]="iconLabel"
      [open]="open"
      [timeout]="timeout"
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-inline-notification>
  `,
  props: (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
    ...rest,
    handleBeforeClose: (event: CustomEvent) => {
      onBeforeClose(event);
      if (disableClose) {
        event.preventDefault();
      }
    },
    handleClose: onClose,
  }))(parameters?.props?.['bx-inline-notification']),
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

inline.story = baseInline.story;

export const toast = ({ parameters }) => ({
  template: `
    <bx-toast-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      [kind]="kind"
      [title]="title"
      [subtitle]="subtitle"
      [caption]="caption"
      [hideCloseButton]="hideCloseButton"
      [closeButtonLabel]="closeButtonLabel"
      [iconLabel]="iconLabel"
      [open]="open"
      [timeout]="timeout"
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-toast-notification>
  `,
  props: (({ disableClose, onBeforeClose, onClose, ...rest }) => ({
    ...rest,
    handleBeforeClose: (event: CustomEvent) => {
      onBeforeClose(event);
      if (disableClose) {
        event.preventDefault();
      }
    },
    handleClose: onClose,
  }))(parameters?.props?.['bx-toast-notification']),
  moduleMetadata: {
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
  },
});

toast.story = baseToast.story;

export default Object.assign(baseStory, {
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
});
