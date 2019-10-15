/**
 * @license
 *
 * Copyright IBM Corp. 2019
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html, render, TemplateResult } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined';
/* eslint-disable import/no-duplicates */
import BXInlineNotification, { NOTIFICATION_KIND } from '../../src/components/notification/inline-notification';
// Above import is interface-only ref and thus code won't be brought into the build
import '../../src/components/notification/inline-notification';
/* eslint-enable import/no-duplicates */

const template = ({
  hasContent = true,
  closeButtonLabel,
  hideCloseButton,
  iconLabel,
  kind,
  open,
  subtitle,
  title,
}: {
  hasContent?: boolean;
  closeButtonLabel?: string;
  hideCloseButton?: boolean;
  iconLabel?: string;
  kind?: NOTIFICATION_KIND;
  open?: boolean;
  subtitle?: string;
  title?: string;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-inline-notification
          close-button-label="${ifDefined(closeButtonLabel)}"
          ?hide-close-button="${ifDefined(hideCloseButton)}"
          icon-label="${ifDefined(iconLabel)}"
          kind="${ifDefined(kind)}"
          ?open="${ifDefined(open)}"
          subtitle="${ifDefined(subtitle)}"
          title="${ifDefined(title)}"
        ></bx-inline-notification>
      `;

describe('bx-inline-notification', function() {
  describe('Rendering titles', function() {
    it('Should render with minimum attributes', async function() {
      render(template(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-inline-notification')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        template({
          closeButtonLabel: 'close-button-label-foo',
          hideCloseButton: true,
          iconLabel: 'icon-label-foo',
          kind: NOTIFICATION_KIND.INFO,
          open: false,
          subtitle: 'subtitle-foo',
          title: 'title-foo',
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-inline-notification')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });

  describe('Closing', function() {
    let notification: BXInlineNotification | null;

    beforeEach(async function() {
      render(template(), document.body);
      await Promise.resolve();
      notification = document.body.querySelector('bx-inline-notification');
    });

    it('Should support closing', async function() {
      expect(notification!.open).toBe(true);
      notification!.shadowRoot!.querySelector('button')!.click();
      await Promise.resolve();
      expect(notification!.open).toBe(false);
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});
