import { LOADING_TYPE } from '../../src/components/loading/loading';

describe('bx-loading', function() {
  describe('Changing spinner type', function() {
    let elem: HTMLElement | null;

    beforeEach(function() {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should choose the right template for default type', function() {
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--small,.bx--loading-overlay').length).toBe(0);
    });

    it('should choose the right template for regular type', async function() {
      elem!.setAttribute('type', LOADING_TYPE.REGULAR);
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--small,.bx--loading-overlay').length).toBe(0);
    });

    it('should choose the right template for small type', async function() {
      elem!.setAttribute('type', LOADING_TYPE.SMALL);
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--small').length).toBe(1);
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading-overlay').length).toBe(0);
    });

    it('should choose the right template for overlay type', async function() {
      elem!.setAttribute('type', LOADING_TYPE.OVERLAY);
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--small').length).toBe(0);
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading-overlay').length).toBe(1);
    });

    afterEach(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing state', function() {
    let elem: HTMLElement | null;

    beforeAll(function() {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should deactivate when inactive attribute is set', async function() {
      elem!.setAttribute('inactive', '');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--stop').length).toBe(1);
    });

    it('should activate when inactive attribute is unset', async function() {
      elem!.removeAttribute('inactive');
      await Promise.resolve();
      expect(elem!.shadowRoot!.querySelectorAll('.bx--loading--stop').length).toBe(0);
    });

    afterAll(function() {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });
});
