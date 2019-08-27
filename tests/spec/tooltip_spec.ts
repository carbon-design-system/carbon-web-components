import { html, render, TemplateResult } from 'lit-html';

// Just importing the default export does not seem to run `customElements.define()`
/* eslint-disable import/no-duplicates */
import '../../src/components/tooltip/tooltip';
import BXTooltip from '../../src/components/tooltip/tooltip';
import '../../src/components/tooltip/tooltip-body';
import BXTooltipBody from '../../src/components/tooltip/tooltip-body';
/* eslint-enable import/no-duplicates */

const bodyTemplate = () => html`
  <bx-tooltip-body></bx-tooltip-body>
`;
const contentTemplate = ({ hasBody = true } = {}) => html`
  <div data-floating-menu-container style="position:relative">
    <bx-tooltip>
      ${!hasBody ? undefined : bodyTemplate()}
    </bx-tooltip>
  </div>
`;
const template = ({ hasContent = true, hasBody = true } = {}) =>
  !hasContent ? (undefined! as TemplateResult) : contentTemplate({ hasBody });

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
