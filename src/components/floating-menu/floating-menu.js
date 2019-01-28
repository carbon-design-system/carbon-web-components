/**
 * The structure for the position of floating menu.
 * @typedef {Object} BXFloatingMenu~position
 * @property {number} left The left position.
 * @property {number} top The top position.
 * @property {number} right The right position.
 * @property {number} bottom The bottom position.
 */

/**
 * Floating menu.
 * @extends HTMLElement
 */
class BXFloatingMenu extends HTMLElement {
  /**
   * The DOM element, typically a custom element in this library, launching this floating menu.
   * @type {HTMLElement}
   */
  parent;

  /**
   * How the menu is aligned to the trigger button. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get alignment() {
    return this.getAttribute('alignment') || this.constructor.ALIGNMENT_CENTER;
  }

  set alignment(current) {
    this.setAttribute('alignment', current);
  }

  /**
   * The horizontal/vertical direction with regard to how the menu is aligned to the trigger button.
   * Corresponds to the attribute with the same name.
   * @type {string}
   */
  get alignmentDirection() {
    const {
      DIRECTION_LEFT,
      DIRECTION_TOP,
      DIRECTION_RIGHT,
      DIRECTION_BOTTOM,
      DIRECTION_HORIZONTAL,
      DIRECTION_VERTICAL,
    } = this.constructor;
    return {
      [DIRECTION_LEFT]: DIRECTION_VERTICAL,
      [DIRECTION_TOP]: DIRECTION_HORIZONTAL,
      [DIRECTION_RIGHT]: DIRECTION_VERTICAL,
      [DIRECTION_BOTTOM]: DIRECTION_HORIZONTAL,
    }[this.direction];
  }

  /**
   * The menu direction. Corresponds to the attribute with the same name.
   * @type {string}
   */
  get direction() {
    return this.getAttribute('direction') || this.constructor.DIRECTION_BOTTOM;
  }

  set direction(current) {
    this.setAttribute('direction', current);
  }

  /**
   * `true` if the dropdown should be open. Corresponds to the attribute with the same name.
   * @type {boolean}
   */
  get open() {
    return this.hasAttribute('open');
  }

  set open(current) {
    if (current) {
      this.setAttribute('open', '');
    } else {
      this.removeAttribute('open');
    }
  }

  /**
   * The DOM element to put this menu into.
   * @type {HTMLElement}
   */
  get container() {
    return this.closest(this.constructor.selectorContainer) || this.ownerDocument.body;
  }

  /**
   * The position of this floating menu.
   * @type {BXFloatingMenu~position}
   */
  get position() {
    const { triggerPosition } = this.parent;
    if (!triggerPosition) {
      throw new TypeError('Missing information of trigger button position.');
    }

    const { left: refLeft = 0, top: refTop = 0, right: refRight = 0, bottom: refBottom = 0 } = triggerPosition;
    const { width, height } = this.getBoundingClientRect();
    const { scrollLeft, scrollTop } = this.container;
    const refCenterHorizontal = (refLeft + refRight) / 2;
    const refCenterVertical = (refTop + refBottom) / 2;

    const {
      DIRECTION_LEFT,
      DIRECTION_TOP,
      DIRECTION_RIGHT,
      DIRECTION_BOTTOM,
      DIRECTION_HORIZONTAL,
      DIRECTION_VERTICAL,
      ALIGNMENT_START,
      ALIGNMENT_CENTER,
      ALIGNMENT_END,
    } = this.constructor;

    const alignments = {
      [ALIGNMENT_START]: ALIGNMENT_START,
      [ALIGNMENT_CENTER]: ALIGNMENT_CENTER,
      [ALIGNMENT_END]: ALIGNMENT_END,
    };

    const directions = {
      [DIRECTION_LEFT]: DIRECTION_LEFT,
      [DIRECTION_TOP]: DIRECTION_TOP,
      [DIRECTION_RIGHT]: DIRECTION_RIGHT,
      [DIRECTION_BOTTOM]: DIRECTION_BOTTOM,
    };

    const { alignment, alignmentDirection, direction } = this;
    if (!(alignment in alignments)) {
      throw new Error(`Wrong menu alignment: ${alignment}`);
    }
    if (!(direction in directions)) {
      throw new Error(`Wrong menu position direction: ${direction}`);
    }

    const alignmentStart = {
      [DIRECTION_HORIZONTAL]: {
        [ALIGNMENT_START]: () => refLeft,
        [ALIGNMENT_CENTER]: () => refCenterHorizontal - width / 2,
        [ALIGNMENT_END]: () => refRight - width,
      },
      [DIRECTION_VERTICAL]: {
        [ALIGNMENT_START]: () => refTop,
        [ALIGNMENT_CENTER]: () => refCenterVertical - height / 2,
        [ALIGNMENT_END]: () => refBottom - height,
      },
    }[alignmentDirection][alignment]();

    return {
      [DIRECTION_LEFT]: () => ({
        left: refLeft - width + scrollLeft,
        top: alignmentStart + scrollTop,
      }),
      [DIRECTION_TOP]: () => ({
        left: alignmentStart + scrollLeft,
        top: refTop - height + scrollTop,
      }),
      [DIRECTION_RIGHT]: () => ({
        left: refRight + scrollLeft,
        top: alignmentStart + scrollTop,
      }),
      [DIRECTION_BOTTOM]: () => ({
        left: alignmentStart + scrollLeft,
        top: refBottom + scrollTop,
      }),
    }[direction]();
  }

