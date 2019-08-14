import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../globals/wrappers/createReactCustomElementType';
import { NOTIFICATION_KIND } from './inline-notification';
import './toast-notification';

const BXInlineNotification = createReactCustomElementType('bx-inline-notification', {
  hideCloseButton: {
    attribute: 'hide-close-button',
    serialize: booleanSerializer,
  },
  disabled: {
    serialize: booleanSerializer,
  },
  closeButtonLabel: {
    attribute: 'close-button-label',
  },
  iconLabel: {
    attribute: 'icon-label',
  },
  open: {
    serialize: booleanSerializer,
  },
  onBeforeClose: {
    event: 'bx-notification-beingclosed',
  },
  onClose: {
    event: 'bx-notification-closed',
  },
});

const BXToastNotification = createReactCustomElementType('bx-toast-notification', {
  hideCloseButton: {
    attribute: 'hide-close-button',
    serialize: booleanSerializer,
  },
  disabled: {
    serialize: booleanSerializer,
  },
  closeButtonLabel: {
    attribute: 'close-button-label',
  },
  iconLabel: {
    attribute: 'icon-label',
  },
  open: {
    serialize: booleanSerializer,
  },
  onBeforeClose: {
    event: 'bx-notification-beingclosed',
  },
  onClose: {
    event: 'bx-notification-closed',
  },
});

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
  .add('Inline', () => {
    const { kind, title, subtitle, hideCloseButton, closeButtonLabel, iconLabel, open, disableClose } = createInlineProps();
    const beforeSelectedAction = action('bx-notification-beingclosed');
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
        onClose={action('bx-notification-closed')}
      />
    );
  })
  .add('Toast', () => {
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
        onClose={action('bx-notification-closed')}
      />
    );
  });
