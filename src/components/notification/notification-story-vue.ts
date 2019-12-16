/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { action } from '@storybook/addon-actions';
import createVueBindingsFromProps from '../../../.storybook/vue/create-vue-bindings-from-props';
import { inline as baseInline, toast as baseToast } from './notification-story';

export { default } from './notification-story';

export const inline = ({ parameters }) => ({
  template: `
    <bx-inline-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :hide-close-button="hideCloseButton"
      :close-button-label="closeButtonLabel"
      :icon-label="iconLabel"
      :open="open"
      @bx-notification-beingclosed="handleBeforeClose"
      @bx-notification-closed="handleClose"
    >
    </bx-inline-notification>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, ...rest }) => {
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
    })(parameters?.props?.['bx-inline-notification'])
  ),
});

inline.story = baseInline.story;

export const toast = ({ parameters }) => ({
  template: `
    <bx-toast-notification
      style="min-width: 30rem; margin-bottom: .5rem"
      :kind="kind"
      :title="title"
      :subtitle="subtitle"
      :caption="caption"
      :hide-close-button="hideCloseButton"
      :close-button-label="closeButtonLabel"
      :icon-label="iconLabel"
      :open="open"
      @bx-notification-beingclosed="handleBeforeClose"
      @bx-notification-closed="handleClose"
    >
    </bx-toast-notification>
  `,
  ...createVueBindingsFromProps(
    (({ disableClose, ...rest }) => {
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
    })(parameters?.props?.['bx-toast-notification'])
  ),
});

toast.story = baseToast.story;