  attributeChangedCallback(name, old, current) {
    if (old !== current) {
      if ((name === 'open' || name === 'direction' || name === 'alignment') && this.open) {
        if (!this.parent) {
          this.parent = this.parentNode;
          this.container.appendChild(this);
        }
        const { left, top } = this.position;
        this.style.left = `${left}px`;
        this.style.top = `${top}px`;
      }
    }
  }

  static get observedAttributes() {
    return ['open', 'alignment', 'direction'];
  }

  /**
   * A constant indicating that this class is a floating menu.
   * @type {boolean}
   */
  static FLOATING_MENU = true;

  /**
   * A constant indicating that the start position of this floating menu in the cross-axis of the floating menu positioning
   * should align to the start position of its trigger button.
   * @type {boolean}
   */
  static ALIGNMENT_START = 'start';

  /**
   * A constant indicating that the center of this floating menu in the cross-axis of the floating menu positioning
   * should align to the center of its trigger button.
   * @type {boolean}
   */
  static ALIGNMENT_CENTER = 'center';

  /**
   * A constant indicating that the end position of this floating menu in the cross-axis of the floating menu positioning
   * should align to the end position of its trigger button.
   * @type {boolean}
   */
  static ALIGNMENT_END = 'end';

  /**
   * A constant indicating that this floating menu should be placed left next to the trigger button.
   * @type {boolean}
   */
  static DIRECTION_LEFT = 'left';

  /**
   * A constant indicating that this floating menu should be placed at the top of the trigger button.
   * @type {boolean}
   */
  static DIRECTION_TOP = 'top';

  /**
   * A constant indicating that this floating menu should be placed right next to the trigger button.
   * @type {boolean}
   */
  static DIRECTION_RIGHT = 'right';

  /**
   * A constant indicating that this floating menu should be placed at the bottom of the trigger button.
   * @type {boolean}
   */
  static DIRECTION_BOTTOM = 'bottom';

  /**
   * A constant indicating that this floating menu and its trigger button creates a horizontal axis.
   * @type {boolean}
   */
  static DIRECTION_HORIZONTAL = 'horizontal';

  /**
   * A constant indicating that this floating menu and its trigger button creates a vertical axis.
   * @type {boolean}
   */
  static DIRECTION_VERTICAL = 'vertical';

  /**
   * The CSS selector to find the element to put this floating menu in.
   * @type {string}
   */
  static selectorContainer = '[data-floating-menu-container]';

  /**
   * The name of the custom event fired before a new selection (value) is set upon a user gesture.
   * Cancellation of this event stops changing the user-initiated selection.
   * @type {string}
   */
  static get eventBeforeSelect() {
    return `${this.is.toLowerCase()}-beingselected`;
  }

  /**
   * The name of the custom event fired after a new selection (value) is set.
   * @type {string}
   */
  static get eventAfterSelect() {
    return `${this.is.toLowerCase()}-selected`;
  }
}

export default BXFloatingMenu;
