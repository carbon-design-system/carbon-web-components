/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { ifDefined } from 'lit-html/directives/if-defined';
import { html } from 'lit-element';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
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
    () => {
      const { kind, title, subtitle, hideCloseButton, closeButtonLabel, iconLabel, open, disableClose } = createInlineProps();
      const beforeSelectedAction = action('bx-notification-beingclosed');
      const handleBeforeClose = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      };
      return html`
        <bx-inline-notification
          style="min-width: 30rem; margin-bottom: .5rem"
          kind="${kind}"
          title="${title}"
          subtitle="${subtitle}"
          ?hide-close-button="${hideCloseButton}"
          close-button-label="${ifDefined(!closeButtonLabel ? undefined : closeButtonLabel)}"
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          ?open="${open}"
          @bx-notification-beingclosed="${handleBeforeClose}"
          @bx-notification-closed="${action('bx-notification-closed')}"
        >
        </bx-inline-notification>
      `;
    },
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
    () => {
      const {
        kind,
        title,
        subtitle,
        caption,
        hideCloseButton,
        closeButtonLabel,
        iconLabel,
        open,
        disableClose,
      } = createToastProps();
      const beforeSelectedAction = action('bx-notification-beingclosed');
      const handleBeforeClose = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      };
      return html`
        <bx-toast-notification
          style="min-width: 30rem; margin-bottom: .5rem"
          kind="${kind}"
          title="${title}"
          subtitle="${subtitle}"
          caption="${caption}"
          ?hide-close-button="${hideCloseButton}"
          close-button-label="${ifDefined(!closeButtonLabel ? undefined : closeButtonLabel)}"
          icon-label="${ifDefined(!iconLabel ? undefined : iconLabel)}"
          ?open="${open}"
          @bx-notification-beingclosed="${handleBeforeClose}"
          @bx-notification-closed="${action('bx-notification-closed')}"
        >
        </bx-toast-notification>
      `;
    },
    {
      docs: {
        storyDescription: `
Toasts are non-modal, time-based window elements used to display short messages;
they usually appear at the bottom of the screen and disappear after a few seconds.
      `,
      },
    }
  );
