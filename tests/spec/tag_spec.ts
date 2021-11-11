/**
 * @license
 *
 * Copyright IBM Corp. 2019, 2021
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { render } from 'lit-html';
import EventManager from '../utils/event-manager';
import { filter } from '../../src/components/tag/tag-story';

const filterTemplate = (props?) =>
  filter({
    'bx-filter-tag': props,
  });

describe('bx-filter-tag', function () {
  describe('Enabling/disabling', function () {
    const events = new EventManager();

    it('should allow firing click event for normal condition', async function () {
      render(filterTemplate(), document.body);
      await Promise.resolve();
      const elem = document.querySelector('bx-filter-tag');
      const spyClick = jasmine.createSpy('click');
      events.on(elem!, 'click', spyClick);
      elem!.shadowRoot!.querySelector('button')!.click();
      expect(spyClick).toHaveBeenCalled();
    });

    it('should disallow firing click event if disabled', async function () {
      render(filterTemplate({ disabled: true }), document.body);
      await Promise.resolve();
      const elem = document.querySelector('bx-filter-tag');
      const spyClick = jasmine.createSpy('click');
      events.on(elem!, 'click', spyClick);
      elem!.shadowRoot!.querySelector('button')!.click();
      expect(spyClick).not.toHaveBeenCalled();
    });
  });

  afterEach(async function () {
    await render(undefined!, document.body);
  });
});
