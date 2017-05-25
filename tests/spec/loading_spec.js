import Loading from '../../src/components/loading/loading.js';

customElements.define(Loading.is, Loading);

describe('bx-loading', function () {
  describe('The lifecycle logic', function () {
    let elem;

    beforeEach(function () {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should initialize spinner instance when the element gets in render tree', function () {
      expect(elem.loading.active).to.be.true;
    });

    it('should release spinner instance when the element gets out of render tree', function () {
      elem.parentNode.removeChild(elem);
      expect(elem.loading).not.to.be.ok;
    });

    afterEach(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing spinner type', function () {
    let elem;

    before(function () {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should choose the right template for regular type', function () {
      elem.setAttribute('type', 'regular');
      expect(elem.querySelectorAll('.bx--loading--small,.bx--loading-overlay').length).to.equal(0);
    });

    it('should choose the right template for small type', function () {
      elem.setAttribute('type', 'small');
      expect(elem.querySelectorAll('.bx--loading--small').length, 'CSS class of spinner element').to.equal(1);
      expect(elem.querySelectorAll('.bx--loading-overlay').length, 'CSS class of overlay element').to.equal(0);
    });

    it('should choose the right template for overlay type', function () {
      elem.setAttribute('type', 'overlay');
      expect(elem.querySelectorAll('.bx--loading--small').length, 'CSS class of spinner element').to.equal(0);
      expect(elem.querySelectorAll('.bx--loading-overlay').length, 'CSS class of overlay element').to.equal(1);
    });

    it('should choose the right template for default type', function () {
      elem.removeAttribute('type');
      expect(elem.querySelectorAll('.bx--loading--small,.bx--loading-overlay').length).to.equal(0);
    });

    it('should not restamp unless there is actual change in type attribute', async function () {
      elem.setAttribute('type', 'small');
      await Promise.resolve();
      const spyStamp = sinon.spy(elem, '_stamp');
      try {
        elem.setAttribute('type', 'small');
        await Promise.resolve();
        expect(spyStamp).not.have.been.called;
      } finally {
        spyStamp.restore();
      }
    });

    after(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Changing state', function () {
    let elem;

    before(function () {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should deactivate when inactive attribute is set', function () {
      elem.setAttribute('inactive', '');
      expect(elem.loading.active).to.be.false;
    });

    it('should activate when inactive attribute is unset', function () {
      elem.removeAttribute('inactive');
      expect(elem.loading.active).to.be.true;
    });

    after(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });

  describe('Getting attribute and property in sync', function () {
    let elem;

    before(function () {
      elem = document.body.appendChild(document.createElement('bx-loading'));
    });

    it('should reflect inactive attribute to the corresponding property', function () {
      elem.setAttribute('inactive', '');
      expect(elem.inactive, 'Syncing change to true').to.be.true;
      elem.removeAttribute('inactive');
      expect(elem.inactive, 'Syncing change to false').to.be.false;
    });

    it('should reflect inactive property to the corresponding attribute', function () {
      elem.inactive = true;
      expect(elem.hasAttribute('inactive'), 'Syncing change to true').to.be.true;
      elem.inactive = false;
      expect(elem.hasAttribute('inactive'), 'Syncing change to false').to.be.false;
    });

    it('should reflect type attribute to the corresponding property', function () {
      elem.setAttribute('type', 'small');
      expect(elem.type).to.equal('small');
    });

    it('should reflect type property to the corresponding attribute', function () {
      elem.type = 'overlay';
      expect(elem.getAttribute('type')).to.equal('overlay');
    });

    after(function () {
      if (elem && elem.parentNode) {
        elem.parentNode.removeChild(elem);
        elem = null;
      }
    });
  });
});
