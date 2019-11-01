/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
// Below path will be there when an application installs `carbon-custom-elements` package.
// In our dev env, we auto-generate the file and re-map below path to to point to the genrated file.
// @ts-ignore
// prettier-ignore
// eslint-disable-next-line max-len
import BXInlineNotification, { NOTIFICATION_KIND } from 'carbon-custom-elements/es/components-react/notification/inline-notification';
// @ts-ignore
import BXToastNotification from 'carbon-custom-elements/es/components-react/notification/toast-notification';

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
  hideCloseButton: boolean('Hide the close button (hideCloseButton)', false),
  closeButtonLabel: text('a11y label for the close button (closeButtonLabel)', ''),
  iconLabel: text('a11y label for the icon (iconLabel)', ''),
  open: boolean('Open (open)', true),
  disableClose: boolean('Disable user-initiated close action (Call event.preventDefault() in onBeforeClose event)', false),
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
      const beforeSelectedAction = action('onBeforeClose');
      const handleBeforeClose = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      };
      return (
        <BXInlineNotification
          style={{ minWidth: '30rem', marginBottom: '.5rem' }}
          kind={kind}
          title={title}
          subtitle={subtitle}
          hideCloseButton={hideCloseButton}
          closeButtonLabel={closeButtonLabel}
          iconLabel={iconLabel}
          open={open}
          onBeforeClose={handleBeforeClose}
          onClose={action('onAfterClose')}
        />
      );
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
      const beforeSelectedAction = action('onBeforeClose');
      const handleBeforeClose = (event: CustomEvent) => {
        beforeSelectedAction(event);
        if (disableClose) {
          event.preventDefault();
        }
      };
      return (
        <BXToastNotification
          style={{ minWidth: '30rem', marginBottom: '.5rem' }}
          kind={kind}
          title={title}
          subtitle={subtitle}
          caption={caption}
          hideCloseButton={hideCloseButton}
          closeButtonLabel={closeButtonLabel}
          iconLabel={iconLabel}
          open={open}
          onBeforeClose={handleBeforeClose}
          onClose={action('onAfterClose')}
        />
      );
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
