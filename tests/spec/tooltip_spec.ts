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
import Filter16 from '@carbon/icons/lib/filter/16';

// Just importing the default export does not seem to run `customElements.define()`
/* eslint-disable import/no-duplicates */
import '../../src/components/tooltip/tooltip';
import BXTooltip from '../../src/components/tooltip/tooltip';
import '../../src/components/tooltip/tooltip-body';
import BXTooltipBody from '../../src/components/tooltip/tooltip-body';
/* eslint-enable import/no-duplicates */
import { TOOLTIP_ALIGNMENT, TOOLTIP_DIRECTION } from '../../src/components/tooltip/tooltip-definition';
import '../../src/components/tooltip/tooltip-icon';

const bodyTemplate = () => html`
  <bx-tooltip-body></bx-tooltip-body>
`;
const contentTemplate = ({ hasBody = true }: { hasBody?: boolean } = {}) => html`
  <div data-floating-menu-container style="position:relative">
    <bx-tooltip>
      ${!hasBody ? undefined : bodyTemplate()}
    </bx-tooltip>
  </div>
`;
const template = ({ hasContent = true, hasBody = true }: { hasContent?: boolean; hasBody?: boolean } = {}) =>
  !hasContent ? (undefined! as TemplateResult) : contentTemplate({ hasBody });

const definitionTemplate = ({
  hasContent = true,
  alignment,
  bodyText,
  direction,
}: {
  hasContent?: boolean;
  alignment?: TOOLTIP_ALIGNMENT;
  bodyText?: string;
  direction?: TOOLTIP_DIRECTION;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-tooltip-definition
          alignment="${ifDefined(alignment)}"
          body-text="${ifDefined(bodyText)}"
          direction="${ifDefined(direction)}"
        >
          Definition Tooltip
        </bx-tooltip-definition>
      `;

const iconTemplate = ({
  hasContent = true,
  alignment,
  bodyText,
  direction,
}: {
  hasContent?: boolean;
  alignment?: TOOLTIP_ALIGNMENT;
  bodyText?: string;
  direction?: TOOLTIP_DIRECTION;
} = {}) =>
  !hasContent
    ? (undefined! as TemplateResult)
    : html`
        <bx-tooltip-icon
          alignment="${ifDefined(alignment)}"
          body-text="${ifDefined(bodyText)}"
          direction="${ifDefined(direction)}"
        >
          ${Filter16()}
        </bx-tooltip-icon>
      `;

describe('bx-tooltip', function() {
  describe('Missing menu body', function() {
    let trigger: BXTooltip | null;

    beforeEach(async function() {
      render(template({ hasBody: false }), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('bx-tooltip');
    });

    it('Should be tolerant of missing menu body', async function() {
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      await Promise.resolve();
      expect(trigger!.open).toBe(true);

      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      await Promise.resolve();
      expect(trigger!.open).toBe(false);
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });

  describe('Toggling', function() {
    let trigger: BXTooltip | null;
    let body: BXTooltipBody | null;

    beforeEach(async function() {
      render(template(), document.body);
      await Promise.resolve();
      trigger = document.body.querySelector('bx-tooltip');
      body = document.body.querySelector('bx-tooltip-body');
    });

    it('Should open and close the menu', async function() {
      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      await Promise.resolve();
      expect(trigger!.open).toBe(true);
      expect(body!.open).toBe(true);

      trigger!.shadowRoot!.firstElementChild!.dispatchEvent(new CustomEvent('click', { bubbles: true, composed: true }));
      await Promise.resolve();
      expect(trigger!.open).toBe(false);
      expect(body!.open).toBe(false);
    });

    afterEach(function() {
      render(template({ hasContent: false }), document.body);
    });
  });
});

describe('bx-tooltip-definition', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(definitionTemplate(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-tooltip-definition')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        definitionTemplate({
          alignment: TOOLTIP_ALIGNMENT.START,
          bodyText: 'body-text-foo',
          direction: TOOLTIP_DIRECTION.TOP,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-tooltip-definition')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(function() {
      render(definitionTemplate({ hasContent: false }), document.body);
    });
  });
});

describe('bx-tooltip-icon', function() {
  describe('Rendering', function() {
    it('Should render with minimum attributes', async function() {
      render(iconTemplate(), document.body);
      await Promise.resolve();
      expect(document.body.querySelector('bx-tooltip-icon')).toMatchSnapshot({ mode: 'shadow' });
    });

    it('Should render with various attributes', async function() {
      render(
        iconTemplate({
          alignment: TOOLTIP_ALIGNMENT.START,
          bodyText: 'body-text-foo',
          direction: TOOLTIP_DIRECTION.TOP,
        }),
        document.body
      );
      await Promise.resolve();
      expect(document.body.querySelector('bx-tooltip-icon')).toMatchSnapshot({ mode: 'shadow' });
    });

    afterEach(function() {
      render(iconTemplate({ hasContent: false }), document.body);
    });
  });
});
