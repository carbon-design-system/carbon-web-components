/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { action } from '@storybook/addon-actions';
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
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-inline-notification>
  `,
  props: (({ disableClose, ...rest }) => {
    const beforeSelectedAction = action('bx-notification-beingclosed');
    return {
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: action('bx-notification-closed'),
    };
  })(parameters?.props?.['bx-inline-notification']),
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
      (bx-notification-beingclosed)="handleBeforeClose($event)"
      (bx-notification-closed)="handleClose($event)"
    >
    </bx-toast-notification>
  `,
  props: (({ disableClose, ...rest }) => {
    const beforeSelectedAction = action('bx-notification-beingclosed');
    return {
      ...rest,
      handleBeforeClose: (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      },
      handleClose: action('bx-notification-closed'),
    };
  })(parameters?.props?.['bx-toast-notification']),
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
