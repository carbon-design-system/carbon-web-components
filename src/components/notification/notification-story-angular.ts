/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs/angular';
import { NOTIFICATION_KIND } from './inline-notification';
import './toast-notification';

const kinds = {
  [`Success (${NOTIFICATION_KIND.SUCCESS})`]: NOTIFICATION_KIND.SUCCESS,
  [`Info (${NOTIFICATION_KIND.INFO})`]: NOTIFICATION_KIND.INFO,
  [`Warning (${NOTIFICATION_KIND.WARNING})`]: NOTIFICATION_KIND.WARNING,
  [`Error (${NOTIFICATION_KIND.ERROR})`]: NOTIFICATION_KIND.ERROR,
};

const createInlineProps = () => ({
  kind: select('The notification kind (kind)', kinds, NOTIFICATION_KIND.INFO),
  title: text('Title (title)', 'Notification title'),
  subtitle: text('Subtitle (subtitle)', 'Subtitle text goes here.'),
  hideCloseButton: boolean('Hide the close button (hide-close-button)', false),
  closeButtonLabel: text('a11y label for the close button (close-button-label)', ''),
  iconLabel: text('a11y label for the icon (icon-label)', ''),
  open: boolean('Open (open)', true),
  disableClose: boolean(
    'Disable user-initiated close action (Call event.preventDefault() in bx-notification-beingclosed event)',
    false
  ),
});

const createToastProps = () => ({
  ...createInlineProps(),
  caption: text('Caption (caption)', 'Time stamp [00:00:00]'),
});

storiesOf('Notifications', module)
  .addDecorator(withKnobs)
  .add(
    'Inline',
    () => ({
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
      })(createInlineProps()),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: `
Inline notifications show up in task flows, to notify users of the status of an action.
They usually appear at the top of the primary content area.
      `,
      },
    }
  )
  .add(
    'Toast',
    () => ({
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
      })(createToastProps()),
      moduleMetadata: {
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      },
    }),
    {
      docs: {
        storyDescription: `
Toasts are a non-modal, time-based window elements used to display short messages;
they usually appear at the bottom of the screen and disappear after a few seconds.
      `,
      },
    }
  );
